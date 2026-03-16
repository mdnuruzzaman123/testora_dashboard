"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type AreaPoint = {
  month: string;
  users: number;
};

type DashboardAreaChartProps = {
  data: AreaPoint[];
};

export default function DashboardAreaChart({ data }: DashboardAreaChartProps) {
  return (
    <div className="h-57.5 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 8 }}>
          <CartesianGrid stroke="#edf2f8" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "#91a3b6" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#91a3b6" }}
            axisLine={false}
            tickLine={false}
            domain={[0, "auto"]}
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
          <Area
            type="monotone"
            dataKey="users"
            stroke="#4d96d8"
            strokeWidth={2}
            fill="#dcecf9"
            fillOpacity={1}
            dot={false}
            activeDot={{ r: 3, fill: "#4d96d8", stroke: "#ffffff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
