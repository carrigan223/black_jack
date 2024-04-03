import styled from "styled-components";
import theme from "@/app/config/theme";

const BoardInfoRow = styled.div`
  display: flex;
  align-items: space-around;
  border-bottom: 1px solid ${theme.light_theme_colors.accent};
  background: linear-gradient(
    240deg,
    #0a000099 0%,
    rgba(0, 0, 0, 0.5) 60%,
    #080808be 100%
  );
  height: max-content;
  box-shadow: 5px 10px 20px 0px rgba(0, 0, 0, 0.739);
  margin-bottom: 10px;
`;

export default BoardInfoRow;
