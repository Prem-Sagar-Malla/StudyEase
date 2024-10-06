import React from "react";
import AboutUs from "../../components/frontend/AboutUs";
import Different from "../../components/frontend/Different";
import Quote from "../../components/frontend/Quote";
import Service from "../../components/frontend/Service";

const Home = () => {
  return (
    <>
      <AboutUs />
      <Quote />
      <Service />
      <Different />
    </>
  );
};

export default Home;