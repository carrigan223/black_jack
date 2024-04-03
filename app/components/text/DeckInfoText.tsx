import styled from "styled-components";

const DeckInfoText = styled.span`
  font-size: 24px;
  color: black;
  text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.441);
  text-align: center;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export default DeckInfoText;