import React, { useState } from "react";
import styles from "./Inquiries.module.css";
import PageHeader from "../../common/PageHeader/PageHeader";
import {
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import Block from "../../common/Block/Block";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../../common/Button/Button";
import DateField from "../../common/DateField/DateField";
import { useQuery } from "@tanstack/react-query";
import { getInquiries } from "../../api/services/inquiryService";
import Loader from "../../common/Loader/Loader";
import Pagination from "../../common/Pagination/Pagination";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import EmptyBlock from "../../common/EmptyBlock/EmptyBlock";

export default function Inquiries() {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5,
  });
  const [filters, setFilters] = useState({
    date: "",
  });
  const methods = useForm({
    defaultValues: {
      date: "",
    },
  });

  const handleSearch = () => {
    const formValues = methods.getValues();

    let dateToSend = "";
    if (formValues.date) {
      const date = new Date(formValues.date);
      dateToSend = date.toISOString();
    }

    setFilters({
      date: dateToSend,
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { data, isLoading } = useQuery({
    queryKey: ["inquiries", pagination.page, pagination.pageSize, filters.date],
    queryFn: async () =>
      await getInquiries(pagination.page, pagination.pageSize, filters.date),
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });

  if (isLoading) return <Loader />;

  return (
    <div className={styles.wrapper}>
      <PageHeader
        icon={InformationCircleIcon}
        title="Обращения пользователей"
      />

      <Block>
        <form
          className={styles.searchBlock}
          onSubmit={methods.handleSubmit(handleSearch)}
        >
          <FormProvider {...methods}>
            <DateField name="date" />
            <Button
              className={styles.searchButton}
              onClick={() => handleSearch()}
              variant="secondary"
              type="submit"
            >
              <MagnifyingGlassIcon className={styles.icon} />
            </Button>
          </FormProvider>
        </form>
      </Block>

      <Block>
        <div className={styles.content}>
          <div className={styles.list}>
            {data.inquiries?.length === 0 ? (
              <EmptyBlock Icon={InformationCircleIcon}>
                Нет обращений
              </EmptyBlock>
            ) : (
              data.inquiries.map((inquiry) => (
                <div key={inquiry.id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={styles.userInfo}>
                      <EnvelopeIcon className={styles.userIcon} />
                      <span className={styles.userEmail}>
                        {inquiry.userEmail}
                      </span>
                    </div>
                    <div className={styles.date}>
                      <CalendarIcon className={styles.dateIcon} />
                      <span>
                        {format(
                          new Date(inquiry.createdAt),
                          "dd MMM yyyy, HH:mm",
                          {
                            locale: ru,
                          }
                        )}
                      </span>
                    </div>
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.message}>
                      <ChatBubbleLeftRightIcon className={styles.messageIcon} />
                      <p>{inquiry.message}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <Pagination
            currentPage={pagination.page}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </Block>
    </div>
  );
}
