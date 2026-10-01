export type PropertyStatus = "Draft" | "Pending Verification" | "Verified" | "Available" | "Reserved" | "Sold" | "Rented" | "Archived";
export type Purpose = "Buy" | "Rent";

export interface Property {
  id: string; title: string; type: "House" | "Apartment" | "Plot" | "Commercial"; purpose: Purpose;
  city: string; area: string; price: number; size: number; beds: number; baths: number;
  furnishing: "Furnished" | "Semi-furnished" | "Unfurnished"; amenities: string[];
  description: string; image: string; status: PropertyStatus; verified: boolean; createdAt: string;
}

export interface Query { id: string; kind: "Buyer" | "Seller"; client: string; type: string; location: string; budget: number; date: string; priority: "High" | "Medium" | "Normal"; status: "Pending" | "Accepted" | "Rejected" | "Final"; agent: string; beds: number; notes: string; }
export interface Meeting { id: string; buyer: string; propertyId: string; date: string; time: string; type: "Viewing" | "Consultation" | "Negotiation"; status: "Requested" | "Confirmed" | "Rescheduled" | "Completed" | "Cancelled"; agent: string; }
export interface AppNotification { id: string; title: string; detail: string; category: string; priority: "High" | "Normal"; timestamp: string; read: boolean; }
export interface Review { id: string; name: string; role: "Buyer" | "Seller"; rating: number; text: string; status: "Pending" | "Published" | "Hidden"; featured: boolean; }
export interface HistoryEvent { id: string; timestamp: string; action: string; entity: string; agent: string; description: string; }
export interface Theme { id: string; name: string; primary: string; accent: string; }