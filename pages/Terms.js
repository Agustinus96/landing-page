// pages/terms.js
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import Navbar from "../components/navbar";
import Head from "next/head";

export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['terms'])), // Ensure 'common' is your default namespace
      },
    };
  }
  

const TermsPage = () => {
  const { t } = useTranslation("terms");
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;

  const sections = t("sections", { returnObjects: true });

  return (
    <>
      <Navbar />
      <Head>
        <title>Terms & Conditions</title>
        <meta
          name="description"
          content="Other services we provide at Gloxus"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-3xl xl:leading-tight dark:text-white py-3">
          {t("title")}
        </h1>
        <p>{t("introduction")}</p>
        <div className="mt-6">
          {sections.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-xl font-semibold leading-snug tracking-tight text-gray-800 lg:text-xl lg:leading-tight xl:text-2xl xl:leading-tight dark:text-white pb-3">
                {locale === "en" ? `${section.section_id}. ` : `第 ${section.section_id} ` }
                {section.title}
              </h2>
              <p className="whitespace-pre-line text-gray-800 dark:text-white">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};


export default TermsPage;
