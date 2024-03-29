'use client';
import Image from "next/image";
import  StyledMain  from "./components/containers/StyledMain";
import GeneralUseButton from "./components/buttons/GeneralUseButton";
import theme from '@/app/config/theme';
import { useState } from "react";
import useTheme from './hooks/useTheme';
import useLightOrDark from "./hooks/useTheme";


export default function Home() {
  const theme = useLightOrDark();
  return (
    <StyledMain $currentTheme={theme.currentTheme}>
      <div>Hello</div>
      <GeneralUseButton $currentTheme={theme.currentTheme} onClick={() => theme.toggleTheme()}>Click Me</GeneralUseButton>
    </StyledMain>
  );
}
