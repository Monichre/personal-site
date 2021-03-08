import React from "react";
import { GeistUIThemes, Text, Link } from "@geist-ui/react";
import makeStyles from "./makeStyles";
import EventListItem from "./EventListItem";
import ProjectCard from "./ProjectCard";
import { AppContext } from "./Layout/Layout";
import { useContext } from "react";
import { ContributionCalendar } from "./ContributionCalendar/ContributionCalendar";

export const useStylesContentStyles = makeStyles((ui: GeistUIThemes) => ({
  root: {},
  content: {
    width: ui.layout.pageWidthWithMargin,
    maxWidth: "100%",
    boxSizing: "border-box",
    margin: "0 auto",
    padding: `0 ${ui.layout.pageMargin}`,
    transform: "translateY(-35px)",
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
    marginTop: ui.layout.gap,
    fontSize: 24,
    textAlign: "center",
  },
}));

const Content = () => {
  const classes = useStylesContentStyles();

  const {
    githubData: { contributionCalendar, topRepositories },
  } = useContext(AppContext);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.row}>
          <div className={classes.projects}>
            <Text h2 className={classes.activityTitle}>
              Top Repositories
            </Text>
            {topRepositories?.map((repo) => (
              <ProjectCard project={repo} />
            ))}
          </div>
          <div className={classes.activity}>
            <Text h2 className={classes.activityTitle}>
              Contributions
            </Text>

            <ContributionCalendar contributionCalendar={contributionCalendar} />

            {/* {contributions?.map((contribution) => (
              <EventListItem
                username={contribution.repository.name}
                avatar={contribution.repository.avatarUrl}
                created={contribution.contributions.totalCount}
              >
                sometjing
              </EventListItem>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
