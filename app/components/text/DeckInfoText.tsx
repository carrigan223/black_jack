import styled from "styled-components";

const DeckInfoText = styled.span<{ $color?: string, $margin_bottom?: string }>`
  font-size: 20px;
  color: ${(props) => props.$color || "black"};
  text-shadow: 2px 2px 13px rgba(82, 82, 82, 0.473);
  text-align: center;
  margin-bottom: ${(props) => props.$margin_bottom || "0px"};


  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export default DeckInfoText;