"use client";

import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type BarPoint = {
  label: string;
  value: number;
  color?: string;
};

type DashboardHorizontalBarChartProps = {
  data: BarPoint[];
  height?: number;
};

export default function DashboardHorizontalBarChart({
  data,
  height = 240,
}: DashboardHorizontalBarChartProps) {
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 10, left: 6, bottom: 4 }}>
          <XAxis type="number" hide />
          <YAxis
            dataKey="label"
            type="category"
            width={88}
            tick={{ fontSize: 11, fill: "#6d849c" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              border: "1px solid #dbe6f2",
              borderRadius: "8px",
              background: "#ffffff",
              fontSize: "12px",
            }}
            labelStyle={{ color: "#45657f", fontWeight: 600 }}
            formatter={(value) => [`${value} users`, "Users"]}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={10}>
            {data.map((item, idx) => (
              <Cell
                key={`${item.label}-${idx}`}
                fill={item.color ?? (idx === 0 ? "#4d96d8" : "#9ec6ea")}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
