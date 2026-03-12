import { Package, TruckIcon, CheckCircle, Clock } from "lucide-react";

export default function OrdersPage() {
  return (
    <div className="min-h-full p-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Orders</h1>
            <p className="mt-0.5 text-sm text-gray-400">
              Track and manage marketplace purchase orders
            </p>
          </div>
          <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">
            Export Orders
          </button>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-4 gap-3">
          {[
            {
              label: "Total Orders",
              value: "284",
              icon: Package,
              color: "text-blue-600 bg-blue-50",
            },
            {
              label: "Pending Shipment",
              value: "18",
              icon: Clock,
              color: "text-amber-600 bg-amber-50",
            },
            {
              label: "Shipped",
              value: "241",
              icon: TruckIcon,
              color: "text-purple-600 bg-purple-50",
            },
            {
              label: "Delivered",
              value: "225",
              icon: CheckCircle,
              color: "text-green-600 bg-green-50",
            },
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
            <Package className="h-8 w-8 text-blue-400" />
          </div>
          <h3 className="mb-1 text-base font-semibold text-gray-700">
            Order Management Coming Soon
          </h3>
          <p className="max-w-sm text-sm text-gray-400">
            Full order tracking, fulfillment management, shipping updates, and customer
            communications.
          </p>
        </div>
      </div>
    </div>
  );
}
