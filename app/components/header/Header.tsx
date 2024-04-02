import React from "react";
import { Rye } from "next/font/google";
import cards_icons from "@/public/cards_icons.png";
import Image from "next/image";

type Props = {};

const rye = Rye({ subsets: ["latin"], weight: "400" });

const Header = (props: Props) => {
  return (
    <div
      className={rye.className}
      style={{
        height: "7.8%",
        display: "flex",
        paddingLeft: "1%",
        // justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(240deg, rgba(0, 0, 0, 0.592) 40%, #080808 100%)",
        borderBottom: "2px solid white",
        textShadow: "2px 3px 1px black",
      }}
    >
      <Image
        src={cards_icons}
        alt="cards icon"
        width={40}
        height={40}
        style={{
          rotate: "-40deg",
        }}
      />
      <span
        style={{
          color: "white",
          paddingRight: "10px",
          fontSize: 34,
          marginLeft: '-20px',
          zIndex: 3,
          borderBottom: "2px solid white",

        }}
      >
        Black Jack
      </span>
    </div>
  );
};

export default Header;
