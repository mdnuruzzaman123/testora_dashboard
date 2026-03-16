"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type AreaPoint = {
  month: string;
  users: number;
};

type DashboardAreaChartProps = {
  data: AreaPoint[];
};

export default function DashboardAreaChart({ data }: DashboardAreaChartProps) {
  return (
    <div className="h-76 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 6, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="dashboardGrowth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9dc3e2" stopOpacity={0.95} />
              <stop offset="100%" stopColor="#5aa3dc" stopOpacity={0.95} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#5e768e" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#5e768e" }}
            axisLine={false}
            tickLine={false}
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80, 100]}
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
            fill="url(#dashboardGrowth)"
            fillOpacity={1}
            dot={false}
            activeDot={{ r: 3, fill: "#4d96d8", stroke: "#ffffff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
