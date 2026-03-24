"use client";

import { marketplacePricingRules } from "@/lib/marketplace-data";
import { Calculator, DollarSign, X } from "lucide-react";
import { useMemo, useState } from "react";

export default function PricingRulesPanel() {
  const [markupType, setMarkupType] = useState<"percentage" | "fixed">("percentage");
  const [markupValue, setMarkupValue] = useState("30");
  const [supplierPrice, setSupplierPrice] = useState("9.98");

  const [isCreateRuleOpen, setIsCreateRuleOpen] = useState(false);
  const [ruleName, setRuleName] = useState("");
  const [modalMarkupType, setModalMarkupType] = useState<"percentage" | "fixed">("percentage");
  const [modalMarkupValue, setModalMarkupValue] = useState("30");

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

  const modalPreview = useMemo(() => {
    const basePrice = 10;
    const value = Number(modalMarkupValue) || 0;
    const markup = modalMarkupType === "percentage" ? (basePrice * value) / 100 : value;
    return {
      basePrice,
      total: basePrice + markup,
    };
  }, [modalMarkupType, modalMarkupValue]);

  return (
    <>
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
              onClick={() => setIsCreateRuleOpen(true)}
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

      {isCreateRuleOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6"
          onClick={() => setIsCreateRuleOpen(false)}
        >
          <div
            className="w-full max-w-5xl rounded-sm border border-[#dce7f2] bg-white shadow-sm"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#e8eef5] px-4 py-3">
              <div>
                <h4 className="text-2xl font-semibold tracking-tight text-[#3f5f7a]">
                  Create Pricing Rule
                </h4>
                <p className="mt-1 text-[11px] text-[#8ea1b4]">
                  Create a new pricing rule to automatically adjust the prices of AutoDS imported
                  products in your marketplace.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateRuleOpen(false)}
                className="text-[#9cb0c3] hover:text-[#7c92a9]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="grid gap-3 p-4 lg:grid-cols-[1.75fr_0.85fr]">
              <div className="rounded-md border border-[#dce7f2] p-3">
                <div>
                  <label className="mb-1 block text-[10px] font-semibold text-[#6f859b]">
                    Rule Name
                  </label>
                  <input
                    value={ruleName}
                    onChange={(event) => setRuleName(event.target.value)}
                    placeholder="e.g., 30% Markup or Books Fixed Margin"
                    className="h-9 w-full rounded-md border border-[#dce7f2] px-3 text-xs text-[#587189] outline-none placeholder:text-[#9fb0bf]"
                  />
                </div>

                <div className="mt-3">
                  <label className="mb-1 block text-[10px] font-semibold text-[#6f859b]">
                    Rule Type
                  </label>
                  <div className="inline-flex items-center rounded-md border border-[#dce7f2] bg-white p-0.5">
                    <button
                      type="button"
                      onClick={() => setModalMarkupType("percentage")}
                      className={`rounded-sm px-3 py-1 text-[10px] font-medium transition ${
                        modalMarkupType === "percentage"
                          ? "bg-[#eef5ff] text-[#4d79bb]"
                          : "text-[#6f859b] hover:text-[#4d79bb]"
                      }`}
                    >
                      Percentage Markup
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalMarkupType("fixed")}
                      className={`rounded-sm px-3 py-1 text-[10px] font-medium transition ${
                        modalMarkupType === "fixed"
                          ? "bg-[#eef5ff] text-[#4d79bb]"
                          : "text-[#6f859b] hover:text-[#4d79bb]"
                      }`}
                    >
                      Fixed Markup
                    </button>
                  </div>
                </div>

                <div className="mt-3">
                  <label className="mb-1 block text-[10px] font-semibold text-[#6f859b]">
                    Markup Value
                  </label>
                  <div className="relative">
                    <input
                      value={modalMarkupValue}
                      onChange={(event) => setModalMarkupValue(event.target.value)}
                      className="h-9 w-full rounded-md border border-[#dce7f2] px-3 pr-8 text-xs text-[#587189] outline-none"
                    />
                    <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[10px] text-[#9cb0c3]">
                      {modalMarkupType === "percentage" ? "%" : "EUR"}
                    </span>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-[10px] font-semibold text-[#6f859b]">Apply To</p>
                  <div className="mt-2 space-y-1.5 text-[10px] text-[#5f7388]">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="apply-to-modal"
                        defaultChecked
                        className="h-3 w-3"
                      />
                      <span>All AutoDS Imported Products</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="apply-to-modal" className="h-3 w-3" />
                      <span>Specific Category</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="apply-to-modal" className="h-3 w-3" />
                      <span>Specific Supplier</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="apply-to-modal" className="h-3 w-3" />
                      <span>Specific Product Group</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-md border border-[#dce7f2] p-3">
                  <h5 className="text-xs font-semibold text-[#3f5f7a]">Price Preview</h5>
                  <div className="mt-3 space-y-2 text-[10px] text-[#6f859b]">
                    <div className="flex items-center justify-between border-b border-[#edf2f8] pb-1.5">
                      <span>Supplier Price</span>
                      <span>EUR {modalPreview.basePrice.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#edf2f8] pb-1.5">
                      <span>Markup</span>
                      <span className="text-[#57a9e7]">
                        {modalMarkupType === "percentage"
                          ? `${Number(modalMarkupValue || 0)}%`
                          : `EUR ${Number(modalMarkupValue || 0).toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-semibold text-[#3f5f7a]">
                      <span>Final Marketplace Price</span>
                      <span className="text-[#57a9e7]">EUR {modalPreview.total.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="mt-3 rounded-md border border-[#d9e9fb] bg-[#eef5ff] px-2 py-2 text-[9px] text-[#7aa4d8]">
                    This is an example calculation. Actual prices will vary based on supplier
                    pricing.
                  </div>
                </div>

                <div className="rounded-md border border-[#dce7f2] p-3">
                  <h5 className="text-xs font-semibold text-[#3f5f7a]">Status</h5>
                  <div className="mt-3 space-y-1.5 text-[10px] text-[#5f7388]">
                    <label className="flex items-start gap-2">
                      <input
                        type="radio"
                        name="status-modal"
                        defaultChecked
                        className="mt-0.5 h-3 w-3"
                      />
                      <span>
                        <span className="block">Active</span>
                        <span className="text-[9px] text-[#9db0c3]">
                          Rule will be applied immediately
                        </span>
                      </span>
                    </label>
                    <label className="flex items-start gap-2">
                      <input type="radio" name="status-modal" className="mt-0.5 h-3 w-3" />
                      <span>
                        <span className="block">Inactive</span>
                        <span className="text-[9px] text-[#9db0c3]">
                          Rule will be saved but not applied
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-[#e8eef5] px-4 py-2.5">
              <button
                type="button"
                onClick={() => setIsCreateRuleOpen(false)}
                className="rounded-md border border-[#dce7f2] bg-white px-3 py-1.5 text-[10px] font-medium text-[#5f7388] hover:bg-[#f7fbff]"
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-md bg-[#57a9e7] px-3 py-1.5 text-[10px] font-semibold text-white hover:bg-[#4998d5]"
              >
                Save Rule
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
