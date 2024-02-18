import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

import featureOneImg from "../../public/img/hiring-experience.jpg";
import featureTwoImg from "../../public/img/hiring-management.png";

import { useRouter } from 'next/router';

export function useFeaturesData() {
  const { locale } = useRouter();
  const translations = require(`../../public/locales/${locale}/features.json`);

  return translations;
}


