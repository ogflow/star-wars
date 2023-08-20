"use client";
import { useGetPeople } from "@/api/people";
import usePeopleStore from "@/store/usePeopleStore";
import { getPersonSpecification } from "@/utils/species";
import { Box, Button, Grid, Spinner, Text } from "grommet";
import useSWRInfinite from "swr/infinite";
import { useDebounce } from "usehooks-ts";
import styles from "./people-list.module.css";
import PersonCard from "./person-card";

export default function PeopleList() {
  const query = usePeopleStore((store) => store.query);
  const debouncedQuery = useDebounce(query, 300);
  const [getKey, fetcher] = useGetPeople(debouncedQuery);
  const activeFilters = usePeopleStore((store) => store.filters);
  const hasActiveFilters = activeFilters.length > 0;

  const { data, error, isLoading, size, setSize, mutate } = useSWRInfinite(
    getKey,
    fetcher,
    { revalidateFirstPage: false }
  );

  if (isLoading) return <Spinner size="medium" alignSelf="center" />;

  const people: Person[] = data
    ? data?.reduce((acc, obj) => [...acc, ...obj?.results], [])
    : [];

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const hasMore = people?.length < data?.[0]?.count;

  const renderedPeople = people
    ?.map((person) => {
      const specification = getPersonSpecification(person);

      if (hasActiveFilters && !activeFilters.includes(specification)) {
        return null;
      }

      return (
        <PersonCard
          key={person.url}
          person={person}
          specification={specification}
        />
      );
    })
    .filter(Boolean);

  return (
    <Box gap="medium">
      {(isEmpty || !renderedPeople.length) &&
        (hasActiveFilters || query ? (
          <Text textAlign="center" margin="large">
            Filters applied, nothing found.
          </Text>
        ) : (
          <Text textAlign="center" margin="large">
            Server returned no results. Try again later!
          </Text>
        ))}
      <Grid gap="medium" className={styles.grid}>
        {renderedPeople}
      </Grid>
      {error && (
        <Box direction="column" align="center" gap="medium">
          <p>Failed to load</p>
          <Button onClick={() => mutate()} color="brand">
            Retry
          </Button>
        </Box>
      )}
      {hasMore && !error && (
        <Button
          primary
          onClick={() => setSize(size + 1)}
          busy={isLoadingMore}
          alignSelf="center"
        >
          Load more
        </Button>
      )}
    </Box>
  );
}
