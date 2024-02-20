import React from "react";
import Container from "../container";
import Head from "next/head";
import Navbar from "../navbar";
import Footer from "../footer";
import heroImg from "../../public/img/hero.png";
import Image from "next/image";

import { useTranslation } from "next-i18next";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
const Soon = () => {

  const { t } = useTranslation('common');

    return (
        <>
        <Head>
        <title>Coming soon!</title>
        <meta
          name="placeholder"
          content="Coming soon page for parts of the services"
        />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar/>
        <Container className="flex flex-wrap my-[7%] mx-auto">
        <div className="flex items-center justify-center w-full lg:w-[70%] mx-auto">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug text-center tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
              {t("pleaseContact")}
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300 text-center">
              {t("callAction")}
            </p>

            <div className="flex flex-col items-center space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center my-auto mx-auto">
              <a
                href="mailto:gx.globalnexus@gmail.com"
                target="_blank"
                rel="noopener"
                className="px-8 py-4 text-lg font-medium text-center text-white bg-emerald-600 rounded-md ">
                {t("contactUs")}
              </a>
            </div>
          </div>
        </div>
      </Container>
        <Footer/>
        </>
    )
}

export default Soon;