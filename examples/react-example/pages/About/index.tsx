import React, { memo } from "react";
import { useTranslation } from "react-i18next";

export interface AboutProps {
  //
}

const About = (_props: AboutProps) => {
  const { t } = useTranslation();
  return (
    <div data-testid="about-page">
      <h1>{t("routes.about.title")}</h1>
    </div>
  );
};

export default memo(About);
