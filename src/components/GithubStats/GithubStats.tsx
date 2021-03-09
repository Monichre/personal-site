import React from "react";
import { GeistUIThemes, Text } from "@geist-ui/react";
import makeStyles from "../makeStyles";

import ProjectCard from "./ProjectCard";
import { AppContext } from "../Layout/Layout";
import { useContext } from "react";
import { ContributionCalendar } from "./ContributionCalendar/ContributionCalendar";
import { Box, Flex } from "rebass";

export const useStylesContentStyles = makeStyles((ui: GeistUIThemes) => ({
  root: {
    position: "relative",
    zIndex: 10,
  },
  content: {
    width: ui.layout.pageWidthWithMargin,
    maxWidth: "100%",
    height: `calc(100vh - 355px)`,
    // boxSizing: "border-box",
    overflow: "scroll",
    margin: "0 auto",
    padding: `${ui.layout.pageMargin} ${ui.layout.pageMargin} 0`,
    // transform: "translateY(-35px)",
  },
  titleSection: {
    width: "100%",
    padding: `0 240px`,
    margin: "auto 0",
    borderBottom: "solid 1px #333",
  },
  flex: {
    width: "100%",
    maxWidth: "782pt",
    margin: "auto!important",
  },
  row: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    minWidth: 1,
    maxWidth: "100%",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  projects: {
    width: "40%",
  },
  activity: {
    flex: 1,
    width: "60%",
  },
  [`@media screen and (min-width: ${ui.layout.pageWidthWithMargin})`]: {
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    projects: {
      // width: 540,
      maxWidth: "100%",
      marginRight: 80,
    },
    activityTitle: {
      marginTop: "0 !important",
      marginBottom: 30,
      fontSize: "14px !important",
      textAlign: "start !important",
    },
    viewAll: {
      marginBottom: "0 !important",
      textAlign: "start !important",
    },
  },
  viewAll: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: ui.layout.gap,
    textAlign: "center",
  },
  activityTitle: {
    fontWeight: 700,
    margin: 0,
    fontSize: 24,
    textAlign: "center",
    width: "100%",
    padding: `8pt`,
  },
}));

const GithubStats = () => {
  const classes = useStylesContentStyles();

  const {
    githubData: { contributionCalendar, topRepositories },
  }: any = useContext(AppContext);

  return (
    <div className={classes.root}>
      <Box className={classes.titleSection}>
        <Flex justifyContent="space-between" className={classes.flex}>
          <Text h2 className={classes.activityTitle}>
            Top Repositories
          </Text>
          <Text h2 className={classes.activityTitle}>
            Contributions
          </Text>
        </Flex>
      </Box>
      <div className={classes.content}>
        <div className={classes.row}>
          <div className={classes.projects}>
            {topRepositories?.map((repo) => (
              <ProjectCard project={repo} />
            ))}
          </div>
          <div className={classes.activity}>
            <ContributionCalendar contributionCalendar={contributionCalendar} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GithubStats;
