import { Box, Heading } from "grommet";

type Props = {
  planet: Planet;
};
export default function PlanetInfo({ planet }: Props) {
  return (
    <Box>
      <Heading level={2}>{planet.name}</Heading>
      <p>{planet.terrain}</p>
      <p>{planet.climate}</p>
      <p>{planet.population}</p>
    </Box>
  );
}
