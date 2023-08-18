import { create } from "zustand";

type PeopleStore = {
  query: string;
  setQuery: (query: string) => void;
};
const usePeopleStore = create<PeopleStore>((set) => ({
  query: "",
  setQuery: (query) => set((state) => ({ query })),
}));

export default usePeopleStore;
