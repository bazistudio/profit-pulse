"use client";

export default function InputCard({ entry, onChange }) {
  const handleChange = (field, value) => {
    onChange({ ...entry, [field]: parseFloat(value) || 0 });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 w-full">
      <h2 className="text-xl font-semibold mb-4">🛒 Product Details</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Quantity</label>
          <input
            type="number"
            value={entry.quantity}
            onChange={(e) => handleChange("quantity", e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Price Per Unit</label>
          <input
            type="number"
            value={entry.price}
            onChange={(e) => handleChange("price", e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Shipping Cost</label>
          <input
            type="number"
            value={entry.shipping}
            onChange={(e) => handleChange("shipping", e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Material Cost</label>
          <input
            type="number"
            value={entry.material}
            onChange={(e) => handleChange("material", e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Platform Fee</label>
          <input
            type="number"
            value={entry.platformFee}
            onChange={(e) => handleChange("platformFee", e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Packaging</label>
          <input
            type="number"
            value={entry.packaging}
            onChange={(e) => handleChange("packaging", e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Transaction / Gateway Fee</label>
          <input
            type="number"
            value={entry.transaction}
            onChange={(e) => handleChange("transaction", e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Marketing / Ads</label>
          <input
            type="number"
            value={entry.marketing}
            onChange={(e) => handleChange("marketing", e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Tax / VAT (%)</label>
          <input
            type="number"
            value={entry.tax}
            onChange={(e) => handleChange("tax", e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>

        {/* New Entry */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Extra Cost</label>
          <input
            type="number"
            value={entry.extra || 0}
            onChange={(e) => handleChange("extra", e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition flex-1"
          onClick={() => onChange({ ...entry, calculate: true })}
        >
          Calculate Profit
        </button>
        <button
          className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition flex-1"
          onClick={() =>
            onChange({
              quantity: 0,
              price: 0,
              shipping: 0,
              material: 0,
              platformFee: 0,
              packaging: 0,
              transaction: 0,
              marketing: 0,
              tax: 0,
              extra: 0,
              calculate: false,
            })
          }
        >
          Reset
        </button>
      </div>
    </div>
  );
}
