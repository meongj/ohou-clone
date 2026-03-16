import {NavLink} from "react-router-dom";

const TABS = [
  {label: "홈", to: "/"},
  {label: "인기", to: "/popular"},
  {label: "쇼핑수다", to: "/talk"},
  {label: "집꾸미기", to: "/interior"},
  {label: "오집소식", to: "/news"},
  {label: "취미/일상", to: "/hobby"},
  {label: "추천", to: "/recommend"},
  {label: "집들이", to: "/housewarming"},
  {label: "집사진", to: "/photos"},
  {label: "3D인테리어", to: "/3d"},
];

export default function SubNav() {
  return (
    <nav className="flex items-center gap-1 h-12 overflow-x-auto">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({isActive}) =>
            `px-3 py-2 text-sm font-medium whitespace-nowrap
             transition-colors
             ${isActive ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-500 hover:text-gray-700"}`
          }>
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}
