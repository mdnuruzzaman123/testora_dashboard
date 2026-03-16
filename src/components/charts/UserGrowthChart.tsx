"use client";

import { monthlyUserGrowthData } from "@/lib/mock-data";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function UserGrowthChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={monthlyUserGrowthData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: "#94A3B8" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#94A3B8" }}
          axisLine={false}
          tickLine={false}
          domain={[0, 100]}
          ticks={[0, 25, 50, 75, 100]}
        />
        <Tooltip
          contentStyle={{
            borderRadius: "8px",
            border: "1px solid #E2E8F0",
            fontSize: "12px",
          }}
          labelStyle={{ color: "#1E293B", fontWeight: 600 }}
          itemStyle={{ color: "#3B82F6" }}
          formatter={(value) => [`${value ?? 0}K users`, "Users"]}
        />
        <Area
          type="monotone"
          dataKey="users"
          stroke="#3B82F6"
          strokeWidth={2.5}
          fill="#3B82F6"
          fillOpacity={0.18}
          dot={false}
          activeDot={{ r: 4, fill: "#3B82F6", stroke: "#fff", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
