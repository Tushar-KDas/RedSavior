import React from "react";
import { TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subLabel?: string;
  change?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
  bgGradient?: string;
  textColor?: string;
  onClick?: () => void;
}

export function StatCard({
  title,
  value,
  subLabel,
  change,
  isPositive = true,
  icon,
  bgGradient = "from-white to-slate-50",
  textColor = "text-slate-900",
  onClick,
}: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${bgGradient} p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all ${
        onClick ? "cursor-pointer hover:scale-[1.01]" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            {title}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={`text-2xl lg:text-3xl font-black tracking-tight ${textColor}`}>
              {typeof value === "number" ? value.toLocaleString() : value}
            </span>
          </div>
          {subLabel && (
            <p className="mt-1 text-xs text-gray-500">{subLabel}</p>
          )}
        </div>

        {icon && (
          <div className="w-11 h-11 rounded-2xl bg-white/90 shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
        )}
      </div>

      {change && (
        <div className="mt-3 pt-3 border-t border-gray-100/80 flex items-center gap-1.5 text-xs font-bold">
          {isPositive ? (
            <span className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
              {change}
            </span>
          ) : (
            <span className="flex items-center text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
              <TrendingDown className="w-3.5 h-3.5 mr-1" />
              {change}
            </span>
          )}
          <span className="text-[11px] text-gray-400 font-normal">vs last month</span>
        </div>
      )}
    </div>
  );
}
