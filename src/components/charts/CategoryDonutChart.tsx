"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { categoryDistributionData } from "@/lib/mock-data";

const total = categoryDistributionData.reduce((sum, d) => sum + d.value, 0);

export default function CategoryDonutChart() {
  return (
    <div className="flex items-center gap-6">
      <div className="relative h-32 w-32 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryDistributionData}
              cx="50%"
              cy="50%"
              innerRadius={42}
              outerRadius={58}
              paddingAngle={2}
              dataKey="value"
            >
              {categoryDistributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #E2E8F0",
                fontSize: "12px",
              }}
              formatter={(value) => [Number(value ?? 0).toLocaleString(), "Users"]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-gray-900">{(total / 1000).toFixed(1)}K</span>
          <span className="text-[10px] text-gray-400">total</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {categoryDistributionData.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2 text-sm">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-600">{entry.name}</span>
            <span className="ml-auto pl-4 font-medium text-gray-900">
              {entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
