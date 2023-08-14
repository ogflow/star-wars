"use client";
import { Grid } from "grommet";
import PersonCard from "../PersonCard/PersonCard";

type Props = {
  people: Person[];
};
export default function PeopleList({ people }: Props) {
  return (
    <Grid columns={{ count: "fit", size: "480px" }} gap="medium">
      {people.map((person) => (
        <PersonCard key={person.url} person={person} />
      ))}
    </Grid>
  );
}
