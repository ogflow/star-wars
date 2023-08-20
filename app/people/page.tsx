import { Heading, Page, PageContent } from "grommet";
import PeopleList from "./people-list";
import Toolbar from "./toolbar";

export const metadata = {
  title: "List of characters — Star Wars App",
};

export default async function PeoplePage() {
  return (
    <Page kind="wide">
      <PageContent gap="medium">
        <Heading>List of Star Wars Characters</Heading>
        <Toolbar />
        <PeopleList />
      </PageContent>
    </Page>
  );
}
