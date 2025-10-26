"use client";

import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Video from "@/components/Video";
import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import ScrollUp from "@/components/Common/ScrollUp";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <Video />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Pricing />
      <Contact />

      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          {t("description")}
        </p>
      </div>
    </>
  );
}