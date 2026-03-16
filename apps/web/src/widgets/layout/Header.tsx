import SubNav from "./SubNav";
import TopNav from "./TopNav";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-sidebar-accent">
      <div className="mx-auto px-6">
        <TopNav />
      </div>
      <div className="border-b border-sidebar-accent" />
      <div className="mx-auto px-6">
        <SubNav />
      </div>
    </header>
  );
}
