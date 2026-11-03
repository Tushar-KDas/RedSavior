"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Locale, translations, Translations } from "./translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("bn");

  useEffect(() => {
    const saved = localStorage.getItem("redsavior_locale") as Locale | null;
    if (saved && (saved === "bn" || saved === "en")) {
      setLocaleState(saved);
      document.documentElement.lang = saved;
    } else {
      document.documentElement.lang = "bn";
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("redsavior_locale", newLocale);
    document.documentElement.lang = newLocale;
  };

  const toggleLanguage = () => {
    const next = locale === "bn" ? "en" : "bn";
    setLocale(next);
  };

  const t = translations[locale];

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
