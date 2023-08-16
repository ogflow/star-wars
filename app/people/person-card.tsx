import { Card, CardBody, Heading, Image } from "grommet";

type Props = {
  person: Person;
};
export default function PersonCard({ person }: Props) {
  return (
    <Card direction="row">
      <Image
        alt={"picture of " + person.name}
        src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=300"
        //src="https://api.lorem.space/image/face?w=200&h=200"
        // TODO: api.lorem.ipsum seems to be down for this moment
      />
      <CardBody pad="medium">
        <Heading level="3">{person.name}</Heading>
      </CardBody>
    </Card>
  );
}
