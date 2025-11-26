"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function SummaryCard({ yearlyData }) {
  const [selectedMonth, setSelectedMonth] = useState(
    yearlyData[yearlyData.length - 1]
  );

  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-4 w-full">
      <h3 className="text-xl font-semibold">💰 Profit Summary</h3>

      {/* Month Selector */}
      <div className="flex flex-wrap gap-2">
        {yearlyData.map((m, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${
              selectedMonth.month === m.month
                ? "bg-indigo-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setSelectedMonth(m)}
          >
            {m.month}
          </button>
        ))}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-gray-500 text-sm">Total Revenue</div>
          <div className="text-lg font-bold">
            ${selectedMonth.revenue.toFixed(2)}
          </div>
        </div>
        <div>
          <div className="text-gray-500 text-sm">Total Expense</div>
          <div className="text-lg font-bold">
            ${selectedMonth.expense.toFixed(2)}
          </div>
        </div>
        <div>
          <div className="text-gray-500 text-sm">Net Profit</div>
          <div
            className={`text-lg font-bold ${
              selectedMonth.profit >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            ${selectedMonth.profit.toFixed(2)}
          </div>
        </div>
        <div>
          <div className="text-gray-500 text-sm">Profit Margin</div>
          <div className="text-lg font-bold">
            {selectedMonth.margin.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="mt-4 w-full" style={{ height: "200px", minHeight: "200px" }}>

        <ResponsiveContainer width="100%" height="100%" minWidth={0}>

          <LineChart data={yearlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value}`} />
            <Line
              type="monotone"
              dataKey="margin"
              stroke="#6366f1"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Selling Items */}
      <div className="mt-2">
        <div className="text-gray-600 text-sm mb-1">Top Selling Items</div>
        <ul className="text-gray-700 text-sm list-disc list-inside">
          {selectedMonth.topItems.map((item, i) => (
            <li key={i}>
              {item.name} — {item.quantity} units
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
