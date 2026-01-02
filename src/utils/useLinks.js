import {
  HomeIcon,
  ClipboardDocumentListIcon,
  MegaphoneIcon,
  ChartBarIcon,
  MapIcon,
  Cog6ToothIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { useT } from "./useT";
import routes from "../stores/routes.json";

export function useLinks() {
  const t = useT();
  return [
    { id: 1, to: routes.home, label: t("nav.main"), icon: HomeIcon },
    {
      id: 2,
      to: routes.myRequests,
      label: t("nav.requests"),
      icon: ClipboardDocumentListIcon,
    },
    { id: 3, to: routes.works, label: t("nav.works"), icon: Cog6ToothIcon },
    { id: 4, to: routes.news, label: t("nav.news"), icon: MegaphoneIcon },
    { id: 5, to: routes.statistic, label: t("nav.stat"), icon: ChartBarIcon },
    { id: 6, to: routes.map, label: t("nav.map"), icon: MapIcon },
    { id: 7, to: routes.faq, label: "FAQ", icon: InformationCircleIcon },
  ];
}
