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
  showXAxisTicks?: boolean;
};

export default function DashboardHorizontalBarChart({
  data,
  height = 240,
  showXAxisTicks = false,
}: DashboardHorizontalBarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 0);
  const roundedMax = Math.ceil(maxValue / 1000) * 1000;

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 10, left: 6, bottom: showXAxisTicks ? 16 : 4 }}
        >
          <XAxis
            type="number"
            hide={!showXAxisTicks}
            domain={[0, roundedMax]}
            tickLine={false}
            axisLine={false}
            ticks={showXAxisTicks ? [0, 1000, 2000, 3000, 4000] : undefined}
            tick={{ fontSize: 10, fill: "#9bb0c4" }}
            tickFormatter={(value) => (value === 0 ? "0" : `${(value / 1000).toFixed(1)}k`)}
          />
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
          <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={showXAxisTicks ? 24 : 10}>
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
