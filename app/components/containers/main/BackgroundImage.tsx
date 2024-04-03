import Image from "next/image";
import React from "react";
import bj_bg from "@/public/bj_bg.jpg";
import styled from "styled-components";

type Props = {};


const BackgroundImage = (props: Props) => {
  return (
    <Image
      style={{
        position: "fixed",
        zIndex: -1,
        width: "100%",
        height: "120vh",
        objectFit: "cover",
        overflow: "hidden"
      }}
      src={bj_bg}
      alt="blackjack background"
    />
  );
};

export default BackgroundImage;
