import React, {
  useEffect,
  useState,
  createContext,
  useCallback,
  useRef,
} from "react";
import { GeistProvider, CssBaseline } from "@geist-ui/react";
import { JssProvider } from "react-jss";
// import AnimatedCursor from "react-animated-cursor";
import styled from "styled-components";
import { Particles } from "../Particles/Particles";
import Menu from "../Menu";

import { useGithubData } from "./github-data.hooks";

const AppWrap: any = styled.div`
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
`;

export const AppContext = createContext({
  githubData: {},
});

const Layout: React.FC = ({ children }) => {
  const { githubData } = useGithubData();

  return (
    <AppContext.Provider value={{ githubData }}>
      <JssProvider id={{ minify: true }}>
        <GeistProvider themeType={"dark"}>
          <CssBaseline />
          <AppWrap>
            <Particles />

            {/* <AnimatedCursor
              innerSize={8}
              outerSize={8}
              color="80, 227, 193"
              outerAlpha={0.4}
            /> */}

            <Menu />
            {children}
          </AppWrap>
        </GeistProvider>
      </JssProvider>
    </AppContext.Provider>
  );
};

export default Layout;
