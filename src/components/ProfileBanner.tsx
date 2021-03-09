import React, { useContext } from "react";
import {
  GeistUIThemes,
  Avatar,
  Button,
  Text,
  Link,
  Badge,
  Spacer,
} from "@geist-ui/react";
import makeStyles from "./makeStyles";
import * as Icons from "react-feather";
import { AppContext } from "./Layout/Layout";

const useStyles = makeStyles((ui: GeistUIThemes) => ({
  root: {
    borderBottom: `solid 1px ${ui.palette.accents_2}`,
    borderTop: `solid 1px ${ui.palette.accents_2}`,
  },
  "avatar-group": {
    // display: "inline-flex",
    marginLeft: "16px",
  },
  inner: {
    display: "flex",
    flexDirection: "row",
    width: ui.layout.pageWidthWithMargin,
    maxWidth: "100%",
    padding: `calc(${ui.layout.gap} * 2) ${ui.layout.pageMargin} calc(${ui.layout.gap} )`,
    boxSizing: "border-box",
    margin: "0 auto",
  },
  avatar: {
    width: "100px !important",
    height: "100px !important",
    marginRight: "30px !important",
  },
  name: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },
  title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center",
  },
  username: {
    // lineHeight: "24px!important",
  },
  createProjectButton: {},
  [`@media screen and (max-width: ${ui.layout.pageWidthWithMargin})`]: {
    createProjectButton: {
      display: "none !important",
    },
    avatar: {
      width: "80px !important",
      height: "80px !important",
      marginRight: "20px !important",
    },
    username: {
      fontSize: 24,
    },
  },
  integrationsTitle: {
    textTransform: "uppercase",
    color: `${ui.palette.accents_5} !important`,
    fontWeight: 500,
    fontSize: 12,
    margin: 0,
  },
  integrationsUsername: {
    margin: "0 0 0 4px",
    fontWeight: 0,
  },
}));

const ProfileBanner = () => {
  const classes = useStyles();

  const {
    githubData: {
      profile: { avatar, bio, status },
      organizations,
      contributionCalendar: { totalContributions },

      totalPullRequestContributions,
      totalPullRequestReviewContributions,
      totalRepositoriesWithContributedCommits,
      totalRepositoriesWithContributedPullRequests,
      totalRepositoryContributions,
    },
  }: any = useContext(AppContext);
  return (
    <div className={classes.root}>
      {/*
          <Fieldset.Footer.Actions>
            {organizations.map((organization) => (
              <User src={organization.avatarUrl} name={organization.name} />
            ))}
          </Fieldset.Footer.Actions>
        </Fieldset.Footer>
      </Fieldset> */}

      <div className={classes.inner}>
        <Avatar alt="Your Avatar" className={classes.avatar} src={avatar} />
        <div className={classes.name}>
          <div className={classes.title}>
            <Text h2 className={classes.username}>
              monichre
            </Text>
            <Avatar.Group className={classes["avatar-group"]}>
              {organizations.map((organization: any) => (
                <Avatar src={organization.avatarUrl} stacked />
              ))}
            </Avatar.Group>
          </div>
          <div>
            <Link
              href="https://github.com/monichre"
              target="_blank"
              rel="noopener"
              pure
              underline
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Icons.GitHub size={16} aria-label="Github" />
                <Text className={classes.integrationsUsername}>{status}</Text>
              </div>
            </Link>
            <Text className={classes.integrationsTitle}>{bio}</Text>
            <Spacer />
            <Badge.Anchor>
              <Badge style={{ backgroundColor: "#50e3c1" }}>
                {totalContributions}
              </Badge>
              <Button size="small">Contributions</Button>
            </Badge.Anchor>
            <Spacer inline x={1.5} />
            <Badge.Anchor>
              <Badge style={{ backgroundColor: "#50e3c1" }}>
                {totalPullRequestContributions}
              </Badge>
              <Button size="small">PRs</Button>
            </Badge.Anchor>
            <Spacer inline x={1.5} />
            <Badge.Anchor>
              <Badge style={{ backgroundColor: "#50e3c1" }}>
                {totalPullRequestReviewContributions}
              </Badge>

              <Button size="small">Code Reviews</Button>
            </Badge.Anchor>
            <Spacer inline x={1.5} />

            <Badge.Anchor>
              <Badge style={{ backgroundColor: "#50e3c1" }}>
                {totalRepositoryContributions}
              </Badge>
              <Button size="small">Repos Contributed To</Button>
            </Badge.Anchor>
            <Spacer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;
