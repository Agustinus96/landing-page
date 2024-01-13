import React from "react";
import Container from "../components/container";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import PopupWidget from "../components/popupWidget";

const Faq = () => {
  return (
    <> 
    <Navbar />
    <Container>
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqdata.map((item, index) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-emerald-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-emerald-500`}
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

const faqdata = [
  {
    question: "What is Gloxus",
    answer: "Gloxus is a specualized SaaS platform designed to optimize the hiring process in Japan, focusing on cultural fit and efficiency.",
  },
  {
    question: "How does Gloxus improve the hiring experience?",
    answer: "Our platform personalizes the hiring experience, emphasizing cultural alignment and efficiency, leading to more satisfying and effective recruitment outcomes for both employers and candidates.",
  },
  {
    question: "Who can benefit from using Gloxus? ",
    answer:
      "Gloxus is ideal for businesses of all sizes in Japan looking to streamline their recruitment process, as well as job seekers seeking a culturally aligned workplace.",
  },
  {
    question: "Is Gloxus suitable for international companies hiring in Japan? ",
    answer:
      "Yes, Gloxus is perfect for international companies looking to navigate the unique cultural and linguistic landscape of the Japanese job market.",
  },
  {
    question: "How does Gloxus ensure a good cultural fit?",
  answer: "We utilize advanced algorithms and localized insights to match candidates with companies where they'll thrive, considering both skills and cultural nuances.",
  },
  {
    question: "What languages does Gloxus support?",
  answer: "Gloxus supports both Japanese and English, facilitating seamless communication between employers and potential employees.",
  },
  {
    question: "Is there a trial period for Gloxus?",
  answer: "Yes, we offer a trial period. Please contact us for more details on how to get started.",
  },
  {
    question: "How does Gloxus handle data privacy and security?",
  answer: "We adhere to strict data privacy and security protocols to protect all user information on our platform.",
  },
  {
    question: "Can Gloxus integrate with our existing HR systems?",
  answer: "Yes, Gloxus is designed to integrate seamlessly with a variety of HR systems to enhance your existing workflows.",
  },
  {
    question: "How do I get started with Gloxus?",
  answer: "You can sign up directly on our website or contact our sales team for a personalized walkthrough of our platform.",
  },
  {
    question: "What customer support does Gloxus offer?",
  answer: "We provide comprehensive customer support, including a dedicated help center, live chat, and email assistance.",
  },
  {
    question: "Are there any customization options available in Gloxus?",
  answer: "Yes, Gloxus offers various customization options to tailor the platform to your specific hiring needs and preferences.",
  },
  {
    question: "What makes Gloxus unique compared to other hiring platforms?",
  answer: "Gloxus is uniquely designed for the Japanese market, with a strong emphasis on cultural fit and bilingual support, setting it apart from other platforms.",
  },
  {
    question: "How often is Gloxus updated with new features?",
  answer: "We continuously update Gloxus with new features and improvements based on user feedback and market trends.",
  },
  {
    question: "How can I provide feedback or suggest features for Gloxus?",
  answer: "We value user feedback! You can submit your suggestions through our website or contact our support team directly.",
  },
];

export default Faq;