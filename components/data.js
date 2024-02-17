import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

import benefitOneImg from "../public/img/benefit-one.png";
import benefitTwoImg from "../public/img/benefit-two.png";


const benefitOne = {
  title: "Personalized hiring experience",
  desc: "High customability for each job hiring process. We provide a medium where employer and candidates can get to know each other better from the get-go, increasing the hiring efficiency in this tight market.",
  image: benefitOneImg,
  bullets: [
    {
      title: "Build a brand as an employer",
      desc: "Building company brand as employer from the get-go.",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Improve match rate",
      desc: "More engaging process means less mis-matched hire.",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "Drive employer retention",
      desc: "Possitive hiring experience decrease employer turnover rate.",
      icon: <CursorArrowRaysIcon />,
    },
    
  ],
};

const benefitTwo = {
  title: "Streamlined platform",
  desc: "Integrating new technologies to further streamline the hiring process and reduce the cumbersome process that plagued the hiring scene in Japan.",
  image: benefitTwoImg,
  bullets: [
    {
      title: "AI-Integration",
      desc: "Generate job description, messages and FAQ using the lastest AI technology.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Major workspace integration",
      desc: "Integration of major web-meeting platform such as Google Meet and Teams.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "Real-time feedback from candidates",
      desc: "Gloxus allows candidates to give a real-feedback on their hiring experience. ",
      icon: <SunIcon />,
    },
  ],
};


export {benefitOne, benefitTwo};
