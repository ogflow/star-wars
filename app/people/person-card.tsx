"use client";
import getPerson from "@/api/people";
import { getPersonSpecification } from "@/utils/species";
import classNames from "classnames";
import { Card, CardBody, Heading, Image, Layer, Spinner, Tag } from "grommet";
import Link from "next/link";
import { useState } from "react";
import Profile from "./[id]/profile";
import styles from "./person-card.module.css";

type Props = {
  person: Person;
};
export default function PersonCard({ person }: Props) {
  const [modalPerson, setModalPerson] = useState<Person | boolean>(false);
  const personId = person.url.split("/")[5];
  const specification = getPersonSpecification(person);

  const handleModalOpen = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    personId: string
  ) => {
    e.preventDefault();
    setModalPerson(true);
    const res = await getPerson(personId);

    setModalPerson(res);
    window.history.pushState(null, "", "/people/" + personId);
  };

  const handleModalClose = () => {
    setModalPerson(false);
    window.history.back();
  };

  return (
    <>
      <Link
        href={`/people/${personId}`}
        onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
          handleModalOpen(e, personId)
        }
      >
        <Card
          direction="row"
          className={classNames(
            styles["root"],
            styles[`class-${specification}`]
          )}
        >
          <Image
            alt={"picture of " + person.name}
            src={`https://loremflickr.com/320/240/face,starwars/?random=${person.name}&lock=${personId}`}
            className={styles[""]}
          />
          <CardBody pad="medium" gap="small">
            <Heading level="3">{person.name}</Heading>
            <Tag
              value={specification}
              alignSelf="start"
              // TODO: despite of typescript style works well here, should be fixed in Grommet
              style={{
                background: "var(--classification-color, grey)",
                color: "black",
              }}
            />
          </CardBody>
        </Card>
      </Link>
      {modalPerson && (
        <Layer onEsc={handleModalClose} onClickOutside={handleModalClose} modal>
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
