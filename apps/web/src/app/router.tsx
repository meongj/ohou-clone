import {createBrowserRouter} from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import ProductDetailPage from "../pages/product-detail/ProductDetailPage";
import CommunityPage from "../pages/community/CommunityPage";
import CartPage from "../pages/cart/CartPage";
import BookmarksPage from "../pages/bookmarks/BookmarksPage";

export const router = createBrowserRouter([
  {path: "/", element: <HomePage />},
  {path: "/products/:id", element: <ProductDetailPage />},
  {path: "/community", element: <CommunityPage />},
  {path: "/cart", element: <CartPage />},
  {path: "/bookmarks", element: <BookmarksPage />},
]);
