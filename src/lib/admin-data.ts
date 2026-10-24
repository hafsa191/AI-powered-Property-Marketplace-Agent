// INTERNAL admin-only data. Must never be imported by public pages.
export type QStatus = "Pending" | "Accepted" | "Rejected" | "Final";

export interface Query {
  id: string;
  kind: "Buyer" | "Seller";
  name: string;
  phone: string;
  channel: "WhatsApp" | "AI Call" | "Web Form";
  requirement: string;
  budget: string;
  area: string;
  date: string;
  status: QStatus;
}

const names = ["Ali Hassan", "Zara Ahmed", "Usman Tariq", "Mehwish Ali", "Kamran Shah", "Nida Farooq", "Saad Qureshi", "Rabia Iqbal", "Hamza Butt", "Iqra Noor", "Faisal Mirza", "Amna Sheikh"];
const reqs = ["4-bed house, garden", "2-bed furnished apartment", "Commercial office floor", "1 Kanal villa with pool", "3-bed apartment, sea view", "Plot for construction"];
const areas = ["DHA Phase 6", "Clifton", "Gulberg III", "F-7", "Bahria Town", "E-11"];
const statuses: QStatus[] = ["Pending", "Accepted", "Pending", "Rejected", "Final", "Pending"];
const channels = ["WhatsApp", "AI Call", "Web Form"] as const;

export const QUERIES: Query[] = names.flatMap((n, i) =>
  (["Buyer", "Seller"] as const).map((kind, k) => ({
    id: `${kind[0]}Q-${2400 + i * 2 + k}`,
    kind,
    name: k ? names[(i + 5) % names.length] : n,
    phone: `+92 3${(i + k) % 5}${i} ${1000000 + i * 73519 + k * 911}`.slice(0, 16),
    channel: channels[(i + k) % 3],
    requirement: reqs[(i + k) % reqs.length],
    budget: ["PKR 8 Cr", "PKR 2.5 Lac/mo", "PKR 12 Cr", "PKR 4.5 Cr", "PKR 1.8 Lac/mo"][(i + k) % 5],
    area: areas[(i + k * 2) % areas.length],
    date: `Oct ${10 - (i % 9)}, 2026`,
    status: statuses[(i + k) % statuses.length],
  })),
);

export type PStatus = "Available" | "Verified" | "Pending Review" | "Sold" | "Rented";
export const ADMIN_PROPERTIES = [
  { id: "AE-1024", title: "Cliffside Glass Villa", type: "Villa", price: "PKR 18.5 Cr", exact: "Plot 14-C, Khayaban-e-Seher, DHA Ph 8", seller: "Imran Chaudhry", sellerPhone: "+92 321 4455120", status: "Verified" as PStatus },
  { id: "AE-1031", title: "Marble Atrium Residence", type: "House", price: "PKR 9.2 Cr", exact: "House 22, Block E1, Gulberg III", seller: "Saima Rauf", sellerPhone: "+92 300 8811234", status: "Available" as PStatus },
  { id: "AE-1045", title: "Skyline Tower Apartment", type: "Apartment", price: "PKR 3.5 Lac/mo", exact: "Apt 1702, Ocean Heights, Block 5", seller: "Waqas Jamil", sellerPhone: "+92 333 2109876", status: "Rented" as PStatus },
  { id: "AE-1052", title: "Timber & Stone Family Home", type: "House", price: "PKR 6.45 Cr", exact: "Street 9, House 41, E-11/3", seller: "Nadia Khan", sellerPhone: "+92 345 6677889", status: "Pending Review" as PStatus },
  { id: "AE-1060", title: "Twilight Penthouse", type: "Penthouse", price: "PKR 12.8 Cr", exact: "PH-2, Emerald Tower, Clifton Blk 5", seller: "Adnan Baig", sellerPhone: "+92 302 1234567", status: "Sold" as PStatus },
  { id: "AE-1068", title: "Corporate Office Floor", type: "Commercial", price: "PKR 12 Lac/mo", exact: "Floor 9, Saudi Pak Tower, Blue Area", seller: "Prime Holdings", sellerPhone: "+92 51 2876543", status: "Pending Review" as PStatus },
];

export const MEETINGS = [
  { id: 1, title: "Viewing · Cliffside Glass Villa", with: "Ayesha Raza", kind: "Buyer", day: 12, time: "11:00 AM", status: "Confirmed" },
  { id: 2, title: "Listing consult · Marble Atrium", with: "Saima Rauf", kind: "Seller", day: 12, time: "3:30 PM", status: "Pending" },
  { id: 3, title: "Viewing · Garden-View Suite", with: "Usman Tariq", kind: "Buyer", day: 14, time: "1:00 PM", status: "Confirmed" },
  { id: 4, title: "Price negotiation · Penthouse", with: "Adnan Baig", kind: "Seller", day: 16, time: "5:00 PM", status: "Reschedule requested" },
  { id: 5, title: "Viewing · Skyline Apartment", with: "Zara Ahmed", kind: "Buyer", day: 19, time: "12:00 PM", status: "Confirmed" },
  { id: 6, title: "Document check · Office Floor", with: "Prime Holdings", kind: "Seller", day: 22, time: "10:30 AM", status: "Pending" },
];

export const NOTIFICATIONS = [
  { t: "New buyer query via WhatsApp", d: "Ali Hassan · 4-bed house, DHA Phase 6", time: "2 min ago", type: "query" },
  { t: "AI found 3 matches", d: "For BQ-2402 · top match 95%", time: "18 min ago", type: "ai" },
  { t: "Meeting reschedule requested", d: "Adnan Baig · Penthouse negotiation", time: "1 h ago", type: "meeting" },
  { t: "Property marked as Sold", d: "AE-1060 Twilight Penthouse", time: "3 h ago", type: "deal" },
  { t: "Seller documents uploaded", d: "AE-1068 Corporate Office Floor", time: "5 h ago", type: "query" },
  { t: "New 5★ review received", d: "Sana Javed · Buyer", time: "Yesterday", type: "review" },
];

export const PRICE_TREND = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"].map((m, i) => ({ m, karachi: 42 + i * 2.4 + (i % 2), lahore: 38 + i * 1.8, islamabad: 45 + i * 2.1 - (i % 3) }));
export const VOLUME = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => ({ d, buyers: [34, 42, 38, 51, 47, 62, 29][i], sellers: [12, 18, 15, 22, 19, 26, 9][i] }));
export const MATCH_PERF = ["W1", "W2", "W3", "W4", "W5", "W6"].map((w, i) => ({ w, accuracy: [78, 81, 84, 86, 90, 93][i], accepted: [52, 58, 61, 66, 71, 77][i] }));
export const DEALS = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"].map((m, i) => ({ m, sold: [18, 22, 19, 27, 31, 34][i], rented: [32, 35, 41, 38, 46, 52][i] }));
export const QUERY_STATUS = [
  { name: "Pending", value: 38 },
  { name: "Accepted", value: 64 },
  { name: "Rejected", value: 14 },
  { name: "Final", value: 41 },
];
