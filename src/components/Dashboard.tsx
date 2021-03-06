import React from "react";
import Menu from "./Menu";
import Heading from "./Heading";
import Content from "./Content";
import Footer from "./Footer";

const Dashboard = ({ toggleDarkMode }: any) => {
  return (
    <>
      <Menu toggleDarkMode={toggleDarkMode} />
      <Heading />
      <Content />
      <Footer />
    </>
  );
};

export default Dashboard;
