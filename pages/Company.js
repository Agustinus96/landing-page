import React, { Component } from 'react'
import Soon from '../components/comingsoon/comingsoon'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Container from '../components/container'
import SectionTitle from '../components/sectionTitle'
import Tables from '../components/pricing/table'
import PopupWidget from '../components/popupWidget'
import Company from '../components/company/company'
import { founder } from '../components/company/teams-data'
import Teams from '../components/company/teams'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
[]
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])), // Ensure 'common' is your default namespace
    },
  };
}

const Pricing = () => {
    return (
        <> 
        <Head>
        <title>Company Profile</title>
        <meta
          name="description"
          content="Other services we provide at Gloxus"
        />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <Company />
        {/* <Teams data={founder}/> */}
        <Footer />
        <PopupWidget />
        </>
      );
    }

export default Pricing