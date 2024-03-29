import styled from "styled-components";
import theme from "@/app/config/theme";

 const StyledMain = styled.main<{ $currentTheme?: string }>`
  /* background-color: ${theme.light_theme_colors.backgroundColor}; */
    background-color: ${props => props.$currentTheme === 'light' ? theme.light_theme_colors.backgroundColor : theme.dark_theme_colors.backgroundColor};
    color: ${props => props.$currentTheme === 'light' ? theme.light_theme_colors.color : theme.dark_theme_colors.color};
    height:99.6%;
    border: 2px solid red;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
`;

export default StyledMain;
