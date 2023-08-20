import Header from "@/compoments/header";
import { Button, Heading, Page, PageContent } from "grommet";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Star Wars App",
};

export default async function Home() {
  return (
    <>
      <Page kind="wide" overflow="hidden" className={styles.page}>
        <Header />
        <PageContent
          as="main"
          align="center"
          justify="center"
          className={styles.content}
        >
          <Heading level="1" margin="large" textAlign="center" size="large">
            Discover more about your favorite Star Wars character
          </Heading>
          <Link href="/people">
            <Button primary label="Begin your journey" size="2xl" />
          </Link>
        </PageContent>
      </Page>
      <video
        autoPlay
        loop
        muted
        // @ts-ignore
        playsinline
        controls={false}
        className={styles.video}
      >
        <source src="/hyperspace.mp4" />
      </video>
    </>
  );
}
