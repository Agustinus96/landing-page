// import {
//   FaceSmileIcon,
//   ChartBarSquareIcon,
//   CursorArrowRaysIcon,
//   DevicePhoneMobileIcon,
//   AdjustmentsHorizontalIcon,
//   SunIcon,
//   SparklesIcon,
//   UserGroupIcon
// } from "@heroicons/react/24/solid";


// import productOneImg from "../../public/img/platform.png";
// import productTwoImg from "../../public/img/hiring-management.png";

// const productOne = {
//   title: "Hiring platform",
//   desc: "End-to-end hiring platform for everyone. Whether you are a company looking to hire, recruitment company or individual candidate, we provide value for everyone.",
//   image: productOneImg,
//   bullets: [
//     {
//       title: "Build a brand as an employer",
//       desc: "Building company brand as employer from the get-go.",
//       icon: <SparklesIcon />,
//     },
//     {
//       title: "Improve match rate",
//       desc: "More engaging process means less mis-matched hire.",
//       icon: <ChartBarSquareIcon />,
//     },
//     {
//       title: "Drive employer retention",
//       desc: "Possitive hiring experience decrease employer turnover rate.",
//       icon: <UserGroupIcon/>,
//     },
//   ],
// };

// const productTwo = {
//   title: "Streamlined platform",
//   desc: "Integrating new technologies to further streamline the hiring process and reduce the cumbersome process that plagued the hiring scene in Japan.",
//   image: productTwoImg,
//   bullets: [
//     {
//       title: "AI-Integration",
//       desc: "Generate job description, messages and FAQ using the lastest AI technology.",
//       icon: <DevicePhoneMobileIcon />,
//     },
//     {
//       title: "Major workspace integration",
//       desc: "Integration of major web-meeting platform such as Google Meet and Teams.",
//       icon: <AdjustmentsHorizontalIcon />,
//     },
//     {
//       title: "Real-time feedback from candidates",
//       desc: "Gloxus allows candidates to give a real-feedback on their hiring experience. ",
//       icon: <SunIcon />,
//     },
//   ],
// };


// export {productOne, productTwo};

import { useRouter } from 'next/router';

export function useServicesData() {
  const { locale } = useRouter();
  const translations = require(`../../public/locales/${locale}/services.json`);

  return translations;
}