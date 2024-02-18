import React from "react";
import Features from "../components/features/features";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import PopupWidget from "../components/popupWidget";
import SectionTitle from "../components/sectionTitle";
import { useFeaturesData } from "../components/features/data";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])), // Ensure 'common' is your default namespace
    },
  };
}

const feature = () => {
  const { t } = useTranslation('common');
  const data = useFeaturesData();
  return (
    <> 
    <Navbar />
    <SectionTitle
        title={t("featureTitle")}>
          {t("featureHeading")}
      </SectionTitle>
    <Features data={data.featureOne} />
    <Features imgPos="right" shadow="shadow-[rgba(0,0,15,0.5)_10px_5px_4px_0px]"  data={data.featureTwo} />
    <Footer />
    <PopupWidget />
    </>
  );
}

export default feature;