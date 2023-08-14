import styles from "./page.module.css";

export const metadata = {
  title: "Star Wars App",
};

export default async function Home() {
  return <main className={styles.main}>start page</main>;
}
