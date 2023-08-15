import PeopleList from "@/components/PeopleList/PeopleList";
import { Heading, Page, PageContent } from "grommet";

export const metadata = {
  title: "List of characters — Star Wars App",
};

export default async function PeoplePage() {
  return (
    <Page kind="wide">
      <PageContent>
        <Heading>List of Star Wars Characters</Heading>
        <PeopleList />
      </PageContent>
    </Page>
  );
}
