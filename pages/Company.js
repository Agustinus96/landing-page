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

const Pricing = () => {
    return (
        <> 
        <Navbar />
        <Company />
        <Teams data={founder}/>
        <Footer />
        <PopupWidget />
        </>
      );
    }

export default Pricing