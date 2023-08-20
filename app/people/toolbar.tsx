"use client";
import usePeopleStore from "@/store/usePeopleStore";
import { Box, SelectMultiple, TextInput } from "grommet";
import { Search } from "grommet-icons";

export default function Toolbar() {
  // here we fetch entire state, meaning that component will re-render evry time any value changes in the store. however, here it's considered to be fine
  const state = usePeopleStore();

  return (
    <Box direction="row" gap="medium">
      <TextInput
        icon={<Search />}
        placeholder="Search"
        reverse
        onChange={(e) => state.setQuery(e.target.value)}
        value={state.query}
      />
      <SelectMultiple
        options={[
          "mammal",
          "artifical",
          "sentient",
          "gastropod",
          "reptile",
          "amphibian",
          "insectoid",
          "unknown",
        ]}
        placeholder="Filter results by species"
        value={state.filters}
        onChange={({ value }) => {
          state.setFilters(value);
        }}
      />
    </Box>
  );
}
