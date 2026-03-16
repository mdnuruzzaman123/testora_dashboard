"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type DonutPoint = {
  label: string;
  value: number;
  color: string;
};

type DashboardDonutChartProps = {
  data: DonutPoint[];
};

export default function DashboardDonutChart({ data }: DashboardDonutChartProps) {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="grid gap-4 md:grid-cols-[180px_1fr]">
      <div className="relative mx-auto h-[160px] w-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius={46}
              outerRadius={66}
              paddingAngle={2}
            >
              {data.map((item) => (
                <Cell key={item.label} fill={item.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                border: "1px solid #dbe6f2",
                borderRadius: "8px",
                background: "#ffffff",
                fontSize: "12px",
              }}
              formatter={(value) => [`${Number(value).toLocaleString()} users`, "Users"]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-semibold text-[#3f5f7a]">{total.toLocaleString()}</span>
          <span className="text-[10px] text-[#90a2b5]">total users</span>
        </div>
      </div>
      <div className="space-y-2.5">
        {data.map((item) => (
          <div key={item.label} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-[#5d778f]">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              {item.label}
            </div>
            <span className="text-[#3f5f7a]">{item.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
