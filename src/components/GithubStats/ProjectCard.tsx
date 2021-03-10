import React from "react";
import { parseISO, formatISO, format, formatRFC3339 } from "date-fns";

import {
  GeistUIThemes,
  Button,
  Text,
  Link,
  Card,
  Dot,
  Tag,
  Avatar,
  Col,
  Container,
  Spacer,
} from "@geist-ui/react";
import { Flex, Box } from "rebass";
import makeStyles from "../makeStyles";
import * as Icons from "react-feather";

interface Props {
  project: any;
}

const useStyles = makeStyles((ui: GeistUIThemes) => ({
  card: {
    padding: "0 !important",
    marginBottom: `calc(${ui.layout.gap}*1.5) !important`,
  },
  avatar: {
    width: "32px !important",
    height: "32px !important",
    marginLeft: "10px !important",
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: ui.layout.gap,
    "& h3": {
      margin: 0,
    },
  },
  created: {
    fontSize: 14,
    color: "rgb(153, 153, 153) !important",
    margin: `0 0 0 ${ui.layout.gapHalf}`,
    textAlign: "right",
  },
  visitButton: {},
  "@media screen and (max-width: 540px)": {
    created: {
      display: "none !important",
    },
    visitButton: {
      display: "none !important",
    },
  },
  dot: {
    display: "flex !important",
    marginTop: ui.layout.gapQuarter,
    "& .icon": {
      backgroundColor: "#50e3c2 !important",
    },
    "& .label": {
      textTransform: "none !important",
      display: "flex",
      flex: 1,
      overflow: "hidden",
    },
    "& .label a": {
      display: "inline-block",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      fontSize: 14,
      lineHeight: "normal",
    },
    "& .link": {
      fontWeight: 500,
    },
  },
  tag: {
    display: "flex !important",
    alignItems: "center",
    textTransform: "capitalize !important",
    fontSize: "12px !important",
    padding: "3px 7px !important",
    borderRadius: "16px !important",
    height: "unset !important",
    marginLeft: 8,
    color: `${ui.palette.foreground} !important`,
  },
  footer: {
    display: "flex !important",
    alignItems: "center !important",
    height: 50,
    width: "100% !important",
  },
  repo: {
    fontSize: 14,
    fontWeight: 500,
    marginLeft: "6px !important",
  },
}));

const ProjectCard = ({ project }: Props) => {
  console.log("project: ", project);
  const classes = useStyles();
  const {
    name,
    pushedAt,
    updatedAt,
    contributions,
    owner: { avatarUrl },
  } = project;
  return (
    <Card shadow className={classes.card}>
      <div className={classes.title}>
        <Text h3>{name} </Text>

        <Avatar className={classes.avatar} size="small" src={avatarUrl} />
      </div>
      <div className={classes.content}>
        {contributions.map(({ occurredAt, commitCount }) => (
          <Dot type="success" className={classes.dot}>
            <Flex justifyContent="space-between" width={"100%"}>
              <Box fontSize={12} lineHeight={"24px"}>
                {commitCount} Commits
              </Box>

              <Box fontSize={12} lineHeight={"24px"}>
                <span className={classes.created}>
                  {format(parseISO(occurredAt), "PP")}
                </span>
              </Box>
            </Flex>
          </Dot>
        ))}
      </div>
      <Card.Footer className={classes.footer}>
        <Flex justifyContent="space-between" width={"100%"}>
          <Text className={classes.repo}>
            <Icons.GitHub size={14} />
            Total: {contributions.length}
          </Text>

          <Tag>
            <span>{updatedAt}</span>
          </Tag>
        </Flex>
      </Card.Footer>
    </Card>
  );
};

export default ProjectCard;
