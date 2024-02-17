import Head from "next/head";
import Hero from "../components/hero";
import Navbar from "../components/navbar";
import SectionTitle from "../components/sectionTitle";
import { benefitOne,benefitTwo } from "../components/data";
import Video from "../components/video";
import Benefits from "../components/benefits";
import Footer from "../components/footer";
import Testimonials from "../components/testimonials";
import Cta from "../components/cta";
import Faq from "../components/faq";
import PopupWidget from "../components/popupWidget";
import Link from "next/link";
import PopupChat from "../components/popupChat";

const Home = () => {

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
      <Hero />
      <SectionTitle
        pretitle="Gloxus Benefits"
        title=" Why you should use our platform">
        Gloxus transforms hiring in Japan, offering a personalized, 
        quality experience for both employers and candidates, enhancing efficiency 
        and cultural alignment for more effective, satisfying recruitment outcomes.
      </SectionTitle>
      <Benefits data={benefitOne} />
      <Benefits imgPos="right" data={benefitTwo} />
      <SectionTitle
        pretitle="Watch a video"
        title="See our platform at work">
          Make a video. 
      </SectionTitle>
      <Video />
      <SectionTitle
        pretitle="Future Testimonials"
        title="Releasing a Closed Trial">
        We are looking for partners to participate in our limited MVP release. 
        Your feedback is very important to us to further develop this platform 
        and ensure that our product fits your needs.
      </SectionTitle>
      <Testimonials />
      <SectionTitle pretitle="FAQ" title="Frequently Asked Questions">
        Answer your customers possible questions here, it will increase the
        conversion rate as well as support or chat requests.
      </SectionTitle>
      <Faq />
      <div className="flex w-full items-center justify-center text-center">
          <Link href="/faq" className="px-6 py-2 text-white bg-emerald-600 rounded-md md:ml-5">
              show more
          </Link>
        </div>
      {/* <Cta /> */}
      <Footer />
      <PopupChat />
    </>
  );
}

export default Home;