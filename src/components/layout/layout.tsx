import React, { useEffect, useState, createContext } from "react";
import { GeistProvider, CssBaseline } from "@geist-ui/react";
import { JssProvider } from "react-jss";
import { useStaticQuery, graphql } from "gatsby";
import AnimatedCursor from "react-animated-cursor";
import { createGlobalStyle } from "styled-components";

// const GlobalStyles = createGlobalStyle`
// a {
//   text-decoration: none;
//   color: #fff;
//   font-weight: 600;
//   border-bottom: 1px solid rgba(255, 255, 255, 0.7);
//   transition: 0.5s ease;
// }

// a:hover {
//   color: rgba(255, 255, 255, 0.5);
//   border-bottom-color: rgba(255, 255, 255, 0.1);
// }
// `;

// import { CSSDebugger } from "../css-debugger";
import { Particles } from "../Particles/Particles";
import Menu from "../Menu";

export const AppContext = createContext({
  toggleDarkMode: () => {},
  projects: [],
  jobs: [],
});

const Layout: React.FC = ({ children }) => {
  const staticData = useStaticQuery(graphql`
    query SiteDataQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
      allFile {
        nodes {
          childMarkdownRemark {
            frontmatter {
              date
              title
              slug
            }
          }
          name
          relativeDirectory
        }
      }
    }
  `);
  const {
    allFile: { nodes },
  } = staticData;

  const { projects, jobs } = nodes.reduce(
    (acc, node) => {
      const { relativeDirectory } = node;
      if (acc[relativeDirectory]) {
        acc[relativeDirectory].push(node);
      }
      return acc;
    },
    { projects: [], jobs: [] }
  );

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
    <AppContext.Provider value={{ toggleDarkMode, projects, jobs }}>
      <JssProvider id={{ minify: true }}>
        <GeistProvider themeType={themeType}>
          <CssBaseline />
          <Particles />
          <AnimatedCursor
            innerSize={8}
            outerSize={8}
            color="220, 90, 90"
            outerAlpha={0.4}
          />
          <Menu />
          {children}
        </GeistProvider>
      </JssProvider>
    </AppContext.Provider>
  );
};

export { Layout };
