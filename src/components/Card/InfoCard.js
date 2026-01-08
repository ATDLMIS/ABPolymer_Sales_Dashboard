import { ReactNode } from "react";



const colorMap = {
  blue: {
    bg: "from-blue-50 to-blue-100",
    border: "border-blue-200",
    iconBg: "bg-blue-600",
  },
  green: {
    bg: "from-green-50 to-green-100",
    border: "border-green-200",
    iconBg: "bg-green-600",
  },
  red: {
    bg: "from-red-50 to-red-100",
    border: "border-red-200",
    iconBg: "bg-red-600",
  },
  purple: {
    bg: "from-purple-50 to-purple-100",
    border: "border-purple-200",
    iconBg: "bg-purple-600",
  },
  indigo: {
    bg: "from-indigo-50 to-indigo-100",
    border: "border-indigo-200",
    iconBg: "bg-indigo-600",
  },
  orange: {
    bg: "from-orange-50 to-orange-100",
    border: "border-orange-200",
    iconBg: "bg-orange-600",
  },
};

export default function InfoCard({ label,value,icon,
  color = "blue",
}) {
  const theme = colorMap[color];

  return (
    <div
      className={`bg-gradient-to-br ${theme.bg} p-2 rounded-lg  border ${theme.border} h-[70px] `}
    >
      <div className="flex gap-4 items-center px-2 ">
        <div
          className={`w-10 h-10 ${theme.iconBg} rounded-lg flex items-center justify-center`}
        >
          {icon}
        </div>
       <div>
         <label className="text-sm font-medium text-gray-600">
          {label}
        
        </label>
          <div className="text-sm  font-semibold text-gray-900 ">
        {value || "-"}
      </div>
       </div>
      </div>

      
    </div>
  );
}
