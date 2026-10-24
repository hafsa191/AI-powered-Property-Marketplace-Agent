// PUBLIC property data. Never add seller contact details or exact addresses here.
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import hero from "@/assets/hero.jpg";

export type Purpose = "Buy" | "Rent";
export type PropertyType = "House" | "Apartment" | "Villa" | "Penthouse" | "Commercial" | "Plot";
export type Furnishing = "Furnished" | "Semi-furnished" | "Unfurnished";

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  purpose: Purpose;
  price: number; // PKR
  area: string;
  city: string;
  size: string;
  sizeSqft: number;
  beds: number;
  baths: number;
  furnishing: Furnishing;
  amenities: string[];
  image: string;
  gallery: string[];
  verified: boolean;
  featured?: boolean;
  description: string;
}

export const AREAS = [
  "DHA Phase 6, Karachi",
  "Clifton Block 5, Karachi",
  "Bahria Town, Karachi",
  "Gulberg III, Lahore",
  "DHA Phase 8, Lahore",
  "F-7, Islamabad",
  "E-11, Islamabad",
  "Bahria Enclave, Islamabad",
];
export const TYPES: PropertyType[] = ["House", "Apartment", "Villa", "Penthouse", "Commercial", "Plot"];
export const AMENITIES = ["Pool", "Gym", "Parking", "Security", "Garden", "Lift", "Backup Power", "Sea View", "Servant Quarter", "Smart Home"];

const g = (...imgs: string[]) => imgs;

export const PROPERTIES: Property[] = [
  { id: "AE-1024", title: "Cliffside Glass Villa", type: "Villa", purpose: "Buy", price: 185000000, area: "DHA Phase 8", city: "Karachi", size: "2 Kanal", sizeSqft: 9000, beds: 6, baths: 7, furnishing: "Furnished", amenities: ["Pool", "Sea View", "Smart Home", "Security"], image: hero, gallery: g(hero, p1, p6), verified: true, featured: true, description: "A statement residence with an infinity pool, double-height glazing and uninterrupted sunset views. Designed for entertaining, with seamless indoor–outdoor living." },
  { id: "AE-1031", title: "Marble Atrium Residence", type: "House", purpose: "Buy", price: 92000000, area: "Gulberg III", city: "Lahore", size: "1 Kanal", sizeSqft: 4500, beds: 5, baths: 6, furnishing: "Semi-furnished", amenities: ["Garden", "Parking", "Backup Power", "Servant Quarter"], image: p1, gallery: g(p1, p6, p3), verified: true, featured: true, description: "Light-filled family home with a dramatic marble atrium, designer kitchen and a landscaped garden in one of Lahore's most sought-after blocks." },
  { id: "AE-1045", title: "Skyline Tower Apartment", type: "Apartment", purpose: "Rent", price: 350000, area: "Clifton Block 5", city: "Karachi", size: "2,100 sq ft", sizeSqft: 2100, beds: 3, baths: 3, furnishing: "Furnished", amenities: ["Gym", "Lift", "Security", "Parking"], image: p2, gallery: g(p2, p6, p1), verified: true, featured: true, description: "High-floor apartment with panoramic balconies, concierge services and a residents' gym. Walking distance to the city's best dining." },
  { id: "AE-1052", title: "Timber & Stone Family Home", type: "House", purpose: "Buy", price: 64500000, area: "E-11", city: "Islamabad", size: "12 Marla", sizeSqft: 3200, beds: 4, baths: 4, furnishing: "Unfurnished", amenities: ["Garden", "Parking", "Security"], image: p3, gallery: g(p3, p1, p6), verified: true, featured: true, description: "A warm contemporary home with timber accents, a manicured lawn and a quiet street setting close to schools and parks." },
  { id: "AE-1060", title: "Twilight Penthouse", type: "Penthouse", purpose: "Buy", price: 128000000, area: "Clifton Block 5", city: "Karachi", size: "4,800 sq ft", sizeSqft: 4800, beds: 4, baths: 5, furnishing: "Furnished", amenities: ["Sea View", "Lift", "Smart Home", "Gym"], image: p4, gallery: g(p4, p1, p6), verified: true, featured: true, description: "Crowning penthouse with a wraparound terrace, private lift lobby and sweeping city-and-sea views from every room." },
  { id: "AE-1068", title: "Corporate Office Floor", type: "Commercial", purpose: "Rent", price: 1200000, area: "Blue Area", city: "Islamabad", size: "8,500 sq ft", sizeSqft: 8500, beds: 0, baths: 4, furnishing: "Furnished", amenities: ["Lift", "Parking", "Backup Power", "Security"], image: p5, gallery: g(p5, p2), verified: false, featured: true, description: "Grade-A open-plan office floor with glass meeting suites, 24/7 power backup and dedicated parking bays." },
  { id: "AE-1073", title: "Garden-View Suite", type: "Apartment", purpose: "Rent", price: 220000, area: "F-7", city: "Islamabad", size: "1,650 sq ft", sizeSqft: 1650, beds: 2, baths: 2, furnishing: "Furnished", amenities: ["Garden", "Security", "Lift"], image: p6, gallery: g(p6, p1), verified: true, description: "Serene apartment overlooking mature gardens, finished in soft natural tones with a generous primary suite." },
  { id: "AE-1081", title: "Bahria Courtyard House", type: "House", purpose: "Buy", price: 48000000, area: "Bahria Town", city: "Karachi", size: "500 sq yd", sizeSqft: 4500, beds: 5, baths: 5, furnishing: "Unfurnished", amenities: ["Parking", "Security", "Backup Power", "Garden"], image: p3, gallery: g(p3, p6), verified: true, description: "Spacious courtyard home in a gated community with parks, mosques and commercial hubs nearby." },
  { id: "AE-1090", title: "Lakeside Modern Villa", type: "Villa", purpose: "Rent", price: 900000, area: "Bahria Enclave", city: "Islamabad", size: "1 Kanal", sizeSqft: 5200, beds: 5, baths: 6, furnishing: "Furnished", amenities: ["Pool", "Garden", "Smart Home", "Security"], image: p1, gallery: g(p1, hero), verified: true, description: "Fully furnished villa with a private pool, home automation and views of the Margalla foothills." },
];

export const formatPKR = (n: number, purpose?: Purpose) => {
  let s: string;
  if (n >= 10000000) s = `PKR ${(n / 10000000).toFixed(n % 10000000 === 0 ? 0 : 2)} Cr`;
  else if (n >= 100000) s = `PKR ${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)} Lac`;
  else s = `PKR ${n.toLocaleString()}`;
  return purpose === "Rent" ? `${s}/mo` : s;
};

export const REVIEWS = [
  { name: "Ayesha Raza", role: "Buyer", rating: 5, text: "I sent my requirements on WhatsApp at night and had three verified options by morning. The viewing was perfectly coordinated — no back-and-forth." },
  { name: "Omar Siddiqui", role: "Seller", rating: 5, text: "They verified my documents, protected my contact details and only brought serious buyers. Sold above asking within five weeks." },
  { name: "Hina & Bilal Khan", role: "Buyer", rating: 5, text: "The AI call understood exactly what we needed — school nearby, garden, 4 beds. The matches were spot on." },
  { name: "Farhan Malik", role: "Seller", rating: 4, text: "Professional, transparent and fast. The team kept me updated at every step until the transfer was finalized." },
  { name: "Sana Javed", role: "Buyer", rating: 5, text: "Rented a furnished apartment in Clifton in under a week. The whole process felt premium and secure." },
];

export const STATS = [
  { label: "Properties Listed", value: 4820, suffix: "+" },
  { label: "Properties Sold", value: 1360, suffix: "" },
  { label: "Properties Rented", value: 2140, suffix: "" },
  { label: "Clients Served", value: 9800, suffix: "+" },
  { label: "Successful Matches", value: 96, suffix: "%" },
];
