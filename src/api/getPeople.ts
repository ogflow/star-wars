export default async function getPeople(): Promise<Person[]> {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_PATH + "/people");

  if (!res.ok) throw new Error("failed to fetch data");

  return res.json();
}
