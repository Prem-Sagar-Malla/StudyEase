import React from 'react';
import Header from "../components/frontend/Header";
import Banner from "../components/frontend/Banner";
import Footer from "../components/frontend/Footer";
import { Outlet } from "react-router-dom";

const FrontendLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Banner />
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default FrontendLayout;
