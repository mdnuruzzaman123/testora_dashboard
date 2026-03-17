export type MarketplaceTab =
  | "overview"
  | "products"
  | "categories"
  | "inventory"
  | "orders"
  | "autods"
  | "pricing"
  | "sync";

export type MarketplaceProductStatus = "Active" | "Hidden" | "Out of Stock";
export type ShippingType = "Free" | "Paid";
export type MarketplacePaymentStatus = "Paid" | "Pending";
export type MarketplaceOrderStatus = "Processing" | "Shipped" | "Pending" | "Delivered";

export type MarketplaceProduct = {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: MarketplaceProductStatus;
  imageUrl: string;
  shippingType: ShippingType;
  shippingPrice: number;
  description: string;
};

export type MarketplaceCategory = {
  name: string;
  productCount: number;
  example: string;
};

export type MarketplaceOrder = {
  id: string;
  customerName: string;
  phoneNumber: string;
  product: string;
  quantity: number;
  totalPrice: number;
  paymentStatus: MarketplacePaymentStatus;
  orderStatus: MarketplaceOrderStatus;
};

export type MarketplacePricingRule = {
  id: string;
  name: string;
  type: "percentage" | "fixed";
  value: number;
  appliesTo: string;
  status: "Active" | "Draft";
};

export const marketplaceTabs: Array<{ id: MarketplaceTab; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "products", label: "Products" },
  { id: "categories", label: "Categories" },
  { id: "inventory", label: "Inventory" },
  { id: "orders", label: "Orders" },
  { id: "autods", label: "AutoDS Integration" },
  { id: "pricing", label: "Pricing Rules" },
  { id: "sync", label: "Sync Settings" },
];

export const marketplaceProducts: MarketplaceProduct[] = [
  {
    id: "p1",
    name: "Professional Engineering Tools Kit",
    sku: "ENG-KIT-001",
    category: "Engineering Tools",
    price: 89.99,
    stock: 45,
    status: "Active",
    imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=120&h=120&fit=crop",
    shippingType: "Paid",
    shippingPrice: 4.5,
    description: "Professional engineering tools for school and lab use.",
  },
  {
    id: "p2",
    name: "Scientific Calculator TX-991",
    sku: "CALC-TX991",
    category: "Calculators",
    price: 24.5,
    stock: 120,
    status: "Active",
    imageUrl: "https://images.unsplash.com/photo-1611071522749-6e7016c5c2be?w=120&h=120&fit=crop",
    shippingType: "Free",
    shippingPrice: 0,
    description: "Advanced scientific calculator for exam preparation.",
  },
  {
    id: "p3",
    name: "Student Backpack Large",
    sku: "BAG-STU-LG",
    category: "School Bags",
    price: 55,
    stock: 67,
    status: "Active",
    imageUrl: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=120&h=120&fit=crop",
    shippingType: "Paid",
    shippingPrice: 3.5,
    description: "Durable school backpack with large storage space.",
  },
  {
    id: "p4",
    name: "Physics Textbook Set",
    sku: "BOOK-PHY-SET",
    category: "Books",
    price: 65,
    stock: 0,
    status: "Out of Stock",
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=120&h=120&fit=crop",
    shippingType: "Free",
    shippingPrice: 0,
    description: "Complete physics textbook bundle for high school learners.",
  },
  {
    id: "p5",
    name: "Professional Compass Set",
    sku: "DRAW-COMP-PRO",
    category: "Drawing Tools",
    price: 32,
    stock: 88,
    status: "Active",
    imageUrl: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=120&h=120&fit=crop",
    shippingType: "Free",
    shippingPrice: 0,
    description: "Precision geometry compass set for technical drawing.",
  },
  {
    id: "p6",
    name: "Premium Stationery Bundle",
    sku: "STAT-BUNDLE-01",
    category: "Stationery",
    price: 18.5,
    stock: 159,
    status: "Active",
    imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0ea?w=120&h=120&fit=crop",
    shippingType: "Paid",
    shippingPrice: 2.99,
    description: "Pens, pencils, markers, sticky notes, and notebook essentials.",
  },
  {
    id: "p7",
    name: "Chemistry Lab Equipment Kit",
    sku: "CHEM-LAB-KIT",
    category: "Engineering Tools",
    price: 125,
    stock: 23,
    status: "Hidden",
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=120&h=120&fit=crop",
    shippingType: "Paid",
    shippingPrice: 5.5,
    description: "Starter lab equipment kit for chemistry classes.",
  },
  {
    id: "p8",
    name: "Technical Drawing Board A3",
    sku: "DRAW-BOARD-A3",
    category: "Drawing Tools",
    price: 78,
    stock: 34,
    status: "Active",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120&h=120&fit=crop",
    shippingType: "Paid",
    shippingPrice: 6,
    description: "A3 technical drawing board for architecture and engineering students.",
  },
];

export const marketplaceCategories: MarketplaceCategory[] = [
  { name: "School Bags", productCount: 8, example: "Backpacks, laptop bags, sets." },
  { name: "Books", productCount: 15, example: "Textbooks and revision materials." },
  { name: "Engineering Tools", productCount: 12, example: "Technical equipment." },
  { name: "Stationery", productCount: 23, example: "Pens, pencils, notebooks, etc." },
  { name: "Calculators", productCount: 9, example: "Scientific and graphing calculators." },
  { name: "Drawing Tools", productCount: 3, example: "Boards, compass sets, rulers." },
];

export const marketplaceOverviewBlocks = {
  includes: [
    "Physical product catalog",
    "E-commerce checkout system",
    "Shipping and delivery management",
    "Payment processing (Stripe, PayPal, Cash)",
    "AutoDS dropshipping integration",
    "Stock and inventory control",
  ],
  excludes: [
    "Semimatura subscription plans",
    "Matura subscription plans",
    "Entrance Exam subscription plans",
    "Digital test packages",
    "Mobile app quiz system",
  ],
};

export const marketplaceQuickActions = [
  { id: "add", label: "Add New Product", color: "border-[#cfe0f4] bg-[#eef5ff] text-[#4d79bb]" },
  {
    id: "category",
    label: "Manage Categories",
    color: "border-[#d1e9df] bg-[#edf8f3] text-[#3ea666]",
  },
  {
    id: "sync",
    label: "Sync AutoDS Products",
    color: "border-[#e8dcfa] bg-[#f5efff] text-[#a04de0]",
  },
  { id: "orders", label: "View Orders", color: "border-[#f0dfc1] bg-[#fff5e8] text-[#cf8d34]" },
];

export const marketplaceOrders: MarketplaceOrder[] = [
  {
    id: "MKT-ORD-661",
    customerName: "Arben Gashi",
    phoneNumber: "+383 44 123 456",
    product: "Professional Engineering Tools Kit",
    quantity: 1,
    totalPrice: 89.99,
    paymentStatus: "Paid",
    orderStatus: "Processing",
  },
  {
    id: "MKT-ORD-662",
    customerName: "Besarta Krasniqi",
    phoneNumber: "+383 49 007 654",
    product: "Student Backpack Large",
    quantity: 2,
    totalPrice: 110,
    paymentStatus: "Paid",
    orderStatus: "Shipped",
  },
  {
    id: "MKT-ORD-663",
    customerName: "Driton Berisha",
    phoneNumber: "+383 45 234 567",
    product: "Scientific Calculator TX-991",
    quantity: 3,
    totalPrice: 83,
    paymentStatus: "Pending",
    orderStatus: "Pending",
  },
  {
    id: "MKT-ORD-664",
    customerName: "Fjolla Hoxha",
    phoneNumber: "+383 48 678 543",
    product: "Premium Stationery Bundle",
    quantity: 5,
    totalPrice: 105,
    paymentStatus: "Paid",
    orderStatus: "Delivered",
  },
];

export const autoDsCapabilities = [
  {
    title: "Product Import",
    description: "Import products directly from multiple suppliers with automated catalog sync.",
  },
  {
    title: "Stock Synchronization",
    description: "Real-time stock level updates from suppliers to marketplace inventory.",
  },
  {
    title: "Price Management",
    description: "Sync supplier base prices and apply automatic markup rules.",
  },
  {
    title: "Automated Dropshipping",
    description: "Connect with suppliers for automated order fulfillment.",
  },
];

export const autoDsSyncFields = [
  "Product Title",
  "Product Images",
  "Product Description",
  "Supplier Base Price",
  "Stock Quantity",
  "SKU / Supplier Product ID",
];

export const marketplacePricingRules: MarketplacePricingRule[] = [
  {
    id: "rule-1",
    name: "30% Markup",
    type: "percentage",
    value: 30,
    appliesTo: "Applied to all AutoDS imported products",
    status: "Active",
  },
];

export const syncIntervalOptions = [
  "Manual",
  "Every 6 hours",
  "Every 12 hours",
  "Every 24 hours",
] as const;

export const syncIntervalCards = [
  {
    title: "Every 6 Hours",
    description:
      "Products sync 4 times per day. Best for high-demand products with frequent stock changes.",
  },
  {
    title: "Every 12 Hours",
    description: "Products sync 2 times per day. Balanced option for most marketplaces.",
  },
  {
    title: "Every 24 Hours",
    description: "Products sync once daily. Suitable for stable inventory with minimal changes.",
  },
  {
    title: "Manual Sync",
    description: "No automatic sync. You control when products are updated from suppliers.",
  },
];

export const syncDataFields = [
  { title: "Product Title", description: "Name and description updates" },
  { title: "Product Images", description: "Latest product imagery" },
  { title: "Supplier Base Price", description: "Current wholesale pricing" },
  { title: "Stock Quantity", description: "Real-time inventory levels" },
  { title: "Product Status", description: "Availability and visibility" },
  { title: "SKU / Product ID", description: "Supplier reference data" },
];
