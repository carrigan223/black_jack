import Image from "next/image";
import React from "react";
import bj_bg from "@/public/bj_bg.jpg";
import styled from "styled-components";

type Props = {};


const BackgroundImage = (props: Props) => {
  return (
    <Image
      style={{
        position: "absolute",
        zIndex: -1,
        width: "100vh",
        height: "100vw",
        objectFit: "cover",
      }}
      src={bj_bg}
      alt="blackjack background"
    />
  );
};

export default BackgroundImage;
