import React from "react";
import styles from "./CompanyDetails.module.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getCompanyDetails } from "../../api/services/companyService";
import Loader from "../../common/Loader/Loader";
import {
  CalendarIcon,
  ClockIcon,
  EnvelopeIcon,
  GlobeEuropeAfricaIcon,
  PhoneArrowDownLeftIcon,
} from "@heroicons/react/24/solid";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import Block from "../../common/Block/Block";
import Button from "../../common/Button/Button";
import { createChat } from "../../api/services/chatService";
import routes from "../../stores/routes.json";

export default function CompanyDetails() {
  const { companyId } = useParams();
  const navigate = useNavigate();

  const { data: company, isLoading } = useQuery({
    queryKey: ["company", companyId],
    queryFn: () => getCompanyDetails(companyId),
  });

  const createChatMutation = useMutation({
    mutationKey: ["createChat"],
    mutationFn: async () => {
      await createChat(companyId);
      navigate(routes.chats);
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  const infoItems = [
    {
      label: "Телефон",
      value: company.phone,
      icon: <PhoneArrowDownLeftIcon className={styles.icon} />,
    },
    {
      label: "Email",
      value: company.email,
      icon: <EnvelopeIcon className={styles.icon} />,
    },
    {
      label: "Адрес",
      value: company.address,
      icon: <GlobeEuropeAfricaIcon className={styles.icon} />,
    },
    {
      label: "Режим работы",
      value: company.workingHours,
      icon: <ClockIcon className={styles.icon} />,
    },
    {
      label: "Дата регистрации",
      value: new Date(company.createdAt).toLocaleDateString("ru-RU"),
      icon: <CalendarIcon className={styles.icon} />,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <Block>
        <div className={styles.companyHeader}>
          <BuildingOffice2Icon className={styles.icon} />
          <h1>{company.name}</h1>
        </div>

        <div className={styles.info}>
          {infoItems.map((item, index) => (
            <div key={index} className={styles.infoCard}>
              <div className={styles.infoHeader}>
                {item.icon}
                <div className={styles.infoLabel}>{item.label}</div>
              </div>
              <div className={styles.infoValue}>{item.value || "—"}</div>
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <Button
            variant="secondary"
            className={styles.actionButton}
            onClick={() => navigate(-1)}
          >
            Назад
          </Button>
          <Button
            className={styles.actionButton}
            onClick={() => createChatMutation.mutateAsync()}
          >
            Написать
          </Button>
        </div>
      </Block>
    </div>
  );
}
