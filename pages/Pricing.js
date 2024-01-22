import React, { Component } from 'react'
import Soon from '../components/comingsoon/comingsoon'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Container from '../components/container'
import SectionTitle from '../components/sectionTitle'
import Tables from '../components/pricing/table'
import PopupWidget from '../components/popupWidget'
import { priceOne, priceTwo } from "../components/pricing/pricing-data";

const Pricing = () => {
    return (
        <>
        <Soon />
        </>
        // <> 
        // <Navbar />
        // <SectionTitle
        //     title="Our pricing plans">
        //       Pricing draft.... 
        //   </SectionTitle>
        //   <Container>
        //   </Container>
        //   {/* <Container className="flex lg:flex-row flex-col mx-auto">
        // <Tables data={priceOne} />
        // <Tables data={priceTwo} />
        // </Container> */}
        // <Footer />
        // <PopupWidget />
        // </>
      );
    }

export default Pricing