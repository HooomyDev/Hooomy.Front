import React from "react";
import styles from "./House.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAddressDetails } from "../../api/services/addressController";
import Loader from "../../common/Loader/Loader";
import {
  ArrowTopRightOnSquareIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import Button from "../../common/Button/Button";
import routes from "../../stores/routes.json";

export default function House() {
  const { addressId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["addressInfo", addressId],
    queryFn: async () => await getAddressDetails(addressId),
    staleTime: 0,
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Ошибка: {error.message}</div>;
  if (!data) return <div>Данные не найдены</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Информация о доме</div>
          <div className={styles.address}>
            {data.street}, {data.houseNumber}
          </div>
        </div>

        {data.company ? (
          <div className={styles.company}>
            <div className={styles.title}>
              <span>Информация о ЖЭУ</span>
              <Button
                className={styles.titleButton}
                variant="secondary"
                onClick={() =>
                  navigate(`${routes.companies}/${data.company.id}`)
                }
              >
                <ArrowTopRightOnSquareIcon className={styles.icon} />
              </Button>
            </div>
            <div className={styles.companyItem}>
              <span className={styles.label}>Название</span>
              <span className={styles.companyName}>{data.company.name}</span>
            </div>
            <div className={styles.companyItem}>
              <span className={styles.label}>Телефон</span>
              <a
                href={`tel:${data.company.phone}`}
                className={styles.companyPhone}
              >
                {data.company.phone}
              </a>
            </div>
            <div className={styles.companyItem}>
              <span className={styles.label}>Email</span>
              <a
                href={`mailto:${data.company.email}`}
                className={styles.companyEmail}
              >
                {data.company.email}
              </a>
            </div>
            <div className={styles.companyItem}>
              <span className={styles.label}>Режим работы</span>
              <span>{data.company.workingHours}</span>
            </div>
          </div>
        ) : (
          <div className={styles.noCompany}>Компания не назначена</div>
        )}

        <div className={styles.worksSection}>
          <div className={styles.title}>Плановые работы</div>
          {data.works?.length === 0 ? (
            <div className={styles.noWorks}>Нет запланированных работ</div>
          ) : (
            <div className={styles.worksList}>
              {data.works.map((work, index) => (
                <div key={index} className={styles.workCard}>
                  <div className={styles.workHeader}>
                    <div className={styles.title}>{work.title}</div>
                    <div
                      className={`${styles.seriousness} ${
                        work.seriousness === 1
                          ? styles.seriousnessInfo
                          : styles.seriousnessWarn
                      }`}
                    >
                      {work.seriousness === 1 ? (
                        <InformationCircleIcon className={styles.icon} />
                      ) : (
                        <ExclamationTriangleIcon className={styles.icon} />
                      )}
                    </div>
                  </div>
                  <p className={styles.workDescription}>{work.description}</p>
                  <div className={styles.workDates}>
                    <div>
                      <span className={styles.label}>Планируемый период:</span>
                      <span>
                        {new Date(work.plannedStartTime).toLocaleDateString()} -{" "}
                        {new Date(work.plannedEndTime).toLocaleDateString()}
                      </span>
                    </div>
                    {work.factStartTime && (
                      <div>
                        <span className={styles.label}>
                          Фактическое начало:
                        </span>
                        <span>
                          {new Date(work.factStartTime).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {work.factEndTime && (
                      <div>
                        <span className={styles.label}>
                          Фактическое окончание:
                        </span>
                        <span>
                          {new Date(work.factEndTime).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
