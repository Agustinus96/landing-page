import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import PopupWidget from "../components/popupWidget";
import Head from "next/head";
import HeroServices from "../components/services/hero-services";
import Products from "../components/services/product";
import { productOne } from "../components/services/product-data";

const heroService = () => {
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
      <Products data={productOne}/>
    <Footer />
    <PopupWidget />
    </>
  );
}

export default heroService;