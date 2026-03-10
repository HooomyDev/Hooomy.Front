import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  HomeIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  ExclamationTriangleIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid";
import PageHeader from "../../common/PageHeader/PageHeader";
import styles from "./AdminDashboard.module.css";
import { useT } from "../../utils/useT";
import AdminDashboardStatCards from "./components/AdminDashboardStatCards";
import EmployeeStatisticChart from "../EmployeeStatisticChart/EmployeeStatisticChart";
import requestsList from "../EmployeeStatistic/requests";
import { getRequestCount } from "../../api/services/requestService";
import { getUserCount } from "../../api/services/userService";
import { getComplaintCount } from "../../api/services/complaintService";

export default function AdminDashboard() {
  const t = useT();

  const { data: requestCount } = useQuery({
    queryKey: ["requestCount"],
    queryFn: getRequestCount,
  });

  const { data: userCount } = useQuery({
    queryKey: ["userCount"],
    queryFn: getUserCount,
  });

  const { data: complaintsCount } = useQuery({
    queryKey: ["complaintsCount"],
    queryFn: getComplaintCount,
  });

  const mockStats = {
    comments: Math.floor(Math.random() * 300),
  };

  const cards = [
    {
      id: 1,
      label: t("adminDashboard.users"),
      value: userCount ?? 0,
      icon: UserGroupIcon,
    },
    {
      id: 2,
      label: t("adminDashboard.requests"),
      value: requestCount ?? 0,
      icon: ClipboardDocumentListIcon,
    },
    {
      id: 3,
      label: t("adminDashboard.complaints"),
      value: complaintsCount ?? 0,
      icon: ExclamationTriangleIcon,
    },
    {
      id: 4,
      label: t("adminDashboard.comments"),
      value: mockStats.comments,
      icon: ChatBubbleLeftRightIcon,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <PageHeader
        title={t("adminDashboard.header")}
        description={t("adminDashboard.description")}
        icon={HomeIcon}
      />

      <div className={styles.content}>
        <AdminDashboardStatCards cards={cards} />
        <EmployeeStatisticChart requests={requestsList} />
      </div>
    </div>
  );
}
