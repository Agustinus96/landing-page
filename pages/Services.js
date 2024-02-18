import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import PopupWidget from "../components/popupWidget";
import Head from "next/head";
import HeroServices from "../components/services/hero-services";
import Products from "../components/services/product";
import { useServicesData } from "../components/services/product-data"
// In your page file
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])), // Ensure 'common' is your default namespace
    },
  };
}



const heroService = () => {
  const data = useServicesData();
  console.log(data);
  return (
    <> 
    <Navbar />
 <Head>
        <title>Our Services</title>
        <meta
          name="description"
          content="Other services we provide at Gloxus"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroServices />
      <Products data={data.productOne}/>
    <Footer />
    <PopupWidget />
    </>
  );
}

export default heroService;