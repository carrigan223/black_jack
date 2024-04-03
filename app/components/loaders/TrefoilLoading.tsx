import React from "react";
import Trefoil from "./trefoil";

type Props = {};

const TrefoilLoading = (props: Props) => {
  return (
    <>
      <div
        style={{
          background:
            "linear-gradient( 240deg,#faf8f852 0%,rgba(0, 0, 0, 0.106) 40%,#080808be 100%)",
          zIndex: 1,
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          display: "flex",
          fontSize: 24,
          color: "white",
        }}
      >
        <Trefoil />
      </div>
    </>
  );
};

export default TrefoilLoading;
