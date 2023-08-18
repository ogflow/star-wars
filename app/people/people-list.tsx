"use client";
import { useGetPeople } from "@/api/people";
import usePeopleStore from "@/store/usePeopleStore";
import { Box, Button, Grid, Spinner } from "grommet";
import useSWRInfinite from "swr/infinite";
import { useDebounce } from "usehooks-ts";
import PersonCard from "./person-card";

export default function PeopleList() {
  const query = usePeopleStore((store) => store.query);
  const debouncedQuery = useDebounce(query, 300);
  const [getKey, fetcher] = useGetPeople(debouncedQuery);

  const { data, error, isLoading, size, setSize, mutate } = useSWRInfinite(
    getKey,
    fetcher,
    { revalidateFirstPage: false }
  );

  if (isLoading) return <Spinner size="medium" />;

  const people: Person[] = data
    ? data?.reduce((acc, obj) => [...acc, ...obj?.results], [])
    : [];

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const hasMore = people?.length < data?.[0]?.count;

  return (
    <Grid columns={{ count: "fit", size: "480px" }} gap="medium">
      {isEmpty && <p>No people live here!</p>}
      {people?.map((person) => (
        <PersonCard key={person.url} person={person} />
      ))}
      {error && (
        <Box>
          <p>Failed to load</p>
          <Button onClick={() => mutate()}>Retry</Button>
        </Box>
      )}
      {hasMore && !error && (
        <Button onClick={() => setSize(size + 1)} busy={isLoadingMore}>
          Load more
        </Button>
      )}
    </Grid>
  );
}
