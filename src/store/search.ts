"use client";

import { create } from "zustand";

interface SearchState {
  /** Live fuzzy-search query, shared between the header field and the database view. */
  query: string;
  setQuery: (query: string) => void;
}

export const useSearchStore = create<SearchState>()((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
}));
