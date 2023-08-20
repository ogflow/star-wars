"use client";
import getPlanet from "@/api/planets";
import { Box, Button, Heading, Image } from "grommet";
import { useState } from "react";
import useSWR from "swr";
import PlanetInfo from "./planet";

type Props = {
  person: Person;
};
export default function Profile({ person }: Props) {
  const [shouldFetch, setShouldFetch] = useState(false);
  const personId = person.url.split("/")[5];
  const planetId = person.homeworld.split("/")[5];
  const {
    data: planet,
    error,
    isLoading,
    mutate,
  } = useSWR(shouldFetch ? planetId : null, getPlanet);

  const onFetchPlanet = () => {
    setShouldFetch(true);
  };

  return (
    <Box>
      <Image
        alt={"picture of " + person.name}
        src={`https://loremflickr.com/320/240/face,starwars/?random=${person.name}&lock=${personId}`}
      />
      <Heading>{person.name}</Heading>
      <p>Appeared in {person.films.length} films</p>
      <p>Born in {person.birth_year}</p>
      <p>Height {person.height}cm</p>
      <p>Mass {person.mass}kg</p>
      {error && (
        <Box>
          <p>Failed to load planet details</p>
          <Button onClick={() => mutate()}>Retry</Button>
        </Box>
      )}
      {!planet && !error && (
        <Button onClick={onFetchPlanet} busy={isLoading}>
          Learn about their homeworld
        </Button>
      )}
      {planet && <PlanetInfo planet={planet} />}
    </Box>
  );
}
