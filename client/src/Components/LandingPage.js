import React from "react";
import Hero from "./Hero";
import Section from "./Section";
import Testimonials from "./Testimonials";
import CategoryCard from "./Listings/CategoryCard";
const LandingPage = () => {
  return (
    <div>
      <Hero />
      <Section />
      <Testimonials />
      <CategoryCard/>
    </div>
  );
};

export default LandingPage;
