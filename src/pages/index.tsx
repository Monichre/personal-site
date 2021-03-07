import React from "react";
import { Layout } from "../components/Layout";

import Content from "../components/Content";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import { parseData } from "../components/github-parser";

export const query = graphql`
  {
    githubData {
      data {
        user {
          avatarUrl
          bio
          repositories {
            edges {
              node {
                name
                description
                url
                stargazers {
                  totalCount
                }
                readme {
                  text
                }
              }
            }
          }
          repositoriesContributedTo {
            edges {
              node {
                url
                name
                owner {
                  login
                }
              }
            }
          }
          pinnedItems {
            edges {
              node {
                url
                name
                owner {
                  login
                }
              }
            }
          }
        }
      }
    }
  }
`;

export interface HomeProps {
  data: any;
}

const Home: React.SFC<HomeProps> = ({ data }) => {
  const { pinnedItems, contributions, bio, repos, avatarUrl } = parseData(data);

  return (
    <Layout>
      <Heading bio={bio} profile={avatarUrl} />
      <Content
        pinnedItems={pinnedItems}
        contributions={contributions}
        repos={repos}
      />
      <Footer />
    </Layout>
  );
};

export default Home;
