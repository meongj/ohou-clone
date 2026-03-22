import {quickMenuItems} from "../constants/quickMenuItems";

export function QuickMenu() {
  return (
    <div className="container-ohou py-10">
      <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
        {quickMenuItems.map(({icon: Icon, label, color, bgColor}) => (
          <button className="flex flex-col items-center gap-2">
            <div className={` ${bgColor} w-15 h-15 rounded-2xl flex items-center justify-center`}>
              <Icon className={`w-6 h-6 ${color}`} />
            </div>
            <span className="text-xs sm:text-sm md:text-base text-foreground">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
