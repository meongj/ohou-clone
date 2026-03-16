import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import ProductDetailPage from "../pages/product-detail/ProductDetailPage";
import CommunityPage from "../pages/community/CommunityPage";
import CartPage from "../pages/cart/CartPage";
import BookmarksPage from "../pages/bookmarks/BookmarksPage";
import Layout from "@/widgets/layout/Layout";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {path: "/", element: <HomePage />},
      {path: "/products/:id", element: <ProductDetailPage />},
      {path: "/community", element: <CommunityPage />},
      {path: "/cart", element: <CartPage />},
      {path: "/bookmarks", element: <BookmarksPage />},
    ],
  },
]);
