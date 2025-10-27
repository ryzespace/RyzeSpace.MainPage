// src/app/[locale]/about/page.tsx
"use client";

import AboutSectionOne from "../components/About/AboutSectionOne";
import AboutSectionTwo from "../components/About/AboutSectionTwo";
import Breadcrumb from "../components/Common/Breadcrumb";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("menu");

  return (
    <>
      <Breadcrumb
        pageName={t("about")}
        description=""
      />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
}