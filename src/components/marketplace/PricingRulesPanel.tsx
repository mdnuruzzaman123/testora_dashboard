"use client";

import { marketplacePricingRules } from "@/lib/marketplace-data";
import { Calculator, DollarSign } from "lucide-react";
import { useMemo, useState } from "react";

export default function PricingRulesPanel() {
  const [markupType, setMarkupType] = useState<"percentage" | "fixed">("percentage");
  const [markupValue, setMarkupValue] = useState("30");
  const [supplierPrice, setSupplierPrice] = useState("9.98");

  const result = useMemo(() => {
    const basePrice = Number(supplierPrice) || 0;
    const value = Number(markupValue) || 0;
    const markup = markupType === "percentage" ? (basePrice * value) / 100 : value;
    return {
      basePrice,
      markup,
      total: basePrice + markup,
    };
  }, [markupType, markupValue, supplierPrice]);

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-lg font-semibold text-[#3f5f7a]">Pricing Rules</h3>
        <p className="text-xs text-[#8ea1b4]">Set automatic markup rules for imported products</p>
      </div>

      <section className="rounded-lg border border-[#cfe8d6] bg-[#eefaf2] p-4">
        <h4 className="text-sm font-medium text-[#3f5f7a]">How Pricing Rules Work</h4>
        <p className="mt-1 text-[11px] text-[#8ea1b4]">
          When products are imported from AutoDS, pricing rules automatically calculate the
          marketplace selling price based on the supplier&apos;s base price and your markup
          settings.
        </p>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          <div className="rounded-md border border-[#d4eadf] bg-white p-3">
            <p className="text-xs font-medium text-[#3f5f7a]">Percentage Markup</p>
            <p className="mt-1 text-[10px] text-[#8ea1b4]">
              Add a percentage on top of the supplier base price
            </p>
            <p className="mt-1 text-[10px] text-[#90a3b6]">
              Example: Supplier $10 + 30% = Marketplace $13
            </p>
          </div>
          <div className="rounded-md border border-[#d4eadf] bg-white p-3">
            <p className="text-xs font-medium text-[#3f5f7a]">Fixed Markup</p>
            <p className="mt-1 text-[10px] text-[#8ea1b4]">
              Add a fixed amount to the supplier base price
            </p>
            <p className="mt-1 text-[10px] text-[#90a3b6]">
              Example: Supplier $10 + $5 = Marketplace $15
            </p>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-[#dce7f2] bg-white">
        <div className="flex items-center justify-between border-b border-[#e8eef5] px-4 py-3">
          <h4 className="text-sm font-medium text-[#3f5f7a]">Active Pricing Rules</h4>
          <button
            type="button"
            className="rounded-md bg-[#57a9e7] px-3 py-1.5 text-xs font-medium text-white"
          >
            + Add Rule
          </button>
        </div>
        <div className="p-3">
          {marketplacePricingRules.map((rule) => (
            <div
              key={rule.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-[#e8eef5] px-3 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[#d4eadf] bg-[#eefaf2] text-[#3ea666]">
                  <DollarSign className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#3f5f7a]">
                    {rule.type === "percentage"
                      ? `${rule.value}% Markup`
                      : `€${rule.value} Fixed Markup`}
                  </p>
                  <p className="text-[10px] text-[#8ea1b4]">{rule.appliesTo}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="inline-flex rounded-full border border-[#bfe6c9] bg-[#e8f7ed] px-2 py-0.5 text-[10px] font-medium text-[#3c9b63]">
                  {rule.status}
                </span>
                <button type="button" className="text-[#4d79bb]">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-[#dce7f2] bg-white">
        <div className="border-b border-[#e8eef5] px-4 py-3">
          <h4 className="flex items-center gap-2 text-sm font-medium text-[#3f5f7a]">
            <Calculator className="h-4 w-4 text-[#4d79bb]" /> Live Price Calculator
          </h4>
        </div>
        <div className="grid gap-3 p-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-[10px] font-medium text-[#6f859b]">
                Markup Type
              </label>
              <select
                value={markupType}
                onChange={(event) => setMarkupType(event.target.value as "percentage" | "fixed")}
                className="h-9 w-full rounded-md border border-[#dce7f2] bg-white px-3 text-sm text-[#587189] outline-none"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-medium text-[#6f859b]">
                Markup Percentage (%)
              </label>
              <input
                value={markupValue}
                onChange={(event) => setMarkupValue(event.target.value)}
                className="h-9 w-full rounded-md border border-[#dce7f2] bg-white px-3 text-sm text-[#587189] outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-medium text-[#6f859b]">
                Example Supplier Base Price (€)
              </label>
              <input
                value={supplierPrice}
                onChange={(event) => setSupplierPrice(event.target.value)}
                className="h-9 w-full rounded-md border border-[#dce7f2] bg-white px-3 text-sm text-[#587189] outline-none"
              />
            </div>
          </div>

          <div className="rounded-md border border-[#d8e5f5] bg-[#eef5ff] p-4">
            <h5 className="text-xs font-medium text-[#3f5f7a]">Calculation Result</h5>
            <div className="mt-3 space-y-2 text-xs text-[#6f859b]">
              <div className="flex items-center justify-between">
                <span>Supplier Base Price:</span>
                <span>€{result.basePrice.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Markup:</span>
                <span className="text-[#57a9e7]">
                  {markupType === "percentage"
                    ? `+${markupValue}%`
                    : `+€${Number(markupValue || 0).toFixed(2)}`}
                </span>
              </div>
              <div className="border-t border-[#d4e2f3] pt-2 text-sm font-semibold text-[#20a45c]">
                <div className="flex items-center justify-between">
                  <span>Marketplace Price:</span>
                  <span>€{result.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="mt-3 rounded-md border border-[#dce7f2] bg-white px-3 py-2 text-[10px] text-[#8ea1b4]">
              Example: Supplier price €{result.basePrice.toFixed(2)} +{" "}
              {markupType === "percentage"
                ? `${markupValue}%`
                : `€${Number(markupValue || 0).toFixed(2)}`}{" "}
              = €{result.total.toFixed(2)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
