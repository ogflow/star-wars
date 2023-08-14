import getPeople from "@/api/people";
import PeopleList from "@/components/PeopleList/PeopleList";
import { Heading, Page, PageContent } from "grommet";

export const metadata = {
  title: "List of characters — Star Wars App",
};

export default async function PeoplePage() {
  const people = await getPeople();
  return (
    <Page kind="wide">
      <PageContent>
        <Heading>List of Star Wars Characters</Heading>
        <PeopleList people={people.results} />
      </PageContent>
    </Page>
  );
}
