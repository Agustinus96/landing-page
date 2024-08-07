import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import ThemeChanger from "./DarkSwitch";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import translations from "../components/translation/navbarTranslation";

const Navbar = () => {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;
  const currentTranslation = translations[locale];

  const navigation = [
    { path: "/Services", label: currentTranslation.Services },
    { path: "/Features", label: currentTranslation.Features },
    { path: "/Pricing", label: currentTranslation.Pricing },
    { path: "/Company", label: currentTranslation.Company },
    { path: "/News", label: currentTranslation.News },
  ];

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "ja" : "en";
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  const handleSelect = (selectedData) => {
    router.push({ pathname, query }, asPath, { locale: selectedData });
  };

  return (
    <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                <Link href="/" locale={locale}>
                  <span className="flex items-center space-x-2 text-2xl font-medium text-emerald-500 dark:text-gray-100">
                    <span>
                      <Image
                        src="/img/logo.svg"
                        alt="N"
                        width="64"
                        height="64"
                        className="w-8"
                      />
                    </span>
                    <span>Gloxus</span>
                  </span>
                </Link>

                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover:text-emerald-500 focus:text-emerald-500 focus:bg-emerald-100 focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700"
                >
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    {open && (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    )}
                    {!open && (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>

                <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                  <>
                    {navigation.map((item, index) => (
                      <Link
                        key={index}
                        href={item.path}
                        className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-emerald-500 focus:text-emerald-500 focus:bg-emerald-100 dark:focus:bg-gray-800 focus:outline-none"
                      >
                        {item.label}
                      </Link>
                    ))}
                    <Link
                      href="https://app.gloxus.jp/register"
                      className="w-full px-6 py-2 mt-3 text-center text-white bg-emerald-600 rounded-md lg:ml-5"
                    >
                      {locale === "en" ? "Get Started" : (locale === "ja" ? "登録" : "Mulai")}
                    </Link>
                    <select name="forma" onChange={(val) => handleSelect(val.target.value)} class="w-full px-6 py-2 mt-3 text-center text-white bg-emerald-600 rounded-md lg:ml-5">
                      <option value="en">English</option>
                      <option value="ja">日本語</option>
                      <option value="id">Indonesian</option>
                    </select>
                  </>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>

        {/* menu  */}
        {/* menu  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((item, index) => (
              <li className="mr-3 nav__item" key={index}>
                <Link
                  href={item.path}
                  className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-emerald-500 focus:text-emerald-500 focus:bg-emerald-100 focus:outline-none dark:focus:bg-gray-800"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden mr-3 space-x-4 lg:flex nav__item">
          <Link
            href="https://app.gloxus.jp/register"
            className="px-4 py-2 text-white bg-emerald-600 rounded-md md:ml-5"
          >
            {locale === "en" ? "Get Started" : (locale === "ja" ? "登録" : "Mulai")}
          </Link>

          <select name="forma" onChange={(val) => handleSelect(val.target.value)}class="px-2 py-2 text-white bg-emerald-600 rounded-md md:ml-5">
            <option value="en">English</option>
            <option value="ja">日本語</option>
            <option value="id">Indonesian</option>
          </select>
          <ThemeChanger />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
