"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface TutorFilterContextValue {
  filterSubject: string | null;
  setFilterSubject: (subject: string | null) => void;
}

const TutorFilterContext = createContext<TutorFilterContextValue | null>(null);

export function TutorFilterProvider({ children }: { children: ReactNode }) {
  const [filterSubject, setFilterSubject] = useState<string | null>(null);
  return (
    <TutorFilterContext.Provider value={{ filterSubject, setFilterSubject }}>
      {children}
    </TutorFilterContext.Provider>
  );
}

export function useTutorFilter() {
  const ctx = useContext(TutorFilterContext);
  if (!ctx) {
    throw new Error("useTutorFilter must be used within TutorFilterProvider");
  }
  return ctx;
}
