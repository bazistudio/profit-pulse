"use client";

export default function BreakdownCard({ data, summary }) {
  const { material = 0, shipping = 0, platformFee = 0, marketing = 0, tax = 0 } = data;
  const { revenue = 0 } = summary;

  const total = material + shipping + platformFee + marketing + tax;

  const getPercent = (value) => (total ? (value / total) * 100 : 0);

  const segments = [
    { label: "Material", value: material, color: "#ef4444", key: "material" },
    { label: "Shipping", value: shipping, color: "#f59e0b", key: "shipping" },
    { label: "Platform Fees", value: platformFee, color: "#6366f1", key: "platformFee" },
    { label: "Marketing", value: marketing, color: "#10b981", key: "marketing" },
    { label: "Tax", value: tax, color: "#8b5cf6", key: "tax" },
  ];

  // Calculate stroke-dasharray for donut segments
  let cumulative = 0;
  const circles = segments.map((seg) => {
    const percent = getPercent(seg.value);
    const dashArray = `${percent} ${100 - percent}`;
    const dashOffset = -cumulative;
    cumulative += percent;
    return { ...seg, dashArray, dashOffset };
  });

  const formatCurrency = (num) => `$${Number(num).toFixed(2)}`;

  return (
    <div className="bg-white rounded-lg shadow p-6 w-full flex flex-col items-center">
      <h3 className="text-xl font-semibold mb-4">📊 Expense Analytics</h3>

      {/* Donut Chart with Total Revenue */}
      <div className="relative w-40 h-40 mb-4">
        <svg className="w-40 h-40" viewBox="0 0 42 42">
          <circle cx="21" cy="21" r="15.915" fill="#fff" />
          {circles.map((c) => (
            <circle
              key={c.key}
              cx="21"
              cy="21"
              r="15.915"
              fill="none"
              stroke={c.color}
              strokeWidth="3"
              strokeDasharray={c.dashArray}
              strokeDashoffset={c.dashOffset}
              strokeLinecap="round"
              transform="rotate(-90 21 21)"
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-gray-800 font-bold text-lg">Revenue</span>
          <span className="text-gray-900 font-bold text-xl">{formatCurrency(revenue)}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-2 mb-4 w-full">
        {segments.map((seg) => (
          <div key={seg.key} className="flex items-center gap-2 text-sm text-gray-700">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: seg.color }}></span>
            <span>
              {seg.label} — {getPercent(seg.value).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 w-full justify-center">
        <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition">
          Save Result
        </button>
        <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
          Export CSV
        </button>
      </div>
    </div>
  );
}
