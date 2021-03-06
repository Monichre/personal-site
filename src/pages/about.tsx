import React from "react";

import { RouteComponentProps } from "@reach/router";
import { Layout } from "../components/layout";

const AboutPage: React.FC<RouteComponentProps> = ({ location = {} }) => {
  const path = location.pathname;
  return (
    <Layout>
      <h3>
        Hi, you are on the <code>{path}</code> page!
      </h3>
    </Layout>
  );
};

export default AboutPage;
