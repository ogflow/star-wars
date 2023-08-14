export default async function getPeople(): Promise<Person[]> {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_PATH + "/people");

  if (!res.ok) throw new Error("failed to fetch data");

  return res.json();
}

export async function getPerson(id: string): Promise<Person> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_PATH + "/people/" + id
  );

  if (!res.ok) throw new Error("failed to fetch data");

  return res.json();
}
