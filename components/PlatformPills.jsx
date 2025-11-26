"use client";

import { useState } from "react";

export default function PlatformPills({ platforms = ["Etsy", "Amazon", "Shopify", "eBay", "Custom"], onSelect }) {
  const [active, setActive] = useState(platforms[0]);

  const handleClick = (platform) => {
    setActive(platform);
    if (onSelect) onSelect(platform);
  };

  return (
    <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
      {platforms.map((platform) => (
        <button
          key={platform}
          onClick={() => handleClick(platform)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            active === platform
              ? "bg-indigo-500 text-white border border-indigo-500"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {platform}
        </button>
      ))}
    </div>
  );
}
