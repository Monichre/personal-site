import React, { useEffect, useState, createContext } from "react";
import { GeistProvider, CssBaseline } from "@geist-ui/react";
import { JssProvider } from "react-jss";
import { useStaticQuery, graphql } from "gatsby";
import AnimatedCursor from "react-animated-cursor";
import styled from "styled-components";

// import { CSSDebugger } from "../css-debugger";
import { Particles } from "../Particles/Particles";
import Menu from "../Menu";

import { useGithubData } from "./github-data.hooks";

const AppWrap: any = styled.div`
  height: 100vh;
  max-height: 1200px;
  overflow: scroll;
`;

export const AppContext = createContext({
  toggleDarkMode: () => {},
  githubData: {},
});

const Layout: React.FC = ({ children }) => {
  const { githubData } = useGithubData();
  console.log("githubData: ", githubData);

  const [themeType, setThemeType] = useState<"light" | "dark">("dark");
  const toggleDarkMode = (): void =>
    setThemeType(themeType === "dark" ? "light" : "dark");

  useEffect(() => {
    if (window.matchMedia) {
      const colorSchemeQuery = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );
      colorSchemeQuery.onchange = (e) =>
        setThemeType(e.matches ? "dark" : "light");
    }
  }, []);

  return (
    <AppContext.Provider value={{ toggleDarkMode, githubData }}>
      <JssProvider id={{ minify: true }}>
        <GeistProvider themeType={themeType}>
          <CssBaseline />
          <AppWrap>
            <Particles />
            <AnimatedCursor
              innerSize={8}
              outerSize={8}
              color="220, 90, 90"
              outerAlpha={0.4}
            />
            <Menu />
            {children}
          </AppWrap>
        </GeistProvider>
      </JssProvider>
    </AppContext.Provider>
  );
};

export { Layout };
