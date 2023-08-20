"use client";
import getPerson from "@/api/people";
import { getPersonSpecification } from "@/utils/species";
import { Card, CardBody, Heading, Image, Layer, Spinner, Tag } from "grommet";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Profile from "./[id]/profile";
import styles from "./person-card.module.css";

type Props = {
  person: Person;
};
export default function PersonCard({ person }: Props) {
  const [modalPerson, setModalPerson] = useState<Person | boolean>(false);
  const personId = person.url.split("/")[5];
  const specification = getPersonSpecification(person);

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
          <Image
            alt={"picture of " + person.name}
            src={`https://loremflickr.com/320/240/face,starwars/?random=${person.name}&lock=${personId}`}
            className={styles.image}
          />
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
            <Spinner size="medium" />
          ) : (
            <Profile person={modalPerson} />
          )}
        </Layer>
      )}
    </>
  );
}
