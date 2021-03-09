import React from "react";
import Layout from "../components/Layout/Layout";
import GithubStats from "../components/GithubStats/GithubStats";
import ProfileBanner from "../components/ProfileBanner";

export interface HomeProps {}

const Home: React.SFC<HomeProps> = () => {
  return (
    <Layout>
      <ProfileBanner />
      <GithubStats />
    </Layout>
  );
};

export default Home;
