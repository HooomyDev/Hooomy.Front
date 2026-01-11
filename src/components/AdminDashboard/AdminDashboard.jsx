import React from "react";
import {
  HomeIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  ExclamationTriangleIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid";
import PageHeader from "../../common/PageHeader/PageHeader";
import Block from "../../common/Block/Block";
import styles from "./AdminDashboard.module.css";
import { useT } from "../../utils/useT";
import CountUp from "react-countup";
import EmployeeStatisticChart from "../EmployeeStatisticChart/EmployeeStatisticChart";
import requestsList from "../EmployeeStatistic/requests";

export default function AdminDashboard() {
  const t = useT();

  const {
    users = Math.floor(Math.random() * 500), // от 0 до 499
    requests = Math.floor(Math.random() * 1000), // от 0 до 999
    complaints = Math.floor(Math.random() * 100), // от 0 до 99
    comments = Math.floor(Math.random() * 300), // от 0 до 299
  } = {};

  const cards = [
    {
      id: 1,
      label: t("adminDashboard.users"),
      value: users,
      icon: UserGroupIcon,
    },
    {
      id: 2,
      label: t("adminDashboard.requests"),
      value: requests,
      icon: ClipboardDocumentListIcon,
    },
    {
      id: 3,
      label: t("adminDashboard.complaints"),
      value: complaints,
      icon: ExclamationTriangleIcon,
    },
    {
      id: 4,
      label: t("adminDashboard.comments"),
      value: comments,
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
        <div className={styles.cards}>
          {cards.map((card) => (
            <Block key={card.id} title={card.label} Icon={card.icon}>
              <div className={styles.card}>
                <CountUp end={card.value} duration={2} separator=" " />
              </div>
            </Block>
          ))}
        </div>

        <EmployeeStatisticChart requests={requestsList} />
      </div>
    </div>
  );
}
