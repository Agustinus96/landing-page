import React, { Component } from 'react'
import Navbar from '../../../components/navbar'
import Footer from '../../../components/footer'
import SectionTitle from '../../../components/sectionTitle'
import PopupWidget from '../../../components/popupWidget'

const Pricing = () => {
    return (
        <> 
        <Navbar />
        <SectionTitle
        title="Error 404">
          the page you are lookg cannot be found 
      </SectionTitle>
        <Footer />
        <PopupWidget />
        </>
      );
    }

export default Pricing