import type { Property } from "@/types/domain";
export const matchWeights = { budget: 25, location: 20, type: 15, size: 15, beds: 10, baths: 5, amenities: 10 };
export interface Requirement { budget: number; location: string; type: string; size: number; beds: number; baths: number; amenities: string[]; }
export function scoreProperty(p: Property, r: Requirement) {
  const budget = Math.max(0, 1 - Math.abs(p.price-r.budget)/Math.max(r.budget,1));
  const location = p.area.toLowerCase().includes(r.location.toLowerCase()) || p.city.toLowerCase().includes(r.location.toLowerCase()) ? 1 : .35;
  const type = p.type === r.type ? 1 : .25;
  const size = Math.max(0, 1-Math.abs(p.size-r.size)/Math.max(r.size,1));
  const beds = p.beds >= r.beds ? 1 : p.beds/Math.max(r.beds,1);
  const baths = p.baths >= r.baths ? 1 : p.baths/Math.max(r.baths,1);
  const amenities = r.amenities.length ? r.amenities.filter(a=>p.amenities.includes(a)).length/r.amenities.length : 1;
  const breakdown = { budget, location, type, size, beds, baths, amenities };
  const overall = Object.entries(matchWeights).reduce((n,[k,w])=>n+breakdown[k as keyof typeof breakdown]*w,0);
  return { overall: Math.round(overall), breakdown };
}