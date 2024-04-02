import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};
const CardsInPlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
`;

const CardsInPlayContainer = (props: Props) => {
  return <CardsInPlay>{props.children}</CardsInPlay>;
};

export default CardsInPlayContainer;
