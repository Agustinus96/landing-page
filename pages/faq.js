import React from "react";
import Container from "../components/container";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import PopupWidget from "../components/popupWidget";
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";
import translations from "../components/translation/navbarTranslation";

export function useServicesData() {
  const { locale } = useRouter();
  const translations = require(`../public/locales/${locale}/faq.json`);

  return translations;

};

const Faq = () => {
  const faqData = useServicesData();

  return (
    <> 
    <Navbar />
    <Container>
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqData.faqs.map((item, index) => (
          <div key={index} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-emerald-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-emerald-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-500 dark:text-gray-300">
                    {item.answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
    <Footer />
    <PopupWidget />
    </>
  );
}

export default Faq;
