import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { initialMeetings, initialNotifications, initialProperties, initialQueries, initialReviews, themes } from "@/data/demo";
import type { HistoryEvent, Meeting, Property, PropertyStatus, Query, Review } from "@/types/domain";

interface AppState { properties: Property[]; queries: Query[]; meetings: Meeting[]; notifications: typeof initialNotifications; reviews: Review[]; history: HistoryEvent[]; themeId: string; setTheme:(id:string)=>void; updateProperty:(id:string, patch:Partial<Property>)=>void; addProperty:(p:Property)=>void; removeProperty:(id:string)=>void; updateQuery:(id:string,status:Query["status"])=>void; updateMeeting:(id:string,patch:Partial<Meeting>)=>void; readNotification:(id:string)=>void; readAll:()=>void; updateReview:(id:string,patch:Partial<Review>)=>void; }
const AppContext=createContext<AppState|undefined>(undefined);
const now=()=>new Date().toLocaleString("en-PK",{dateStyle:"medium",timeStyle:"short"});
export function AppProvider({children}:{children:ReactNode}){
 const [properties,setProperties]=useState(initialProperties); const [queries,setQueries]=useState(initialQueries); const [meetings,setMeetings]=useState(initialMeetings); const [notifications,setNotifications]=useState(initialNotifications); const [reviews,setReviews]=useState(initialReviews); const [history,setHistory]=useState<HistoryEvent[]>([]); const [themeId,setThemeId]=useState("navy");
 useEffect(()=>{const saved=localStorage.getItem("meridian-theme"); if(saved) setThemeId(saved)},[]);
 useEffect(()=>{const t=themes.find(x=>x.id===themeId)??themes[0]; if(!t)return; document.documentElement.style.setProperty("--primary",t.primary);document.documentElement.style.setProperty("--accent",t.accent);localStorage.setItem("meridian-theme",themeId)},[themeId]);
 const log=(action:string,entity:string,description:string)=>setHistory(h=>[{id:crypto.randomUUID(),timestamp:now(),action,entity,agent:"Admin User",description},...h]);
 const value=useMemo<AppState>(()=>({properties,queries,meetings,notifications,reviews,history,themeId,setTheme:setThemeId,
 updateProperty:(id,patch)=>{setProperties(x=>x.map(p=>p.id===id?{...p,...patch}:p));log(patch.status??"Property updated",id,"Property record updated.");toast.success(`Property ${patch.status?.toLowerCase()??"updated"} successfully.`)},
 addProperty:p=>{setProperties(x=>[p,...x]);log("Property created",p.id,p.title);toast.success("Property added successfully.")},removeProperty:id=>{setProperties(x=>x.filter(p=>p.id!==id));log("Property archived",id,"Property removed from active records.");toast.success("Property archived.")},
 updateQuery:(id,status)=>{setQueries(x=>x.map(q=>q.id===id?{...q,status}:q));log(`Query ${status.toLowerCase()}`,id,"Query status updated.");toast.success(`Query ${status.toLowerCase()}.`)},
 updateMeeting:(id,patch)=>{setMeetings(x=>x.map(m=>m.id===id?{...m,...patch}:m));log(`Meeting ${patch.status?.toLowerCase()??"updated"}`,id,"Meeting schedule updated.");toast.success("Meeting updated.")},
 readNotification:id=>setNotifications(x=>x.map(n=>n.id===id?{...n,read:true}:n)),readAll:()=>{setNotifications(x=>x.map(n=>({...n,read:true})));toast.success("All notifications marked as read.")},updateReview:(id,patch)=>{setReviews(x=>x.map(r=>r.id===id?{...r,...patch}:r));toast.success("Review updated.")}}),[properties,queries,meetings,notifications,reviews,history,themeId]);
 return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
export function useApp(){const c=useContext(AppContext);if(!c)throw new Error("AppProvider missing");return c}