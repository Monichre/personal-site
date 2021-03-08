import React from "react";
import { Layout } from "../components/Layout";

import Content from "../components/Content";
import Footer from "../components/Footer";
import Heading from "../components/Heading";

export interface HomeProps {}

const Home: React.SFC<HomeProps> = () => {
  return (
    <Layout>
      <Heading />
      <Content />
      <Footer />
    </Layout>
  );
};

export default Home;
