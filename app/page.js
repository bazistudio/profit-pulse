"use client";

import { useState, useEffect } from "react";
import PlatformPills from "@/components/PlatformPills";
import InputCard from "@/components/InputCard";
import SummaryCard from "@/components/SummaryCard";
import BreakdownCard from "@/components/BreakdownCard";

export default function Home() {
  // State for product details
  const [entry, setEntry] = useState({
    quantity: 10,
    price: 25,
    shipping: 5,
    material: 8.5,
    platformFee: 2.5,
    packaging: 1.25,
    transaction: 1,
    marketing: 3,
    tax: 5,
    extra: 0, // New Extra Cost
    calculate: false,
  });

  // State for summary
  const [summary, setSummary] = useState({
    revenue: 0,
    expense: 0,
    profit: 0,
    margin: 0,
  });

  // State for breakdown
  const [breakdown, setBreakdown] = useState({
    material: 0,
    shipping: 0,
    platformFee: 0,
    marketing: 0,
    tax: 0,
    extra: 0, // Include extra in breakdown
  });

  // Yearly Data for SummaryCard chart
  const [yearlyData, setYearlyData] = useState([
    { month: "Jan", revenue: 0, expense: 0, profit: 0, margin: 0, topItems: [] },
    { month: "Feb", revenue: 0, expense: 0, profit: 0, margin: 0, topItems: [] },
    { month: "Mar", revenue: 0, expense: 0, profit: 0, margin: 0, topItems: [] },
    { month: "Apr", revenue: 0, expense: 0, profit: 0, margin: 0, topItems: [] },
    { month: "May", revenue: 0, expense: 0, profit: 0, margin: 0, topItems: [] },
    { month: "Jun", revenue: 0, expense: 0, profit: 0, margin: 0, topItems: [] },
    { month: "Jul", revenue: 0, expense: 0, profit: 0, margin: 0, topItems: [] },
    { month: "Aug", revenue: 0, expense: 0, profit: 0, margin: 0, topItems: [] },
    { month: "Sep", revenue: 0, expense: 0, profit: 0, margin: 0, topItems: [] },
    { month: "Oct", revenue: 0, expense: 0, profit: 0, margin: 0, topItems: [] },
    { month: "Nov", revenue: 0, expense: 0, profit: 0, margin: 0, topItems: [] },
    { month: "Dec", revenue: 0, expense: 0, profit: 0, margin: 0, topItems: [] },
  ]);

  // Calculate profit whenever entry changes
  useEffect(() => {
    const {
      quantity,
      price,
      shipping,
      material,
      platformFee,
      packaging,
      transaction,
      marketing,
      tax,
      extra,
      calculate,
    } = entry;

    if (!calculate) return;

    const revenue = quantity * price;

    const costPerUnit = shipping + material + platformFee + packaging + transaction + marketing + extra;
    const totalExpense = costPerUnit * quantity + (revenue * (tax / 100));

    const profit = revenue - totalExpense;
    const margin = revenue ? (profit / revenue) * 100 : 0;

    setSummary({ revenue, expense: totalExpense, profit, margin });
    setBreakdown({ material, shipping, platformFee, marketing, tax, extra });

    // Update current month in yearlyData dynamically
    const currentMonthIndex = new Date().getMonth();
    const updatedYearly = [...yearlyData];
    updatedYearly[currentMonthIndex] = {
      ...updatedYearly[currentMonthIndex],
      revenue,
      expense: totalExpense,
      profit,
      margin,
      topItems: [{ name: "Sample Item", quantity }], // Replace with real top items logic
    };
    setYearlyData(updatedYearly);

    // Reset calculate flag
    setEntry((prev) => ({ ...prev, calculate: false }));
  }, [entry]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Top Navbar */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">💹 Profit Pulse</h1>
        <PlatformPills />
      </div>

      {/* Cards Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <InputCard entry={entry} onChange={setEntry} />
        <SummaryCard yearlyData={yearlyData} />
        <BreakdownCard data={breakdown} summary={summary} />
      </div>
    </div>
  );
}
