import Header from "@/compoments/header";
import { Button, Heading, Page, PageContent } from "grommet";

export const metadata = {
  title: "Star Wars App",
};

export default async function Home() {
  return (
    <Page kind="wide">
      <Header />
      <PageContent as="main" align="center">
        <Heading level="1" margin="xlarge" textAlign="center" size="large">
          Discover more about your favorite Star Wars character
        </Heading>
        <Button primary label="Begin your journey" size="xlarge" />
      </PageContent>
    </Page>
  );
}
