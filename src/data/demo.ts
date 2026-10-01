import house from "@/assets/property-house.jpg";
import villa from "@/assets/property-villa.jpg";
import apartment from "@/assets/property-apartment.jpg";
import type { AppNotification, Meeting, Property, Query, Review, Theme } from "@/types/domain";

const bases = [
  ["Contemporary 5 Marla House", "House", "Buy", "Lahore", "DHA Phase 5", 32500000, 2250, 5, 4, house],
  ["Garden Villa with Pool", "House", "Buy", "Islamabad", "Bahria Town", 68000000, 4100, 6, 5, villa],
  ["Skyline Three Bed Apartment", "Apartment", "Rent", "Karachi", "Clifton", 180000, 1450, 3, 2, apartment],
  ["Family Residence", "House", "Buy", "Lahore", "Model Town", 47500000, 3300, 4, 4, house],
  ["Park-facing Apartment", "Apartment", "Rent", "Lahore", "Gulberg III", 240000, 1800, 3, 3, apartment],
  ["Designer Courtyard Home", "House", "Buy", "Islamabad", "F-11", 89500000, 5200, 6, 6, villa],
  ["Corner Residential Plot", "Plot", "Buy", "Rawalpindi", "Bahria Town", 21500000, 4500, 0, 0, villa],
  ["Canal View Residence", "House", "Buy", "Lahore", "Johar Town", 39500000, 3000, 5, 5, house],
] as const;

export const initialProperties: Property[] = Array.from({ length: 20 }, (_, i) => {
  const b = bases[i % bases.length] ?? bases[0];
  const statuses: Property["status"][] = ["Available", "Verified", "Available", "Pending Verification", "Reserved", "Sold", "Rented"];
  return { id: `P-${1001 + i}`, title: i < bases.length ? b[0] : `${b[0]} ${Math.floor(i / bases.length) + 1}`, type: b[1], purpose: b[2], city: b[3], area: b[4], price: b[5] + Math.floor(i / 8) * 2500000, size: b[6], beds: b[7], baths: b[8], furnishing: i % 3 === 0 ? "Furnished" : i % 3 === 1 ? "Semi-furnished" : "Unfurnished", amenities: ["Secure community", "Parking", ...(i % 2 ? ["Backup power"] : ["Servant quarter"])], description: "A carefully maintained property with generous living spaces, practical circulation and convenient access to established neighbourhood amenities.", image: b[9], status: statuses[i % statuses.length] ?? "Available", verified: i % 4 !== 3, createdAt: `2026-09-${String(28 - (i % 20)).padStart(2, "0")}` };
});

export const initialQueries: Query[] = Array.from({ length: 19 }, (_, i) => ({ id: `${i < 11 ? "BQ" : "SQ"}-${2401 + i}`, kind: i < 11 ? "Buyer" : "Seller", client: ["Ayesha Raza", "Hamza Khan", "Mariam Ahmed", "Bilal Saeed", "Sara Ali"][i % 5] ?? "Client", type: i % 3 ? "House" : "Apartment", location: ["DHA", "Gulberg", "Bahria Town", "Clifton"][i % 4] ?? "Lahore", budget: 25000000 + i * 2500000, date: `2026-09-${String(29 - (i % 16)).padStart(2, "0")}`, priority: i % 4 === 0 ? "High" : i % 3 === 0 ? "Medium" : "Normal", status: i % 5 === 0 ? "Accepted" : i % 7 === 0 ? "Final" : "Pending", agent: ["Noor Ahmed", "Ali Hussain", "Maha Khan"][i % 3] ?? "Team", beds: 3 + (i % 4), notes: "Prefers a verified property near schools and main access roads." }));
export const initialMeetings: Meeting[] = Array.from({ length: 10 }, (_, i) => ({ id: `M-${501+i}`, buyer: ["Ayesha Raza", "Hamza Khan", "Mariam Ahmed"][i%3] ?? "Client", propertyId: `P-${1001+(i%8)}`, date: `2026-10-${String(1+(i%10)).padStart(2,"0")}`, time: `${10+(i%7)}:00`, type: i%3===0?"Consultation":i%4===0?"Negotiation":"Viewing", status: i%4===0?"Requested":i%5===0?"Completed":"Confirmed", agent: ["Noor Ahmed","Ali Hussain"][i%2] ?? "Team" }));
export const initialNotifications: AppNotification[] = Array.from({ length: 16 }, (_, i) => ({ id:`N-${i+1}`, title:["New buyer query","Property verification required","Meeting request","AI match generated"][i%4] ?? "Update", detail:["A new DHA requirement needs review.","Documents are ready for brokerage review.","A buyer requested a Saturday viewing.","Eight relevant properties were identified."][i%4] ?? "A record was updated.", category:["Queries","Properties","Meetings","Matching"][i%4] ?? "General", priority:i%5===0?"High":"Normal", timestamp:`${8+(i%10)}:${i%2?"45":"20"}`, read:i>5 }));
export const initialReviews: Review[] = Array.from({ length: 10 }, (_, i) => ({ id:`R-${i+1}`, name:["Ayesha R.","Hamza K.","Mariam A."][i%3] ?? "Client", role:i%3===0?"Seller":"Buyer", rating:4+(i%2), text:"The team kept the process clear, shared relevant options and coordinated the viewing professionally.", status:i%4===0?"Pending":"Published", featured:i<3 }));
export const themes: Theme[] = [
  {id:"navy",name:"Executive Navy",primary:"#2563eb",accent:"#06b6d4"},{id:"gold",name:"Luxury Gold",primary:"#a67831",accent:"#e2b96f"},{id:"emerald",name:"Emerald Estate",primary:"#16856b",accent:"#55c6a9"},{id:"burgundy",name:"Burgundy Heritage",primary:"#9b3851",accent:"#d18291"},{id:"slate",name:"Slate Modern",primary:"#52637a",accent:"#9aabc0"},{id:"teal",name:"Modern Teal",primary:"#087f8c",accent:"#34b8b1"},
];