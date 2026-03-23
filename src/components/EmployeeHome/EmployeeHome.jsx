import React from "react";
import styles from "./EmployeeHome.module.css";
import PageHeader from "../../common/PageHeader/PageHeader";
import { WrenchScrewdriverIcon, BookOpenIcon } from "@heroicons/react/24/solid";
import Block from "../../common/Block/Block";
import { ReactComponent as UserIcon } from "../../assets/user.svg";
import { useAuthStore } from "../../stores/authStore";
import routes from "../../stores/routes.json";
import { useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useT } from "../../utils/useT";
import { useQuery } from "@tanstack/react-query";
import { getCompanyDetails } from "../../api/services/companyService";
import Loader from "../../common/Loader/Loader";

export default function EmployeeHome() {
  const t = useT();

  const user = useAuthStore((store) => store.user);
  const navigate = useNavigate();

  const { data: userCompany, isLoading } = useQuery({
    queryKey: ["userCompany"],
    queryFn: () => getCompanyDetails(user.companyId),
    staleTime: 5 * 60 * 1000,
  });

  const links = [
    {
      id: 1,
      label: t("employeeHome.links.requests.label"),
      description: t("employeeHome.links.requests.description"),
      to: routes.requests,
    },
    {
      id: 2,
      label: t("employeeHome.links.surveys.label"),
      description: t("employeeHome.links.surveys.description"),
      to: routes.surveys,
    },
    {
      id: 3,
      label: t("employeeHome.links.statistics.label"),
      description: t("employeeHome.links.statistics.description"),
      to: routes.statistics,
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.wrapper}>
      <PageHeader
        title={t("employeeHome.header")}
        icon={WrenchScrewdriverIcon}
      />

      <div className={styles.content}>
        <div className={styles.profileWrapper}>
          <Block title={t("employeeHome.profile")} Icon={UserIcon}>
            <div className={styles.profileCard}>
              <UserIcon className={styles.icon} />
              <div className={styles.info}>
                <div className={styles.email}>{user?.email}</div>
                <div className={styles.company}>
                  {userCompany?.name || t("employeeHome.companyDefault")}
                </div>
              </div>
            </div>
          </Block>
        </div>

        <Block title={t("employeeHome.linksTitle")} Icon={BookOpenIcon}>
          <div className={styles.linksWrapper}>
            {links.map((link) => (
              <div
                key={link.id}
                className={styles.linkCard}
                onClick={() => navigate(link.to)}
              >
                <div className={styles.linkInfo}>
                  <div className={styles.linkLabel}>{link.label}</div>
                  <div className={styles.linkDescription}>
                    {link.description}
                  </div>
                </div>
                <ChevronRightIcon className={styles.linkIcon} />
              </div>
            ))}
          </div>
        </Block>
      </div>
    </div>
  );
}
