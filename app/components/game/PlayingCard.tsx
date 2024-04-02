import Image from "next/image";
import React from "react";
import cardBack from "../../../public/cardBack.jpg";
type PlayingCardProps = {
  image: string;
  code: string;
};
const PlayingCard = ({ image, code }: PlayingCardProps) => {
  if (image === "card_back") {
    return <Image src={cardBack} alt={code} width={200} height={280} />;
  }
  return (
    <>{image && <Image src={image} alt={code} width={200} height={280} />}</>
  );
};

export default PlayingCard;
