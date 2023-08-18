"use client";
import getPerson from "@/api/people";
import { Card, CardBody, Heading, Image, Layer, Spinner } from "grommet";
import Link from "next/link";
import { useState } from "react";
import Profile from "./[id]/profile";

type Props = {
  person: Person;
};
export default function PersonCard({ person }: Props) {
  const [modalPerson, setModalPerson] = useState<Person | boolean>(false);
  const personId = person.url.split("/")[5];

  const handleModalOpen = async (e: MouseEvent, personId: string) => {
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
        onClick={(e) => handleModalOpen(e, personId)}
      >
        <Card direction="row">
          <Image
            alt={"picture of " + person.name}
            src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=300"
            //src="https://api.lorem.space/image/face?w=200&h=200"
            // TODO: api.lorem.ipsum seems to be down for this moment
          />
          <CardBody pad="medium">
            <Heading level="3">{person.name}</Heading>
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
