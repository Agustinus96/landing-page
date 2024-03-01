import React from "react";
import Features from "../components/features/featuresComp";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import PopupWidget from "../components/popupWidget";
import SectionTitle from "../components/sectionTitle";
import { useFeaturesData } from "../components/features/data";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";
import Head from "next/head";

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
    <Head>
        <title>Features</title>
        <meta
          name="description"
          content="Other services we provide at Gloxus"
        />
        <link rel="icon" href="/favicon.ico" />
        </Head>
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