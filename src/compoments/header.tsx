import { Header as GrommetHeader, Text } from "grommet";
import Image from "next/image";
import Link from "next/link";

type Props = {};
const Header: React.FC<Props> = ({}) => {
  return (
    <GrommetHeader
      pad="medium"
      width={{ max: "1536px", width: "100%" }}
      alignSelf="center"
    >
      <Link href="/">
        <Image
          src="/star-wars.svg"
          alt="star wars logotype"
          width="210"
          height="100"
        />
      </Link>
      <Link href="/people">
        <Text weight="bold" size="large">
          Characters
        </Text>
      </Link>
    </GrommetHeader>
  );
};

export default Header;
