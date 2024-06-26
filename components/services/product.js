import Image from "next/image";
import React from "react";
import Container from "../container";
import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
  SparklesIcon,
  UserGroupIcon,
  BriefcaseIcon,
  ClipboardDocumentCheckIcon,
  MagnifyingGlassIcon,
  CircleStackIcon
} from "@heroicons/react/24/solid";

const Products = (props) => {
  const { data } = props;
  const iconMapping = {
    FaceSmileIcon: FaceSmileIcon,
    ChartBarSquareIcon: ChartBarSquareIcon,
    CursorArrowRaysIcon: CursorArrowRaysIcon,
    DevicePhoneMobileIcon: DevicePhoneMobileIcon,
    AdjustmentsHorizontalIcon: AdjustmentsHorizontalIcon,
    SunIcon: SunIcon,
    SparklesIcon: SparklesIcon,
    UserGroupIcon: UserGroupIcon,
    Briefcase: BriefcaseIcon,
    ClipboardDocument: ClipboardDocumentCheckIcon,
    MagnifyingGlass: MagnifyingGlassIcon,
    Database: CircleStackIcon
  };
  return (
    <>
      <Container className="flex flex-wrap mb-20 lg:gap-10 lg:flex-nowrap mx-auto">
        <div
          className={`flex items-center justify-center w-full lg:w-1/2 ${
            props.imgPos === "right" ? "lg:order-1" : ""
          }`}>
          <div>
            <Image
              src={data.image}
              width="720"
              height="480"
              alt="Features"
              className={"object-cover"}
            />
          </div>
        </div>

        <div
          className={`flex flex-wrap items-center w-full lg:w-1/2 ${
            data.imgPos === "right" ? "lg:justify-end" : ""
          }`}>
          <div>
            <div className="flex flex-col w-full mt-4">
              <h3 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
                {data.title}
              </h3>

              <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
                {data.desc}
              </p>
            </div>

            <div className="w-full mt-5">
              {data.bullets.map((item, index) => (
                <Product key={index} title={item.title} icon={iconMapping[item.icon] ? React.createElement(iconMapping[item.icon], {
                  style: { transform: 'scale(0.7)' }
                }) : undefined}>
                  {item.desc}
                </Product>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

function Product({ title, children, icon }) {
  return (
    <>
      <div className="flex items-start mt-8 space-x-3">
        <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-teal-500 rounded-md w-11 h-11 ">
          {icon}
        </div>
        <div>
          <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200">
            {title}
          </h4>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            {children}
          </p>
        </div>
      </div>
    </>
  );
}

export default Products;
