import { ShoppingBag, Plus, Package, Tag } from "lucide-react";

export default function MarketplacePage() {
  return (
    <div className="min-h-full p-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Marketplace</h1>
            <p className="mt-0.5 text-sm text-gray-400">
              Manage physical products, books, and educational materials
            </p>
          </div>
          <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Add Product
          </button>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          {[
            {
              label: "Total Products",
              value: "38",
              icon: ShoppingBag,
              color: "text-blue-600 bg-blue-50",
            },
            {
              label: "Pending Approval",
              value: "3",
              icon: Tag,
              color: "text-amber-600 bg-amber-50",
            },
            { label: "Out of Stock", value: "5", icon: Package, color: "text-red-600 bg-red-50" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-gray-100 p-4 shadow-sm">
              <div
                className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${s.color}`}
              >
                <s.icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-sm text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Coming soon */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
            <ShoppingBag className="h-8 w-8 text-blue-400" />
          </div>
          <h3 className="mb-1 text-base font-semibold text-gray-700">
            Marketplace Management Coming Soon
          </h3>
          <p className="max-w-sm text-sm text-gray-400">
            Product listings, inventory management, pricing, and category organization.
          </p>
        </div>
      </div>
    </div>
  );
}
