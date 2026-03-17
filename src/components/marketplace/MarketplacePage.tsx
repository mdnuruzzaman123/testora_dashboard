"use client";

import AddProductModal from "@/components/marketplace/AddProductModal";
import AutoDsIntegrationPanel from "@/components/marketplace/AutoDsIntegrationPanel";
import CategoriesPanel from "@/components/marketplace/CategoriesPanel";
import InventoryPanel from "@/components/marketplace/InventoryPanel";
import OrdersPanel from "@/components/marketplace/OrdersPanel";
import OverviewPanel from "@/components/marketplace/OverviewPanel";
import PricingRulesPanel from "@/components/marketplace/PricingRulesPanel";
import ProductsPanel from "@/components/marketplace/ProductsPanel";
import SyncSettingsPanel from "@/components/marketplace/SyncSettingsPanel";
import {
  marketplaceCategories,
  marketplaceOrders,
  marketplaceProducts,
  marketplaceTabs,
  type MarketplaceProduct,
  type MarketplaceTab,
} from "@/lib/marketplace-data";
import { cn } from "@/lib/utils";
import {
  Boxes,
  FolderOpen,
  Info,
  Package,
  RefreshCw,
  Settings2,
  ShoppingBag,
  Store,
  Tag,
} from "lucide-react";
import { useMemo, useState } from "react";

const tabIcons = {
  overview: Store,
  products: Package,
  categories: FolderOpen,
  inventory: Boxes,
  orders: ShoppingBag,
  autods: RefreshCw,
  pricing: Tag,
  sync: Settings2,
} satisfies Record<MarketplaceTab, typeof Store>;

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState<MarketplaceTab>("overview");
  const [showAddModal, setShowAddModal] = useState(false);
  const [products, setProducts] = useState(marketplaceProducts);

  const activeProducts = useMemo(
    () => products.filter((product) => product.status === "Active"),
    [products]
  );

  const renderTab = () => {
    if (activeTab === "overview") {
      return (
        <OverviewPanel
          onOpenAddProduct={() => setShowAddModal(true)}
          onNavigateTab={setActiveTab}
        />
      );
    }
    if (activeTab === "products") {
      return <ProductsPanel products={products} onOpenAddProduct={() => setShowAddModal(true)} />;
    }
    if (activeTab === "categories") {
      return <CategoriesPanel categories={marketplaceCategories} />;
    }
    if (activeTab === "inventory") {
      return <InventoryPanel products={products} />;
    }
    if (activeTab === "orders") {
      return <OrdersPanel orders={marketplaceOrders} />;
    }
    if (activeTab === "autods") {
      return <AutoDsIntegrationPanel />;
    }
    if (activeTab === "pricing") {
      return <PricingRulesPanel />;
    }

    return <SyncSettingsPanel />;
  };

  return (
    <div className="space-y-3">
      <section>
        <h1 className="text-lg font-semibold text-[#3f5f7a]">Marketplace Management</h1>
        <p className="text-sm text-[#7e95ab]">
          Manage physical product sales, inventory, categories, and AutoDS integration
        </p>
      </section>

      <div className="rounded-lg border border-[#c8ddf2] bg-[#eaf4fd] px-4 py-3 text-[11px] text-[#5b83ab]">
        <p className="flex items-start gap-2 leading-relaxed">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2f86d8]" />
          <span>
            <span className="font-semibold text-[#2f5d8d]">Website-Only Marketplace:</span> This
            marketplace is for physical products only (school bags, books, calculators, engineering
            tools, stationery, etc.). It exists only on the website, not in the mobile app.
          </span>
        </p>
        <p className="mt-1 pl-5 text-[11px] text-[#2f86d8]">
          Completely Separate from Subscription: Digital subscription packages (Semimatura, Matura,
          Entrance Exams) are managed separately. The marketplace is exclusively for physical
          product e-commerce.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 border-b border-[#dce7f2] pb-2 text-xs text-[#6f859b]">
        {marketplaceTabs.map((tab) => {
          const Icon = tabIcons[tab.id];
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-1.5 border-b-2 pb-1 font-medium",
                activeTab === tab.id
                  ? "border-[#4d96d8] text-[#2f86d8]"
                  : "border-transparent hover:text-[#3f5f7a]"
              )}
            >
              <Icon className="h-3 w-3" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {renderTab()}

      <AddProductModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onCreate={(draft) => {
          const nextProduct: MarketplaceProduct = {
            id: `p${products.length + 1}`,
            imageUrl: activeProducts[0]?.imageUrl ?? marketplaceProducts[0].imageUrl,
            ...draft,
          };
          setProducts((prev) => [nextProduct, ...prev]);
        }}
      />
    </div>
  );
}
