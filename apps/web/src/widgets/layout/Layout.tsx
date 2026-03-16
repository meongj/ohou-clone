import {Outlet} from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

// Header + Footer 묶는 래퍼
export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-14 md:pb-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
