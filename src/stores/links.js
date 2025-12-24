import {
  HomeIcon,
  ClipboardDocumentListIcon,
  MegaphoneIcon,
  ChartBarIcon,
  MapIcon,
} from "@heroicons/react/24/solid";

export const links = [
  { id: 1, to: "/", label: "Главная", icon: HomeIcon },
  { id: 2, to: "/requests", label: "Заявки", icon: ClipboardDocumentListIcon },
  { id: 3, to: "/news", label: "Объявления", icon: MegaphoneIcon },
  { id: 4, to: "/statistic", label: "Cтатистика", icon: ChartBarIcon },
  { id: 5, to: "/map", label: "Карта", icon: MapIcon },
];
