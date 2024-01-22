import React from "react";
import Features from "../components/features/features";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import PopupWidget from "../components/popupWidget";
import SectionTitle from "../components/sectionTitle";
import { featureOne, featureTwo } from "../components/features/data";

const feature = () => {
  return (
    <> 
    <Navbar />
    <SectionTitle
        title="Our Core Features">
          We believe in the importance of both streamlined system and highly engaging possitive hiring experience. 
      </SectionTitle>
    <Features data={featureOne} />
    <Features imgPos="right" shadow="shadow-[rgba(0,0,15,0.5)_10px_5px_4px_0px]"  data={featureTwo} />
    <Footer />
    <PopupWidget />
    </>
  );
}

export default feature;