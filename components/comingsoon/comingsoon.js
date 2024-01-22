import React from "react";
import Container from "../container";
import Head from "next/head";
import Navbar from "../navbar";
import Footer from "../footer";
import heroImg from "../../public/img/hero.png";
import Image from "next/image";

const Soon = () => {
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
        <div className="flex items-center justify-center w-full lg:w-1/2 mx-auto">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
              Hiring consulting
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
              Hiring the right candiadte for a job is very difficult, especially in the Japanese market culture. What even more difficult is keeping great talents from leaving the company early. We are here to assist you with through the negotiation of employment contracts, visa application and many more.
            </p>

            <div className="flex items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row m-auto">
              <a
                href="mailto:gx.globalnexus@gmail.com"
                target="_blank"
                rel="noopener"
                className="px-8 py-4 text-lg font-medium text-center text-white bg-emerald-600 rounded-md ">
                Contact us
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