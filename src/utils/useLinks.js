import {
  HomeIcon,
  ClipboardDocumentListIcon,
  MegaphoneIcon,
  ChartBarIcon,
  MapIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/solid";
import { useT } from "./useT";

export function useLinks() { 
  const t = useT();
  return [
    { id: 1, to: "/", label: t("nav.main"), icon: HomeIcon }, 
    { id: 2, to: "/requests", label: t("nav.requests"), icon: ClipboardDocumentListIcon }, 
    { id: 3, to: "/shutdowns", label: t("nav.works"), icon: Cog6ToothIcon }, 
    { id: 4, to: "/news", label: t("nav.news"), icon: MegaphoneIcon },
    { id: 5, to: "/statistic", label: t("nav.stat"), icon: ChartBarIcon }, 
    { id: 6, to: "/map", label: t("nav.map"), icon: MapIcon }, 
  ]; 
}