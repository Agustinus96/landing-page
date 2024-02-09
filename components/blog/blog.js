import React from "react";
import Head from "next/head";
import Navbar from "../navbar";
import Footer from "../footer";
import SectionTitle from "../sectionTitle";
import PopupWidget from "../popupWidget";

export default function Blogs() {
  return (
    <>
      <Head>
        <title>Nextly - Free Nextjs & TailwindCSS Landing Page Template</title>
        <meta
          name="description"
          content="Nextly is a free landing page template built with next.js & Tailwind CSS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <SectionTitle
        pretitle="Gloxus Benefits"
        title=" Why you should use our platform"
      >
        Gloxus transforms hiring in Japan, offering a personalized, quality
        experience for both employers and candidates, enhancing efficiency and
        cultural alignment for more effective, satisfying recruitment outcomes.
      </SectionTitle>

      <Footer />
      <PopupWidget />
    </>
  );
}
