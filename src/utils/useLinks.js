import {
  HomeIcon,
  ClipboardDocumentListIcon,
  MegaphoneIcon,
  ChartBarIcon,
  MapIcon,
  Cog6ToothIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  ChatBubbleLeftRightIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/solid";
import { useT } from "./useT";
import routes from "../stores/routes.json";
import { useAuthStore } from "../stores/authStore";

export function useLinks() {
  const t = useT();
  const user = useAuthStore((store) => store.user);

  if (user?.role === "Admin")
    return [
      {
        id: 1,
        to: routes.adminDashboard,
        label: t("nav.main"),
        icon: HomeIcon,
      },
      {
        id: 2,
        to: routes.databases,
        label: t("nav.data"),
        icon: ClipboardDocumentListIcon,
      },
      {
        id: 3,
        to: routes.complaints,
        label: t("nav.complaints"),
        icon: ExclamationTriangleIcon,
      },
      {
        id: 4,
        to: routes.hmoStat,
        label: t("nav.stat"),
        icon: ChartBarIcon,
      },
      {
        id: 5,
        to: routes.comments,
        label: t("nav.comments"),
        icon: ChatBubbleLeftRightIcon,
      },
    ];

  if (user?.role === "Employee")
    return [
      { id: 1, to: routes.home, label: t("nav.main"), icon: HomeIcon },
      {
        id: 2,
        to: routes.requests,
        label: t("nav.requestsEmp"),
        icon: ClipboardDocumentListIcon,
      },
      {
        id: 3,
        to: routes.surveys,
        label: t("nav.news"),
        icon: MegaphoneIcon,
      },
      {
        id: 4,
        to: routes.statistics,
        label: t("nav.stat"),
        icon: ChartBarIcon,
      },
      {
        id: 5,
        to: routes.chat,
        label: "Сообщения",
        icon: ChatBubbleBottomCenterTextIcon,
      },
    ];

  return [
    {
      id: 1,
      to: routes.home,
      label: t("nav.main"),
      icon: HomeIcon,
      type: "link",
    },
    {
      id: 2,
      to: routes.myRequests,
      label: t("nav.requests"),
      icon: ClipboardDocumentListIcon,
      type: "link",
    },
    {
      id: 3,
      to: routes.works,
      label: t("nav.works"),
      icon: Cog6ToothIcon,
      type: "link",
    },
    {
      id: 4,
      to: routes.news,
      label: t("nav.news"),
      icon: MegaphoneIcon,
      type: "link",
    },
    {
      id: 5,
      label: "Ещё",
      items: [
        {
          id: 5.1,
          to: routes.statistic,
          label: t("nav.stat"),
          icon: ChartBarIcon,
        },
        { id: 5.2, to: routes.map, label: t("nav.map"), icon: MapIcon },
        { id: 5.4, to: routes.faq, label: "FAQ", icon: InformationCircleIcon },
        {
          id: 5.5,
          to: routes.companies,
          label: "Компании",
          icon: ChatBubbleLeftRightIcon,
        },
      ],
      type: "drop",
    },
  ];
}
