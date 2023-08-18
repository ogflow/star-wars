"use client";
import usePeopleStore from "@/store/usePeopleStore";
import { TextInput } from "grommet";
import { Search } from "grommet-icons";

export default function Toolbar() {
  const query = usePeopleStore((store) => store.query);
  const setQuery = usePeopleStore((store) => store.setQuery);

  return (
    <TextInput
      icon={<Search />}
      placeholder="Search"
      reverse
      onChange={(e) => setQuery(e.target.value)}
      value={query}
    />
  );
}
