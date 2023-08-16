export default async function getPlanet(id: string): Promise<Planet> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_PATH + "/planets/" + id
  );

  if (!res.ok) throw new Error("failed to fetch data from api/planets/:id");

  return res.json();
}
