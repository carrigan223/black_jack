import styled from "styled-components";
import theme from "@/app/config/theme";
import { Rye } from "next/font/google";

const rye = Rye({ subsets: ["latin"], weight: ["400"] });

const StyledButton = styled.button<{ $currentTheme?: string }>`
  background: linear-gradient(
    240deg,
    #0a000099 0%,
    rgba(0, 0, 0, 0.27) 40%,
    #080808be 100%
  );
  color: white;
  font-size: 20px;
  height: 50px;
  width: 100px;
  border-radius: 15px;
  box-shadow: 2px 2px 3.25px rgba(47, 47, 47, 0.684);
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.$currentTheme === "light"
        ? theme.light_theme_colors.accent
        : theme.dark_theme_colors.accent};
  }
`;

const GeneralUseButton = (props: {
  children: React.ReactNode;
  onClick: () => void;
  $currentTheme?: string;
}) => {
  return (
    <StyledButton
      className={rye.className}
      onClick={props.onClick}
      $currentTheme={props.$currentTheme}
    >
      {props.children}
    </StyledButton>
  );
};

export default GeneralUseButton;
