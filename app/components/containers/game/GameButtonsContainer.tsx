import styled from "styled-components";

const GameButtons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  height: 10%;
  padding-bottom: 10px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default GameButtons;
