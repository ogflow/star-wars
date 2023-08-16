"use client";
import { getPerson } from "@/api/people";
import { Box, Button, Grid, Layer, Spinner } from "grommet";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import Profile from "./[id]/profile";
import PersonCard from "./person-card";

const getKey: SWRInfiniteKeyLoader = (pageIndex, prevPageData) => {
  if (prevPageData && !prevPageData.next) return null;
  return `https://swapi.dev/api/people/?page=${pageIndex + 1}`;
};
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PeopleList() {
  const [modalPerson, setModalPerson] = useState<Person | boolean>(false);
  const { data, error, isLoading, size, setSize, mutate } = useSWRInfinite(
    getKey,
    fetcher,
    { revalidateFirstPage: false, shouldRetryOnError: false }
  );

  if (isLoading) return <Spinner size="medium" />;

  const people: Person[] = data
    ? data?.reduce((acc, obj) => [...acc, ...obj?.results], [])
    : [];

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const hasMore = people?.length < data?.[0]?.count;

  const handleModalOpen = async (e: MouseEvent, personId: string) => {
    e.preventDefault();
    setModalPerson(true);
    const res = await getPerson(personId);

    setModalPerson(res);
    window.history.pushState(null, "", "/people/" + personId);
  };

  const handleModalClose = () => {
    setModalPerson(false);
    window.history.back();
  };

  return (
    <>
      <Grid columns={{ count: "fit", size: "480px" }} gap="medium">
        {isEmpty && <p>No people live here!</p>}
        {people?.map((person) => {
          const personId = person.url.split("/")[5];
          return (
            <Link
              key={person.url}
              href={`/people/${personId}`}
              onClick={(e) => handleModalOpen(e, personId)}
            >
              <PersonCard person={person} />
            </Link>
          );
        })}
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
      {modalPerson && (
        <Layer onEsc={handleModalClose} onClickOutside={handleModalClose} modal>
          {modalPerson === true ? (
            <Spinner size="medium" />
          ) : (
            <Profile person={modalPerson} />
          )}
        </Layer>
      )}
    </>
  );
}
