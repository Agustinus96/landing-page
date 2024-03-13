import Head from "next/head";
import Hero from "../components/hero";
import Navbar from "../components/navbar";
import SectionTitle from "../components/sectionTitle";
import Video from "../components/video";
import Benefits from "../components/benefits";
import Footer from "../components/footer";
import Testimonials from "../components/testimonials";
import Cta from "../components/cta";
import Faq from "../components/faq";
import PopupWidget from "../components/popupWidget";
import Link from "next/link";
import PopupChat from "../components/popupChat";
import { useBenefitsData } from "../components/data";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])), // Ensure 'common' is your default namespace
    },
  };
}


const Home = () => {
  const data = useBenefitsData();
  // const router = useRouter();

  const { t } = useTranslation("common");

  const gloxusBenefits = t("GloxusBenefits", { returnObjects: true });
  const video = t("Video", { returnObjects: true });
  const testimonial = t("Testimonials", { returnObjects: true });
  const questions = t("FAQ", { returnObjects: true });

  return (
    <>
      <Head>
        <title>{t("HomeTitle")}</title>
        <meta
          name="description"
          content="Gloxus is a new generation hiring platform service."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Hero />
      <SectionTitle
        pretitle={gloxusBenefits.Pretitle}
        title={gloxusBenefits.SubTitle}
      >
        {gloxusBenefits.Content}
      </SectionTitle>
      <Benefits data={data.benefitOne} />
      <Benefits imgPos="right" data={data.benefitTwo} />
      {/* <SectionTitle pretitle={video.Pretitle} title={video.SubTitle}>
        {video.Content}
      </SectionTitle> */}
      {/* <Video /> */}
      {/* <SectionTitle
        pretitle={testimonial.Pretitle}
        title={testimonial.SubTitle}
      >
        {testimonial.Content}
      </SectionTitle> */}
      {/* <Testimonials /> */}
      <SectionTitle pretitle={questions.Pretitle} title={questions.SubTitle}>
        {questions.Content}
      </SectionTitle>
      <Faq />
      <div className="flex w-full items-center justify-center text-center">
        <Link
          href="/faq"
          className="px-6 py-2 text-white bg-emerald-600 rounded-md md:ml-5"
        >
        {t("more")}
        </Link>
      </div>
      {/* <Cta /> */}
      <Footer />
      {/* <PopupChat /> */}
      <PopupWidget />
    </>
  );
};

export default Home;
