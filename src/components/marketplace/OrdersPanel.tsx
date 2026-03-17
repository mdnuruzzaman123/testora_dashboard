"use client";

import type {
  MarketplaceOrder,
  MarketplaceOrderStatus,
  MarketplacePaymentStatus,
} from "@/lib/marketplace-data";
import { Search, ShoppingBag } from "lucide-react";

function paymentClass(status: MarketplacePaymentStatus) {
  return status === "Paid"
    ? "border-[#bfe6c9] bg-[#e8f7ed] text-[#3c9b63]"
    : "border-[#f0dfc1] bg-[#fff5e8] text-[#cf8d34]";
}

function orderClass(status: MarketplaceOrderStatus) {
  if (status === "Processing") return "border-[#d7e8ff] bg-[#eef5ff] text-[#4d79bb]";
  if (status === "Shipped") return "border-[#d9d3fb] bg-[#f5efff] text-[#8a63db]";
  if (status === "Delivered") return "border-[#bfe6c9] bg-[#e8f7ed] text-[#3c9b63]";
  return "border-[#f0dfc1] bg-[#fff5e8] text-[#cf8d34]";
}

export default function OrdersPanel({ orders }: { orders: MarketplaceOrder[] }) {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-lg font-semibold text-[#3f5f7a]">Marketplace Orders</h3>
        <p className="text-xs text-[#8ea1b4]">
          Physical product orders from the website marketplace
        </p>
      </div>

      <div className="rounded-lg border border-[#c8ddf2] bg-[#eaf4fd] px-4 py-3 text-[11px] text-[#5b83ab]">
        <p className="flex items-start gap-2 leading-relaxed">
          <ShoppingBag className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2f86d8]" />
          <span>
            <span className="font-semibold text-[#2f5d8d]">Marketplace Orders:</span> These are
            physical product purchases that require shipping and delivery management. Digital
            subscription orders are managed separately.
          </span>
        </p>
      </div>

      <div className="grid gap-2 rounded-lg border border-[#dce7f2] bg-white p-2.5 md:grid-cols-[1fr_1fr]">
        <label className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-[#9ab0c3]" />
          <input
            placeholder="Search by Order ID, Name, or Phone..."
            className="h-9 w-full rounded-md border border-[#dce7f2] bg-[#f8fbff] pr-3 pl-8 text-sm text-[#3f5f7a] outline-none placeholder:text-[#9ab0c3]"
          />
        </label>
        <input className="h-9 rounded-md border border-[#dce7f2] bg-[#f8fbff] px-3 text-sm text-[#587189] outline-none" />
      </div>

      <section className="overflow-hidden rounded-lg border border-[#dce7f2] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-260 text-left">
            <thead className="bg-[#f3f7fb] text-[10px] font-semibold tracking-wide text-[#6f859b] uppercase">
              <tr>
                <th className="px-3 py-2.5">Order ID</th>
                <th className="px-3 py-2.5">Customer Name</th>
                <th className="px-3 py-2.5">Phone Number</th>
                <th className="px-3 py-2.5">Product</th>
                <th className="px-3 py-2.5">Quantity</th>
                <th className="px-3 py-2.5">Total Price</th>
                <th className="px-3 py-2.5">Payment Status</th>
                <th className="px-3 py-2.5">Order Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-[#ecf2f8] text-xs text-[#5e768e] last:border-b-0 hover:bg-[#f8fbff]"
                >
                  <td className="px-3 py-2.5 font-medium text-[#4d79bb]">{order.id}</td>
                  <td className="px-3 py-2.5 text-[#3f5f7a]">{order.customerName}</td>
                  <td className="px-3 py-2.5">{order.phoneNumber}</td>
                  <td className="px-3 py-2.5">{order.product}</td>
                  <td className="px-3 py-2.5">{order.quantity}</td>
                  <td className="px-3 py-2.5">€{order.totalPrice.toFixed(2)}</td>
                  <td className="px-3 py-2.5">
                    <span
                      className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${paymentClass(order.paymentStatus)}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-3 py-2.5">
                    <span
                      className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${orderClass(order.orderStatus)}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="text-[11px] text-[#8ea1b4]">
        Showing {orders.length} of {orders.length} orders
      </p>
    </div>
  );
}
