import styled from "styled-components";
import theme from "@/app/config/theme";
import { Rye } from "next/font/google";

const rye = Rye({ subsets: ["latin"], weight: ["400"] });

const StyledButton = styled.button<{ $currentTheme?: string }>`
  background: linear-gradient(
    240deg,
    #a29f9f37 0%,
    rgba(16, 15, 15, 0.739) 40%,
    #c0151570 100%
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
  &:disabled {
    background: linear-gradient(
      240deg,
      #a29f9f37 0%,
      rgba(56, 52, 52, 0.477) 40%,
      #aeaeaeab 100%
    );
    cursor: not-allowed;
    color: #8c8c8c;
  }
`;

const GeneralUseButton = (props: {
  children: React.ReactNode;
  onClick: () => void;
  $currentTheme?: string;
  disabled?: boolean;
}) => {
  return (
    <StyledButton
      className={rye.className}
      onClick={props.onClick}
      $currentTheme={props?.$currentTheme}
      disabled={props?.disabled}
    >
      {props.children}
    </StyledButton>
  );
};

export default GeneralUseButton;
