import styled from "styled-components";

const DeckInfoText = styled.span<{ $color?: string, $margin_bottom?: string }>`
  font-size: 24px;
  color: ${(props) => props.$color || "black"};
  text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.441);
  text-align: center;
  margin-bottom: ${(props) => props.$margin_bottom || "0px"};
  border: 1px solid black;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export default DeckInfoText;