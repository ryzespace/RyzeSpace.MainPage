// src/app/[locale]/contact/page.tsx
"use client";

import Breadcrumb from "../components/Common/Breadcrumb";
import Contact from "../components/Contact";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("menu");

  return (
    <>
      <Breadcrumb
        pageName={t("contact")}
        description=""
      />
      <Contact />
    </>
  );
}