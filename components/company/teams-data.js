import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

import founderImg from "../../public/img/founder.jpg";
//   import benefitTwoImg from "../public/img/benefit-two.png";

const founder = {
  title: "Founder",
  desc: "Discovering the transformative power of personal connection in recruitment, Agustinus embarked on a journey to redefine the hiring process. Drawing from his extensive experience navigating the traditional job-hunting landscape in Japan and playing a pivotal role in talent placement as a corporate planner, he uncovered the profound impact of a company's approach to engaging potential hires, especially on an international scale. Motivated by this insight and the current market's unique dynamics, where opportunities exceed seekers, Agustinus founded Gloxus. His vision? To craft a platform that infuses personalization into every step of recruitment, ensuring companies not only attract but secure the exceptional talent that drives success in this employee-centric era.",
  image: founderImg,
  bullets: [
    {
      title: "Our basic offering",
      desc: "Enjoy our job postings up to 3 posts/month and limited hiring management quota.",
      icon: <FaceSmileIcon />,
    },
    {
      title: "5 candidates / month",
      desc: "Good value to maximize hiring experience for screened candidates.",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "80$/month",
      desc: "Basic plan",
      icon: <CursorArrowRaysIcon />,
    },
  ],
};

const coFounder = {
  title: "Permium plan",
  desc: "Best suited for companies that have to go through a lot of hiring to get the right candidate.",
  bullets: [
    {
      title: "Professional offering",
      desc: "Enjoy up to 9 job posts/month and AI integrated job description creation and hiring management system.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "up to 15 candidates / month",
      desc: "Suited for bigger organization who need to hire more and better people.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "150$/month",
      desc: "Great value.",
      icon: <SunIcon />,
    },
  ],
};

const team = {
  title: "Permium plan",
  desc: "Best suited for companies that have to go through a lot of hiring to get the right candidate.",
  bullets: [
    {
      title: "Professional offering",
      desc: "Enjoy up to 9 job posts/month and AI integrated job description creation and hiring management system.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "up to 15 candidates / month",
      desc: "Suited for bigger organization who need to hire more and better people.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "150$/month",
      desc: "Great value.",
      icon: <SunIcon />,
    },
  ],
};

export { founder, coFounder, team };
