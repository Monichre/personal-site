import React, { useEffect, useState, createContext } from "react";
import { GeistProvider, CssBaseline } from "@geist-ui/react";
import { JssProvider } from "react-jss";
import { useStaticQuery, graphql } from "gatsby";

import { CSSDebugger } from "../css-debugger";

export const ThemeContext = createContext({
  toggleDarkMode: () => {},
});

const Layout: React.FC = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  const { title, description } = data.site.siteMetadata;

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
    <ThemeContext.Provider value={{ toggleDarkMode }}>
      <JssProvider id={{ minify: true }}>
        <GeistProvider themeType={themeType}>
          <CssBaseline />
          {children}
        </GeistProvider>
      </JssProvider>
    </ThemeContext.Provider>
  );
};

export { Layout };
