import React, { useContext } from "react";
import { Layout } from "../components/Layout";

import Content, { useStylesContentStyles } from "../components/Content";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import { AppContext } from "../components/Layout/Layout";
import ProjectCard from "../components/ProjectCard";

import { GeistUIThemes, Text, Link } from "@geist-ui/react";

export interface WorkHistoryProps {}

const WorkHistory: React.SFC<WorkHistoryProps> = () => {
  const { initiatives, workHistory } = useContext(AppContext);
  console.log("workHistory: ", workHistory);
  console.log("initiatives: ", initiatives);
  const classes = useStylesContentStyles();
  return (
    <Layout>
      <div className={classes.root}>
        <div className={classes.content}>
          <div className={classes.row}>
            <div className={classes.projects}>
              <Text h2 className={classes.activityTitle}>
                Work History
              </Text>
            </div>
            <div className={classes.activity}>
              <Text h2 className={classes.activityTitle}>
                Initiatives
              </Text>

              {/* <EventListItem
                username={contribution.repository.name}
                avatar={contribution.repository.avatarUrl}
                created={contribution.contributions.totalCount}
              >
                sometjing
              </EventListItem> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WorkHistory;
