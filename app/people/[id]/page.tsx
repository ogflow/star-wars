import getPerson from "@/api/people";
import { Page, PageContent } from "grommet";
import { Metadata } from "next";
import Profile from "./profile";

type Params = {
  id: string;
};
type Props = {
  params: Params;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getPerson(params.id);

  return {
    title: item.name + " — Star Wars App",
  };
}

export default async function PersonPage({ params: { id } }: Props) {
  const person = await getPerson(id);

  return (
    <Page kind="narrow">
      <PageContent>
        <Profile person={person} />
      </PageContent>
    </Page>
  );
}
