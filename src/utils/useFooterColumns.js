import { useTranslation } from "react-i18next";
import routes from "../stores/routes.json";

export function useFooterColumns() {
  const { t } = useTranslation();

  return [
    {
      title: t("footer.navigation"),
      items: [
        { type: "link", label: t("footer.home"), href: routes.home },
        { type: "link", label: t("footer.requests"), href: routes.myRequests },
        { type: "link", label: t("footer.news"), href: routes.news },
        { type: "link", label: t("footer.map"), href: routes.map },
        { type: "link", label: "FQA", href: routes.faq },
      ],
    },
    {
      title: t("footer.contacts"),
      items: [
        { type: "text", label: t("footer.phone") },
        { type: "text", label: t("footer.email") },
        { type: "text", label: t("footer.address") },
        { type: "text", label: t("footer.worktime") },
      ],
    },
    {
      title: t("footer.documents"),
      items: [
        { type: "link", label: t("footer.terms"), href: routes.terms },
        { type: "link", label: t("footer.privacy"), href: routes.privacy },
        { type: "link", label: t("footer.cookies"), href: routes.cookies },
        { type: "text", label: t("footer.version") },
      ],
    },
    {
      title: t("footer.social"),
      items: [
        {
          type: "external",
          label: t("footer.telegram"),
          href: "https://t.me/hooomy_by",
        },
        {
          type: "external",
          label: t("footer.vk"),
          href: "https://vk.com/hooomy",
        },
        {
          type: "external",
          label: t("footer.instagram"),
          href: "https://instagram.com/hooomy",
        },
      ],
    },
    {
      title: t("footer.developers"),
      items: [
        { type: "link", label: t("footer.report"), href: routes.report },
        { type: "link", label: t("footer.docs"), href: routes.docs },
        {
          type: "external",
          label: t("footer.github"),
          href: "https://github.com/HooomyDev",
        },
      ],
    },
  ];
}
