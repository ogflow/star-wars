import getPeople from "@/api/getPeople";
import styles from "./page.module.css";

export const metadata = {
  title: "Star Wars characters library",
};

export default async function Home() {
  const people = await getPeople();
  console.log(people);
  return <main className={styles.main}>here we go</main>;
}
