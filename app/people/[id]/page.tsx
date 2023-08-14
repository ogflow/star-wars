import { getPerson } from "@/api/people";
import { Metadata } from "next";

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
  console.log(person);
  return <main>here we go</main>;
}
