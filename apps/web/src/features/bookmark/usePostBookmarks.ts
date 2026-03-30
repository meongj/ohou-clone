import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPostBookmarks, togglePostBookmark } from "./api";
import { useMemo } from "react";

export function usePostBookmarks() {
  const queryClient = useQueryClient();

  const {data: postBookmarks} = useQuery<string[]>({
    queryKey: ["postBookmarks"],
    queryFn: fetchPostBookmarks,
  });



  const bookmarkedIds = useMemo(() => new Set(postBookmarks ?? []), [postBookmarks]);

  const {mutate: toggleBookmark, isPending} = useMutation({
    // 서버에 북마크 토클 요청 보내는 함수
    mutationFn: (postId: string) => togglePostBookmark(postId),

    // 낙관적 업데이트 시작
    // - 버튼을 누르면 서버 응답 오기전에 UI(캐시)를 먼저 바꾼다
    onMutate: async (postId: string) => {
      // 진행 중인 postBookmarks 쿼리를 중단/대기시켜서
      // 낙관적 변경과 충돌하는 응답이 덮어쓰는 걸 방지
      await queryClient.cancelQueries({queryKey: ["postBookmarks"]});

      // rollback을 위한 변경 전 값을 스냅샷으로 저장
      const previous = queryClient.getQueryData<string[]>(["postBookmarks"]) ?? [];

      // 배열 -> Set 변경
      const prevSet = new Set(previous);
      if (prevSet.has(postId)) prevSet.delete(postId);
      else prevSet.add(postId);

      // 낙관적으로 캐시를 먼저 갱신(바로 UI 변경)
      queryClient.setQueryData<string[]>(["postBookmarks"], [...prevSet]);
      // onError에서 받을 context로 previous 스냅샷 저장
      return {previous};
    },
    // 서버 요청이 실패했을 때 호출
    // - onMutate에서 저장해둔 previous 캐시로 되돌림(롤백)
    onError: (_err, _postId, context) => {
      if (!context?.previous) return;
      queryClient.setQueryData<string[]>(["postBookmarks"], context.previous);
    },
    // 요청이 성공/실패 상관없이 끝나면 호출
    // - 서버 기준 상태로 다시 동기화하기 위해 재요청(invalidate)
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ["postBookmarks"]});
    },
  });

  return  {bookmarkedIds, toggleBookmark, isPending};

}