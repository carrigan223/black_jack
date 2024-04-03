import { useEffect, useState } from "react";
import trefoil from "ldrs/trefoil";
import styled from "styled-components";
import { Rye } from "next/font/google";
import style from "styled-components";

const rye = Rye({ subsets: ["latin"], weight: ["400"] });
const TrefoilContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  border-radius: 1000px;
  background: linear-gradient(145deg, #0e0d0da4 20%, #000000, #0e0d0dc8 80%);
`;

export default function Trefoil() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    async function getLoader() {
      const { trefoil } = await import("ldrs");
      trefoil.register();
    }
    getLoader();
    setTimeout(() => {
      setDone(true);
    }, 1000);
  }, []);
  return (
    <>
      {done && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "50px",
            borderRadius: "1000px",

            background:
              "linear-gradient(145deg, #0e0d0da4 20%, #000000, #0e0d0dc8 80%)",
          }}
        >
          <span
            className={rye.className}
            style={{
              zIndex: 1000,
              position: "fixed",
            }}
          >
            Loading ...
          </span>
          <div
            style={{
              zIndex: 100,
            }}
          >
            <l-trefoil color="red" size={200} stroke={10} speed={4}></l-trefoil>
          </div>
        </div>
      )}
    </>
  );
}
