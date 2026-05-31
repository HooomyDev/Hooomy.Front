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
  WrenchScrewdriverIcon,
  UserGroupIcon,
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
        type: "link",
      },

      {
        id: 4,
        to: routes.hmoStat,
        label: t("nav.stat"),
        icon: ChartBarIcon,
        type: "link",
      },

      {
        id: 2,
        label: t("nav.data"),
        items: [
          {
            id: 2.1,
            to: routes["requests-data"],
            label: t("adminDashboard.requests"),
            icon: ClipboardDocumentListIcon,
          },
          {
            id: 2.2,
            to: routes["companies-data"],
            label: t("adminDashboard.hmo"),
            icon: WrenchScrewdriverIcon,
          },
          {
            id: 2.3,
            to: routes["users-data"],
            label: t("adminDashboard.users"),
            icon: UserGroupIcon,
          },
          {
            id: 2.4,
            to: routes.complaints,
            label: t("nav.complaints"),
            icon: ExclamationTriangleIcon,
          },
          {
            id: 2.5,
            to: routes.inquires,
            label: t("adminDashboard.inquiries"),
            icon: InformationCircleIcon,
          },
          {
            id: 2.6,
            to: routes.comments,
            label: t("nav.comments"),
            icon: ChatBubbleLeftRightIcon,
          },
        ],
        type: "drop",
      },
    ];

  if (user?.role === "Employee")
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
        to: routes.requests,
        label: t("nav.requestsEmp"),
        icon: ClipboardDocumentListIcon,
        type: "link",
      },
      {
        id: 3,
        to: routes.surveys,
        label: t("nav.news"),
        icon: MegaphoneIcon,
        type: "link",
      },
      {
        id: 4,
        to: routes["employee-works"],
        label: t("nav.works"),
        icon: Cog6ToothIcon,
        type: "link",
      },
      {
        id: 5,
        to: routes.statistics,
        label: t("nav.stat"),
        icon: ChartBarIcon,
        type: "link",
      },
      {
        id: 6,
        to: routes.chat,
        label: t("nav.messages"),
        icon: ChatBubbleBottomCenterTextIcon,
        type: "link",
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
    { id: 6, to: routes.map, label: t("nav.map"), icon: MapIcon, type: "link" },
    {
      id: 5,
      label: t("common.more"),
      items: [
        { id: 5.4, to: routes.faq, label: "FAQ", icon: InformationCircleIcon },
        {
          id: 5.5,
          to: routes.companies,
          label: t("adminDashboard.hmo"),
          icon: ChatBubbleLeftRightIcon,
        },
      ],
      type: "drop",
    },
  ];
}
