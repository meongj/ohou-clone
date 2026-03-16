import {Link} from "react-router-dom";
import {ShoppingCart, Search, Badge} from "lucide-react";
import {Input} from "@/components/ui/input";

export default function TopNav() {
  const cartCount = 0;

  return (
    <div className="flex justify-between items-center h-14 ">
      {/* 왼쪽 영역 */}
      <div className="flex items-center gap-8">
        {/* 로고 */}
        <Link to="/" className="text-xl font-bold text-ohou-primary flex items-center">
          <img src="/logo.svg" alt="오늘의집 로고" />
          오늘의 집
        </Link>

        <nav className="flex items-center gap-1">
          {["커뮤니티", "쇼핑", "인테리어/생활"].map((menu) => (
            <Link
              key={menu}
              to={`/${menu}`}
              className="px-3 py-1.5 text-[15px] font-medium
                         text-gray-700 hover:text-primary transition-colors">
              {menu}
            </Link>
          ))}
        </nav>
      </div>

      {/* 오른쪽 영역 */}
      <div className="flex items-center gap-4">
        {/* 검색바 */}
        <div className="flex-1 max-w-md mx-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input type="text" placeholder="통합 검색" className="pl-9" />
        </div>

        {/* 장바구니 */}
        <Link to="/cart" className="relative">
          <ShoppingCart className="w-6 h-6" />
          <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-ohou-primary">
            {cartCount}
          </Badge>
        </Link>
      </div>
    </div>
  );
}
