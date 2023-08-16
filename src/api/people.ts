export default async function getPeople(): Promise<ApiListResponse<Person>> {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_PATH + "/people");

  if (!res.ok) throw new Error("failed to fetch data from api/people");

  return res.json();
}

export async function getPerson(id: string): Promise<Person> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_PATH + "/people/" + id
  );

  if (!res.ok) throw new Error("failed to fetch data from api/people/:id");

  return res.json();
}
