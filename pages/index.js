import Head from "next/head";
import Hero from "../components/hero";
import Navbar from "../components/navbar";
import SectionTitle from "../components/sectionTitle";
import Benefits from "../components/benefits";
import Footer from "../components/footer";
import Faq from "../components/faq";
import PopupWidget from "../components/popupWidget";
import Link from "next/link";
import Script from 'next/script'
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
        <meta name="description" content={t("HomeDescription")} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={t("HomeTitle")} />
        <meta property="og:description" content={t("HomeDescription")} />
        <meta property="og:url" content="https://gloxus.jp" />
        <meta property="og:site_name" content="Gloxus" />
        <meta property="article:modified_time" content="2024-05-29T14:40:42+00:00" />
        <link rel="icon" href="/favicon.ico" />

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-H0NPV552C8"></script>
        <script dangerouslySetInnerHTML={{
          __html: `          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());

          gtag('config', 'G-H0NPV552C8');`,
        }}></script>
      </Head>

      <Navbar />
      <Hero />

      <p hidden>{t("SeoContent1")}</p>
      <p hidden>{t("SeoContent2")}</p>
      <h2 hidden>{t("SeoContent3")}</h2>

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
