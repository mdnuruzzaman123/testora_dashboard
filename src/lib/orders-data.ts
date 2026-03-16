export type PaymentMethod = "COD" | "Card";
export type PaymentStatus = "Paid" | "COD Pending" | "Refunded" | "Failed";
export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled" | "Returned" | "New";

export type OrderItem = {
  id: string;
  title: string;
  quantity: number;
  unitPrice: number;
  imageUrl: string;
};

export type Order = {
  id: string;
  date: string;
  customerName: string;
  customerEmail: string;
  phoneNumber: string;
  productSummary: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  totalAmount: number;
  subtotal: number;
  shippingCost: number;
  shipping: {
    courierService: string;
    trackingNumber: string;
    city: string;
    country: string;
    address: string;
    postalCode: string;
  };
  customerNote: string;
  adminNote: string;
  items: OrderItem[];
};

export const orders: Order[] = [
  {
    id: "ORD-2026-00458",
    date: "March 10, 2026",
    customerName: "Arben Gashi",
    customerEmail: "arben.gashi@email.com",
    phoneNumber: "+383 44 123 456",
    productSummary: "Engineering Tools Kit +1 item",
    paymentMethod: "COD",
    paymentStatus: "COD Pending",
    orderStatus: "Processing",
    totalAmount: 142.49,
    subtotal: 138.99,
    shippingCost: 3.5,
    shipping: {
      courierService: "Posta e Kosoves",
      trackingNumber: "PK2026034587",
      city: "Prishtina",
      country: "Kosovo",
      address: "Rr. Nena Tereze, Nr. 25",
      postalCode: "10000",
    },
    customerNote: "Please call before delivery.",
    adminNote: "Customer requested delivery tomorrow.",
    items: [
      {
        id: "item-1",
        title: "Engineering Tools Kit",
        quantity: 1,
        unitPrice: 89.99,
        imageUrl:
          "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=120&h=80&fit=crop",
      },
      {
        id: "item-2",
        title: "Scientific Calculator",
        quantity: 2,
        unitPrice: 24.5,
        imageUrl:
          "https://images.unsplash.com/photo-1611071522749-6e7016c5c2be?w=120&h=80&fit=crop",
      },
    ],
  },
  {
    id: "ORD-2026-00457",
    date: "March 9, 2026",
    customerName: "Besarta Krasniqi",
    customerEmail: "besarta.k@email.com",
    phoneNumber: "+383 49 887 654",
    productSummary: "Physics Textbook Set",
    paymentMethod: "Card",
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    totalAmount: 68,
    subtotal: 64,
    shippingCost: 4,
    shipping: {
      courierService: "Posta e Kosoves",
      trackingNumber: "PK2026034572",
      city: "Prizren",
      country: "Kosovo",
      address: "Rr. Lidhja e Prizrenit, 17",
      postalCode: "20000",
    },
    customerNote: "",
    adminNote: "",
    items: [
      {
        id: "item-3",
        title: "Physics Textbook Set",
        quantity: 1,
        unitPrice: 64,
        imageUrl:
          "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=120&h=80&fit=crop",
      },
    ],
  },
  {
    id: "ORD-2026-00456",
    date: "March 8, 2026",
    customerName: "Drilon Berisha",
    customerEmail: "drilon.berisha@email.com",
    phoneNumber: "+383 45 234 567",
    productSummary: "Chemistry Lab Equipment +1 item",
    paymentMethod: "Card",
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    totalAmount: 190,
    subtotal: 185,
    shippingCost: 5,
    shipping: {
      courierService: "DHL",
      trackingNumber: "DHL-23984590",
      city: "Gjakove",
      country: "Kosovo",
      address: "Rr. Ismail Qemali, 3",
      postalCode: "50000",
    },
    customerNote: "",
    adminNote: "Delivered on time",
    items: [],
  },
  {
    id: "ORD-2026-00455",
    date: "March 7, 2026",
    customerName: "Flola Hoxha",
    customerEmail: "flola.h@email.com",
    phoneNumber: "+383 44 876 543",
    productSummary: "Mathematics Drill Set",
    paymentMethod: "COD",
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    totalAmount: 40,
    subtotal: 36.5,
    shippingCost: 3.5,
    shipping: {
      courierService: "Posta e Kosoves",
      trackingNumber: "PK2026034551",
      city: "Ferizaj",
      country: "Kosovo",
      address: "Rr. Dardania, 11",
      postalCode: "70000",
    },
    customerNote: "",
    adminNote: "Cash collected",
    items: [],
  },
  {
    id: "ORD-2026-00454",
    date: "March 6, 2026",
    customerName: "Lum Morina",
    customerEmail: "lum.m@email.com",
    phoneNumber: "+383 49 345 878",
    productSummary: "Biology Microscope",
    paymentMethod: "Card",
    paymentStatus: "Failed",
    orderStatus: "Cancelled",
    totalAmount: 218,
    subtotal: 212,
    shippingCost: 6,
    shipping: {
      courierService: "N/A",
      trackingNumber: "N/A",
      city: "Peje",
      country: "Kosovo",
      address: "Rr. Bajram Kelmendi, 21",
      postalCode: "30000",
    },
    customerNote: "",
    adminNote: "Payment authorization failed",
    items: [],
  },
  {
    id: "ORD-2026-00453",
    date: "March 5, 2026",
    customerName: "Zana Kolmendi",
    customerEmail: "zana.k@email.com",
    phoneNumber: "+383 44 567 800",
    productSummary: "Engineering Notebook Pack +1 item",
    paymentMethod: "COD",
    paymentStatus: "COD Pending",
    orderStatus: "Shipped",
    totalAmount: 60,
    subtotal: 56,
    shippingCost: 4,
    shipping: {
      courierService: "Posta e Kosoves",
      trackingNumber: "PK2026034536",
      city: "Mitrovice",
      country: "Kosovo",
      address: "Rr. Mbreteresha Teute, 8",
      postalCode: "40000",
    },
    customerNote: "",
    adminNote: "",
    items: [],
  },
  {
    id: "ORD-2026-00452",
    date: "March 4, 2026",
    customerName: "Altan Hysova",
    customerEmail: "altan.h@email.com",
    phoneNumber: "+383 45 678 821",
    productSummary: "Preschool Numbers Campers Set",
    paymentMethod: "Card",
    paymentStatus: "Refunded",
    orderStatus: "Returned",
    totalAmount: 53,
    subtotal: 49,
    shippingCost: 4,
    shipping: {
      courierService: "UPS",
      trackingNumber: "UPS-KS-928374",
      city: "Gjilan",
      country: "Kosovo",
      address: "Rr. Idriz Seferi, 5",
      postalCode: "60000",
    },
    customerNote: "",
    adminNote: "Returned due to damaged package",
    items: [],
  },
  {
    id: "ORD-2026-00451",
    date: "March 3, 2026",
    customerName: "Rina Demolli",
    customerEmail: "rina.d@email.com",
    phoneNumber: "+383 49 789 012",
    productSummary: "Digital Mathematics Book",
    paymentMethod: "Card",
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    totalAmount: 49,
    subtotal: 49,
    shippingCost: 0,
    shipping: {
      courierService: "Instant Digital Delivery",
      trackingNumber: "DIG-451",
      city: "Online",
      country: "Kosovo",
      address: "Online Purchase",
      postalCode: "00000",
    },
    customerNote: "",
    adminNote: "",
    items: [],
  },
  {
    id: "ORD-2026-00450",
    date: "March 2, 2026",
    customerName: "Bekin Selihu",
    customerEmail: "bekin.s@email.com",
    phoneNumber: "+383 44 890 123",
    productSummary: "Organic Chemistry Model Kit",
    paymentMethod: "COD",
    paymentStatus: "COD Pending",
    orderStatus: "New",
    totalAmount: 82.5,
    subtotal: 78,
    shippingCost: 4.5,
    shipping: {
      courierService: "Posta e Kosoves",
      trackingNumber: "PK2026034502",
      city: "Vushtrri",
      country: "Kosovo",
      address: "Rr. Skenderbeu, 90",
      postalCode: "42000",
    },
    customerNote: "Leave at reception",
    adminNote: "",
    items: [],
  },
  {
    id: "ORD-2026-00449",
    date: "March 1, 2026",
    customerName: "Valbona Mustafa",
    customerEmail: "valbona.m@email.com",
    phoneNumber: "+383 45 901 234",
    productSummary: "Student Backpack +1 item",
    paymentMethod: "Card",
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    totalAmount: 73.5,
    subtotal: 70,
    shippingCost: 3.5,
    shipping: {
      courierService: "Posta e Kosoves",
      trackingNumber: "PK2026034498",
      city: "Prishtina",
      country: "Kosovo",
      address: "Rr. Rexhep Luci, 15",
      postalCode: "10000",
    },
    customerNote: "",
    adminNote: "",
    items: [],
  },
];
