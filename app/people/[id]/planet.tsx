import { CardBody, Heading, NameValueList, NameValuePair, Text } from "grommet";

type Props = {
  planet: Planet;
};
export default function PlanetInfo({ planet }: Props) {
  return (
    <CardBody gap="small" pad="medium">
      <Heading level={2}>Homeland: {planet.name}</Heading>

      <NameValueList>
        <NameValuePair name="Terrain">
          <Text color="text-strong">{planet.terrain}</Text>
        </NameValuePair>
        <NameValuePair name="Climate">
          <Text color="text-strong">{planet.climate}</Text>
        </NameValuePair>
        <NameValuePair name="Population">
          <Text color="text-strong">
            {!isNaN(parseInt(planet.population))
              ? parseInt(planet.population).toLocaleString()
              : "unknown"}
          </Text>
        </NameValuePair>
      </NameValueList>
    </CardBody>
  );
}
