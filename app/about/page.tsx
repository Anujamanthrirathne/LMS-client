"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import About from "./About"
import Footer from "../components/Footer";



const Page = () => {
  const [open, setOpen] = useState(false);
  const [activeItem] = useState(2);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      <Heading
        title="About us - ELearning"
        description="ELearning is learning management system for helping students."
        keywords="programming,react,mern"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />
      <About />
      <Footer />
    </div>
  );
};

export default Page;
