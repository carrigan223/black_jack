import Image from "next/image";
import React from "react";
type PlayingCardProps = {
  image: string;
  code: string;
};
const PlayingCard = ({ image, code }: PlayingCardProps) => {
  return (
    <>
      {image && <Image src={image} alt={code} width={200} height={280} />}
    </>
  );
};

export default PlayingCard;
