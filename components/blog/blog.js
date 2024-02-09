import React from "react";
import Head from "next/head";
import Navbar from "../navbar";
import Footer from "../footer";
import SectionTitle from "../sectionTitle";
import PopupWidget from "../popupWidget";
import { Container } from "postcss";

export default function Blogs() {
  return (
    <>
      <Head>
        <title>Blogs - in progress</title>
        <meta
          name="description"
          content="Nextly is a free landing page template built with next.js & Tailwind CSS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="h-[50vh] p-[10vh]">
      <SectionTitle
        pretitle="Building"
        title=" We are preparing useful information"
      >
        We would like to share insights of hiring in Japan and perhaps future events.
      </SectionTitle>
      </div>
      <Footer />
      <PopupWidget />
    </>
  );
}
