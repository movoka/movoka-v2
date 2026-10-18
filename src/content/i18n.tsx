import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { de } from "./de";
import { en } from "./en";
import { ar } from "./ar";
export type Language = "de" | "en" | "ar";
const dictionaries = { de, en, ar };
const LanguageContext = createContext<{language:Language;setLanguage:(l:Language)=>void;t:typeof de}>({language:"de",setLanguage:()=>{},t:de});
export function LanguageProvider({children}:{children:ReactNode}) {
 const [language,setLanguageState] = useState<Language>("de");
 useEffect(()=>{try{const saved=localStorage.getItem("movoka-language");if(saved==="de"||saved==="en"||saved==="ar")setLanguageState(saved);}catch{}},[]);
 useEffect(()=>{document.documentElement.lang=language;document.documentElement.dir=language==="ar"?"rtl":"ltr";},[language]);
 const setLanguage=(l:Language)=>{setLanguageState(l);try{localStorage.setItem("movoka-language",l);}catch{}};
 return <LanguageContext.Provider value={{language,setLanguage,t:dictionaries[language]}}>{children}</LanguageContext.Provider>;
}
export const useLanguage=()=>useContext(LanguageContext);
