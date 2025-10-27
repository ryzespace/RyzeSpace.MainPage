// src/app/[locale]/page.tsx
"use client";

import Hero from "./components/Hero";
import Features from "./components/Features";
import Video from "./components/Video";
import AboutSectionOne from "./components/About/AboutSectionOne";
import AboutSectionTwo from "./components/About/AboutSectionTwo";
import PricingBox from "./components/Pricing";
import Contact from "./components/Contact";
import ScrollUp from "./components/Common/ScrollUp";

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Video />
      <AboutSectionOne />
      <AboutSectionTwo />
      <PricingBox />
      <Contact />
    </>
  );
}