import { create } from "zustand";

type PeopleStoreProps = {
  query: string;
  filters: string[];
};
type PeopleStoreState = PeopleStoreProps & {
  setQuery: (query: string) => void;
  setFilters: (filters: string[]) => void;
};

const defaultState = {
  query: "",
  filters: [],
};

const usePeopleStore = create<PeopleStoreState>((set) => ({
  ...defaultState,
  setQuery: (query) => set(() => ({ query })),
  setFilters: (filters) => set(() => ({ filters })),
}));

export default usePeopleStore;
