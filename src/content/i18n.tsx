import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { de } from "./de";
import { en } from "./en";
import { ar } from "./ar";
import type { Content } from "./de";
export type Language = "de" | "en" | "ar";
const dictionaries: Record<Language, Content> = { de, en, ar };
const LanguageContext = createContext<{language: Language; setLanguage: (language: Language) => void; t: Content}>({language:"de",setLanguage:()=>{},t:de});
export function LanguageProvider({children}:{children:ReactNode}) {
  const [language,setLanguageState] = useState<Language>("de");
  useEffect(()=>{ try { const saved=localStorage.getItem("movoka-language"); if(saved==="de"||saved==="en"||saved==="ar") setLanguageState(saved); } catch {} },[]);
  useEffect(()=>{ document.documentElement.lang=language; document.documentElement.dir=language==="ar"?"rtl":"ltr"; },[language]);
  const setLanguage=(value:Language)=>{setLanguageState(value);try{localStorage.setItem("movoka-language",value);}catch{}};
  return <LanguageContext.Provider value={{language,setLanguage,t:dictionaries[language]}}>{children}</LanguageContext.Provider>;
}
export function useLanguage(){return useContext(LanguageContext);}
