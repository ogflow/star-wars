import { SWRInfiniteKeyLoader } from "swr/infinite";

export default async function getPerson(id: string): Promise<Person> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_PATH + "/people/" + id
  );

  if (!res.ok) throw new Error("failed to fetch data from api/people/:id");

  return res.json();
}

export const useGetPeople = (
  query: string
): [getKey: SWRInfiniteKeyLoader, fetcher: (url: string) => Promise<any>] => {
  const getKey: SWRInfiniteKeyLoader = (pageIndex, prevPageData) => {
    if (prevPageData && !prevPageData.next) return null;
    return `${process.env.NEXT_PUBLIC_API_BASE_PATH}/people/?page=${
      pageIndex + 1
    }&search=${query}`;
  };
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  return [getKey, fetcher];
};
