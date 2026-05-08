import React, { useEffect, useState } from "react";
import { MegaphoneIcon, BoltIcon } from "@heroicons/react/24/solid";
import styles from "./Surveys.module.css";
import Block from "../../common/Block/Block";
import Survey from "../../features/Surveys/Survey";
import PageHeader from "../../common/PageHeader/PageHeader";
import { useT } from "../../utils/useT";
import { useQuery } from "@tanstack/react-query";
import { getSurvays } from "../../api/services/survaceService";
import Loader from "../../common/Loader/Loader";
import Pagination from "../../common/Pagination/Pagination";
import Notification from "../../common/Notification/Notification";
import EmptyBlock from "../../common/EmptyBlock/EmptyBlock";

export default function Surveys() {
  const t = useT();
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5,
    status: 1,
  });
  const [notification, setNotification] = useState(null);

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["surveys", pagination.page, pagination.pageSize],
    queryFn: async () => {
      const result = await getSurvays(
        pagination.page,
        pagination.pageSize,
        pagination.status
      );
      return result;
    },
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (isError) {
      setNotification({
        type: "error",
        message: "Произошла ошибка во время загрузки опросов",
      });
    }
  }, [isError]);

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const surveys = response?.polls || [];
  const totalCount = response?.totalCount || 0;
  const totalPages =
    response?.totalPages || Math.ceil(totalCount / pagination.pageSize);

  if (isLoading && !surveys.length) {
    return <Loader />;
  }

  return (
    <div className={styles.wrapper}>
      {notification && (
        <Notification
          duration={3000}
          onClose={() => setNotification(null)}
          type={notification.type}
        >
          <div>{notification.message}</div>
        </Notification>
      )}

      <PageHeader title={t("surveys.title")} icon={MegaphoneIcon} />

      <Block title={t("surveys.active")} Icon={BoltIcon}>
        {surveys.length === 0 ? (
          <div className={styles.empty}>
            <EmptyBlock Icon={MegaphoneIcon}>
              Сейчас нет активных опросов
            </EmptyBlock>
          </div>
        ) : (
          <>
            <div className={styles.surveys}>
              {surveys.map((survey) => (
                <Survey
                  key={survey.id}
                  id={survey.id}
                  title={survey.title}
                  type={survey.type}
                  isActive={survey.type === 1}
                  companyName={survey.companyName}
                />
              ))}
            </div>

            <Pagination
              currentPage={pagination.page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </Block>
    </div>
  );
}
