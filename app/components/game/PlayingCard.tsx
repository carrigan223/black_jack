import Image from "next/image";
import React from "react";
import cardBack from "../../../public/cardBack.jpg";
import style from "styled-components";
type PlayingCardProps = {
  image: string;
  code: string;
  tilt?: boolean;
  index: number;
};
const PlayingCard = ({ image, code, tilt, index }: PlayingCardProps) => {
  const getTilt = (index: number) => {
    return index + "0deg";
  };
  if (image === "card_back") {
    return (
      <Image
        src={cardBack}
        priority
        alt={code}
        width={150}
        height={210}
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
          priority
          alt={code}
          width={150}
          height={210}
          style={{
            borderRadius: "13px",
            boxShadow: "2px 4px 5.25px rgba(0, 0, 0, 0.962)",
            marginLeft: tilt ? "-104px" : "0px",
            rotate: tilt ? getTilt(index) : "0deg",
          }}
        />
      )}
    </>
  );
};

export default PlayingCard;
