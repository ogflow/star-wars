"use client";
import getPerson from "@/api/people";
import { Card, CardBody, Heading, Layer, Spinner, Tag } from "grommet";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Profile from "./[id]/profile";
import styles from "./person-card.module.css";

type Props = {
  person: Person;
  specification: string;
};
export default function PersonCard({ person, specification }: Props) {
  const [modalPerson, setModalPerson] = useState<Person | boolean>(false);
  const personId = person.url.split("/")[5];

  const abortControllerRef = useRef<AbortController | null>(null);

  const handleModalOpen = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    personId: string
  ) => {
    e.preventDefault();
    setModalPerson(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const res = await getPerson(personId, controller);

    setModalPerson(res);
    window.history.pushState(null, "", "/people/" + personId);
  };

  const handleModalClose = () => {
    if (modalPerson === true) {
      abortControllerRef?.current?.abort();
      return setModalPerson(false);
    }

    setModalPerson(false);
    window.history.back();
  };

  useEffect(() => {
    const handleBackButton = (e: PopStateEvent) => {
      if (!modalPerson) return;
      setModalPerson(false);
      e.preventDefault();
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [setModalPerson, modalPerson]);

  return (
    <>
      <Link
        href={`/people/${personId}`}
        onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
          handleModalOpen(e, personId)
        }
        className={styles.container}
      >
        <Card
          className={styles.root}
          style={
            {
              "--classification-color": `var(--extra-${specification}-primary)`,
              "--classification-color-contrast": `var(--extra-${specification}-contrast)`,
            } as React.CSSProperties
          }
        >
          <div className={styles.image}>
            <Image
              alt={"picture of " + person.name}
              src={`https://loremflickr.com/320/240/face,starwars/?random=${person.name}&lock=${personId}`}
              width={320}
              height={240}
            />
          </div>
          <CardBody pad="medium" gap="small">
            <Heading level="3">{person.name}</Heading>
            <Tag
              value={specification}
              alignSelf="start"
              // TODO: despite of typescript className prop works well here, should be fixed in Grommet
              // @ts-ignore
              className={styles.tag}
            />
          </CardBody>
        </Card>
      </Link>
      {modalPerson && (
        <Layer
          modal
          onEsc={handleModalClose}
          onClickOutside={handleModalClose}
          className={styles.modal}
        >
          {modalPerson === true ? (
            <Spinner size="medium" margin="large" />
          ) : (
            <Profile person={modalPerson} />
          )}
        </Layer>
      )}
    </>
  );
}
