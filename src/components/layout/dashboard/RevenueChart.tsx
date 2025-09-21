"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Report {
  month: string;
  revenue: number;
}

export default function RevenueChart({ data }: { data: Report[] }) {
  return (
    <div className="bg-white shadow rounded-2xl p-4">
      <h2 className="text-lg font-semibold mb-3">Monthly Revenue</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#2563eb" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
