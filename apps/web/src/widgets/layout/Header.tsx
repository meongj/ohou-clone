import SubNav from "./SubNav";
import TopNav from "./TopNav";

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-50 bg-white border-b border-sidebar-accent">
      <div className="mx-auto px-6 container-ohou">
        <TopNav />
      </div>
      <div className="border-b border-sidebar-accent" />
      <div className="mx-auto px-6 container-ohou">
        <SubNav />
      </div>
    </header>
  );
}
