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
  const planetId = person.homeworld.split("/")[5];
  const {
    data: planet,
    error,
    isLoading,
    mutate,
  } = useSWR(shouldFetch ? planetId : null, getPlanet, {
    shouldRetryOnError: false,
  });

  const onFetchPlanet = () => {
    setShouldFetch(true);
  };

  return (
    <Box>
      <Image
        alt={"picture of " + person.name}
        src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=300"
        //src="https://api.lorem.space/image/face?w=200&h=200"
        // TODO: api.lorem.ipsum seems to be down for this moment
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
