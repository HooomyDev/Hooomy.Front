import {
  HomeIcon,
  ClipboardDocumentListIcon,
  MegaphoneIcon,
  ChartBarIcon,
  MapIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/solid";

export const links = [
  { id: 1, to: "/", label: "Главная", icon: HomeIcon },
  { id: 2, to: "/requests", label: "Мои заявки", icon: ClipboardDocumentListIcon },
  { id: 3, to: "/shutdowns", label: "Работы", icon: Cog6ToothIcon },
  { id: 4, to: "/news", label: "Опросы", icon: MegaphoneIcon },
  { id: 5, to: "/statistic", label: "Cтатистика", icon: ChartBarIcon },
  { id: 6, to: "/map", label: "Карта", icon: MapIcon },
];
