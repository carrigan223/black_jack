import styled from "styled-components";
import theme from "@/app/config/theme";


const GeneralUseButton = styled.button<{ $currentTheme?: string }>`
    background-color: ${props => props.$currentTheme === 'light' ? theme.light_theme_colors.backgroundColor : theme.dark_theme_colors.backgroundColor};
    color: ${props => props.$currentTheme === 'light' ? theme.light_theme_colors.color : theme.dark_theme_colors.color};
    height: 40px;
    width: 100px;
    border: 2px solid red;
    border-radius: 5px;
    box-shadow: 2px 2px 3.25px rgba(0, 0, 0, 0.962);
    cursor: pointer;
    &:hover {
        background-color: ${props => props.$currentTheme === 'light' ? theme.light_theme_colors.accent : theme.dark_theme_colors.accent};
    }
`;

export default GeneralUseButton;