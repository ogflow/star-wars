"use client";
import getPlanet from "@/api/planets";
import { getPersonSpecification } from "@/utils/species";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  NameValueList,
  NameValuePair,
  Tag,
  Text,
} from "grommet";
import { useState } from "react";
import useSWR from "swr";
import PlanetInfo from "./planet";
import styles from "./profile.module.css";

type Props = {
  person: Person;
};
export default function Profile({ person }: Props) {
  const [shouldFetch, setShouldFetch] = useState(false);
  const personId = person.url.split("/")[5];
  const planetId = person.homeworld.split("/")[5];
  const specification = getPersonSpecification(person);

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
    <Box
      gap="medium"
      className={styles.root}
      style={
        {
          "--classification-color": `var(--extra-${specification}-primary)`,
          "--classification-color-contrast": `var(--extra-${specification}-contrast)`,
        } as React.CSSProperties
      }
    >
      <Box className={styles.image}>
        <Image
          alt={"picture of " + person.name}
          src={`https://loremflickr.com/1024/920/face,starwars/?random=${person.name}&lock=${personId}`}
        />
      </Box>
      <Card>
        <CardBody gap="small" pad="medium">
          <Box direction="row" justify="between">
            <Heading>{person.name}</Heading>
            <Tag
              value={specification}
              alignSelf="center"
              // TODO: despite of typescript className prop works well here, should be fixed in Grommet
              // @ts-ignore
              className={styles.tag}
            />
          </Box>
          <NameValueList>
            <NameValuePair name="Born in">
              <Text color="text-strong">{person.birth_year}</Text>
            </NameValuePair>
            <NameValuePair name="Height">
              <Text color="text-strong">{person.height} cm</Text>
            </NameValuePair>
            <NameValuePair name="Mass">
              <Text color="text-strong">{person.mass} kg</Text>
            </NameValuePair>
            <NameValuePair name="Appeared in">
              <Text color="text-strong">{person.films.length} films</Text>
            </NameValuePair>
          </NameValueList>
        </CardBody>
        {!planet && !error && (
          <CardFooter pad="medium">
            <Button primary onClick={onFetchPlanet} busy={isLoading}>
              Learn about their homeworld
            </Button>
          </CardFooter>
        )}
        {error && (
          <CardFooter pad="medium" direction="column">
            <p>Failed to load planet details</p>
            <Button onClick={() => mutate()} busy={isLoading} color="brand">
              Retry
            </Button>
          </CardFooter>
        )}
        {planet && <PlanetInfo planet={planet} />}
      </Card>
    </Box>
  );
}
