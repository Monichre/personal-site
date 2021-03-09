import React from "react";

import { useStaticQuery, graphql } from "gatsby";
import { parseData } from "../github-parser";

type GithubData = {
  pinnedItems: any;
  contributions: any;
  profile: any;
  topRepositories: any;
  organizations: any;
  contributionCalendar: any;
  totalCommitContributions: any;
  totalPullRequestContributions: any;
  totalPullRequestReviewContributions: any;
  totalRepositoriesWithContributedCommits: any;
  totalRepositoriesWithContributedPullRequests: any;
  totalRepositoryContributions: any;
};

export const useGithubData = () => {
  const data = useStaticQuery(graphql`
    query {
      githubData {
        data {
          user {
            avatarUrl
            bio
            contributionsCollection {
              commitContributionsByRepository {
                contributions {
                  edges {
                    node {
                      commitCount
                      occurredAt
                      repository {
                        name
                        owner {
                          avatarUrl
                        }
                      }
                    }
                  }
                }
              }
              contributionCalendar {
                colors
                months {
                  firstDay(fromNow: false)
                  name
                  year
                  totalWeeks
                }
                totalContributions
                weeks {
                  contributionDays {
                    color
                    contributionCount
                    contributionLevel
                    date(fromNow: false)
                    weekday
                  }
                }
              }
              totalCommitContributions
              totalPullRequestContributions
              totalPullRequestReviewContributions
              totalRepositoriesWithContributedCommits
              totalRepositoriesWithContributedPullRequests
              totalRepositoryContributions
            }
            pinnedItems {
              edges {
                node {
                  name
                  owner {
                    login
                    avatarUrl
                  }
                  url
                }
              }
            }
            login
            topRepositories {
              edges {
                node {
                  name
                  owner {
                    avatarUrl
                  }
                  pushedAt(fromNow: true)
                  updatedAt(fromNow: true)
                }
              }
            }
            organizations {
              edges {
                node {
                  avatarUrl
                  name
                }
              }
            }
            status {
              message
            }
          }
        }
      }
    }
  `);
  const githubData: GithubData = parseData(data);
  return { githubData };
};
