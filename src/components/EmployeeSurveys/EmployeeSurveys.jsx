import React, { useEffect, useState } from "react";
import styles from "./EmployeeSurveys.module.css";
import PageHeader from "../../common/PageHeader/PageHeader";
import {
  MegaphoneIcon,
  Bars3Icon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";
import Block from "../../common/Block/Block";
import Button from "../../common/Button/Button";
import EmployeeSurveysList from "../EmployeeSurveysList/EmployeeSurveysList";
import EmployeeSurveysCreateForm from "../EmployeeSurveysCreateForm/EmployeeSurveysCreateForm";
import { useT } from "../../utils/useT";
import { useQuery } from "@tanstack/react-query";
import { getSurvays } from "../../api/services/survaceService";
import Loader from "../../common/Loader/Loader";

export default function EmployeeSurveys() {
  const t = useT();

  const { data, isLoading } = useQuery({
    queryKey: ["surveys"],
    queryFn: () => getSurvays(),
  });

  const navItems = [
    { id: 1, label: t("employeeSurveys.nav.items.create") },
    { id: 2, label: t("employeeSurveys.nav.items.all") },
    { id: 3, label: t("employeeSurveys.nav.items.active") },
    { id: 4, label: t("employeeSurveys.nav.items.archive") },
  ];

  const [activeItem, setActiveItem] = useState(navItems[0].id);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setActiveItem(0);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [setActiveItem]);

  const renderContent = () => {
    switch (activeItem) {
      case 1:
        return <EmployeeSurveysCreateForm />;
      case 2:
        return <EmployeeSurveysList items={data.polls} />;

      case 0:
        return <div className={styles.empty}>{t("employeeSurveys.empty")}</div>;
      default:
        return <div></div>;
    }
  };

  if (isLoading) return <Loader />;
  return (
    <div className={styles.wrapper}>
      <PageHeader title={t("employeeSurveys.header")} icon={MegaphoneIcon} />
      <div className={styles.container}>
        <div className={styles.nav}>
          <Block title={t("employeeSurveys.nav.title")} Icon={Bars3Icon}>
            <div className={styles.navItems}>
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  className={styles.navItem}
                  onClick={() => setActiveItem(item.id)}
                  variant={activeItem === item.id ? "primary" : "secondary"}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </Block>
        </div>
        <div className={styles.workplace}>
          <Block
            title={t("employeeSurveys.workplace.title")}
            Icon={Squares2X2Icon}
          >
            {renderContent()}
          </Block>
        </div>
      </div>
    </div>
  );
}
