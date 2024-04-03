import Image from "next/image";
import React from "react";
import cardBack from "../../../public/cardBack.jpg";

type PlayingCardProps = {
  image: string;
  code: string;
  tilt?: boolean;
  index: number;
};
const PlayingCard = ({ image, code, tilt, index }: PlayingCardProps) => {
  //grab the screen width to adjust the image size depending on the screen size
  const screenWidth = window.innerWidth;
  let height = 180;
  let width = 120;
  if (screenWidth < 500) {
    height = 120;
    width = 90;
  }

  //adjust the tilt of the card depending on the index
  const getTilt = (index: number) => {
    return index + "0deg";
  };
  if (image === "card_back") {
    return (
      <Image
        src={cardBack}
        priority
        alt={code}
        width={width}
        height={height}
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
          width={width}
          height={height}
          style={{
            borderRadius: "10px",
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
