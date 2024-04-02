import Image from "next/image";
import React from "react";
import cardBack from "../../../public/cardBack.jpg";
import style from "styled-components";
type PlayingCardProps = {
  image: string;
  code: string;
};
const PlayingCard = ({ image, code }: PlayingCardProps) => {
  if (image === "card_back") {
    return (
      <Image
        src={cardBack}
        alt={code}
        width={200}
        height={290}
        style={{
          borderRadius: "10px",
          boxShadow: "2px 2px 3.25px rgba(0, 0, 0, 0.962)",
        }}
      />
    );
  }
  return (
    <>
      {image && (
        <Image
          src={image}
          alt={code}
          width={200}
          height={290}
          style={{
            borderRadius: "13px",
            boxShadow: "2px 4px 5.25px rgba(0, 0, 0, 0.962)",
          }}
        />
      )}
    </>
  );
};

export default PlayingCard;
