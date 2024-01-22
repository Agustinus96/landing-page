import {
    FaceSmileIcon,
    ChartBarSquareIcon,
    CursorArrowRaysIcon,
    DevicePhoneMobileIcon,
    AdjustmentsHorizontalIcon,
    SunIcon,
  } from "@heroicons/react/24/solid";
  
//   import benefitOneImg from "../public/img/benefit-one.png";
//   import benefitTwoImg from "../public/img/benefit-two.png";
  
  const priceOne = {
    title: "Basic plan",
    desc: "Enjoy our core offering with affordable monthly payment plan. Limited generative AI integration.",
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
  
  const priceTwo = {
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
  
  
  export {priceOne, priceTwo};
  