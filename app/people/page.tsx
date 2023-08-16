import { Heading, Page, PageContent } from "grommet";
import PeopleList from "./people-list";

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
