import styled from "styled-components";
import theme from "@/app/config/theme";

const StyledMain = styled.main<{ $currentTheme?: string }>`
  /* background-color: ${theme.light_theme_colors.backgroundColor}; */
  background: linear-gradient(
    240deg,
    #faf8f852 0%,
    rgba(0, 0, 0, 0.106) 40%,
    #080808be 100%
  );
  color: ${(props) =>
    props.$currentTheme === "light"
      ? theme.light_theme_colors.color
      : theme.dark_theme_colors.color};
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  flex: 1;
  z-index: 1;
`;

export default StyledMain;
