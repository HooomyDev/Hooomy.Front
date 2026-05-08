import React from "react";
import styles from "./EmployeeSurveys.module.css";
import PageHeader from "../../common/PageHeader/PageHeader";
import {
  ClipboardDocumentIcon,
  MegaphoneIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { useT } from "../../utils/useT";
import VerticalTabs from "../../common/VerticalTabs/VerticalTabs";
import EmployeeSurveysList from "./components/EmployeeSurveysList/EmployeeSurveysList";
import EmployeeSurveysCreateForm from "./components/EmployeeSurveysCreateForm/EmployeeSurveysCreateForm";

export default function EmployeeSurveys() {
  const t = useT();

  const navItems = [
    {
      id: 1,
      icon: PlusCircleIcon,
      label: t("employeeSurveys.nav.items.create"),
      content: <EmployeeSurveysCreateForm />,
    },
    {
      id: 2,
      icon: ClipboardDocumentIcon,
      label: t("employeeSurveys.nav.items.all"),
      content: <EmployeeSurveysList />,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <PageHeader title={t("employeeSurveys.header")} icon={MegaphoneIcon} />
      <div className={styles.container}>
        <VerticalTabs tabs={navItems} />
      </div>
    </div>
  );
}
