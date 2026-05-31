import React, { useState } from "react";
import styles from "./EmployeeRequests.module.css";
import PageHeader from "../../common/PageHeader/PageHeader";
import {
  ClipboardDocumentListIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import EmployeeRequestsTable from "../EmployeeRequestsTable/EmployeeRequestsTable";
import RequestDetailsModal from "../../features/modals/RequestDetailsModal/RequestDetailsModal";
import Modal from "../../features/modals/Modal/Modal";
import { useT } from "../../utils/useT";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getRequestsForAdmin,
  updateRequest,
} from "../../api/services/requestService";
import Loader from "../../common/Loader/Loader";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../../common/InputField/InputField";
import SelectField from "../../common/SelectField/SelectField";
import Button from "../../common/Button/Button";
import { useAuthStore } from "../../stores/authStore";
import Pagination from "../../common/Pagination/Pagination";
import EmptyBlock from "../../common/EmptyBlock/EmptyBlock";
import { createRequestNotification } from "../../api/services/notificationService";
import { categoryMap } from "../../stores/categories";

export default function EmployeeRequests() {
  const t = useT();
  const queryClient = useQueryClient();
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Загрузка заявок с сервера
  const { user } = useAuthStore();
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5,
  });
  const [filters, setFilters] = useState({
    searchTitle: "",
    searchStatus: "",
    searchCategory: "",
  });

  const { data: response, isLoading } = useQuery({
    queryKey: [
      "requests",
      pagination.page,
      pagination.pageSize,
      filters.searchTitle,
      filters.searchStatus,
      filters.searchCategory,
      user?.companyId,
    ],
    queryFn: async () => {
      return await getRequestsForAdmin(
        pagination.page,
        pagination.pageSize,
        filters.searchTitle,
        filters.searchStatus,
        filters.searchCategory,
        user?.companyId,
      );
    },
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });

  const methods = useForm({
    defaultValues: {
      searchTitle: "",
      searchStatus: "",
      searchCategory: "",
    },
  });

  const statusOptions = [
    { value: "", label: t("employeeRequests.status.all") },
    { value: 2, label: t("employeeRequests.status.new") },
    { value: 3, label: t("employeeRequests.status.inProgress") },
    { value: 4, label: t("employeeRequests.status.completed") },
    { value: 5, label: t("employeeRequests.status.rejected") },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 2:
        return "#1976d2";
      case 3:
        return "#d32f2f";
      case 4:
        return "#f57c00";
      case 5:
        return "#388e3c";
      default:
        return "#999";
    }
  };

  const statusMap = {
    2: t("employeeRequests.status.new"),
    3: t("employeeRequests.status.rejected"),
    4: t("employeeRequests.status.inProgress"),
    5: t("employeeRequests.status.completed"),
  };
  // Мутация для изменения статуса
  const statusMutation = useMutation({
    mutationFn: (request) => updateRequest(request),
    onSuccess: (data, request) => {
      queryClient.invalidateQueries({
        queryKey: [
          "requests",
          pagination.page,
          pagination.pageSize,
          filters.searchTitle,
          filters.searchStatus,
          filters.searchCategory,
          user?.companyId,
        ],
      });
    },
  });

  // Мутация для отправки уведомления отдельно
  const notificationMutation = useMutation({
    mutationFn: ({ requestId, text }) =>
      createRequestNotification(requestId, text),
  });

  const handleStatusChange = (request) => {
    statusMutation.mutate(request);
    const text = `Для заявки "${request.title}" изменён статус на "${statusMap[request.status]}"`;
    notificationMutation.mutate({ requestId: request.id, text });
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
  };

  const handleSearch = () => {
    const formValues = methods.getValues();
    setFilters({
      searchTitle: formValues.searchTitle || "",
      searchStatus: formValues.searchStatus || "",
      searchCategory: formValues.searchCategory || "",
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.wrapper}>
      <PageHeader
        title={t("employeeRequests.header")}
        icon={ClipboardDocumentListIcon}
      />

      <div className={styles.container}>
        <FormProvider {...methods}>
          <form className={styles.controls}>
            <InputField
              label={t("employeeRequestsControls.searchLabel")}
              name="searchTitle"
              type="text"
              placeholder={t("employeeRequestsControls.searchPlaceholder")}
            />

            <SelectField
              name="searchCategory"
              label={t("employeeRequestsControls.categoryLabel")}
              options={Object.entries(categoryMap).map(([code, key]) => {
                const categoryCode = Number(code);
                return {
                  value: categoryCode,
                  label: t(`statistic.categories.${key}`),
                };
              })}
              required={false}
              onValueChange={() => {}}
            />

            <SelectField
              label={t("employeeRequestsControls.statusLabel")}
              name="searchStatus"
              options={statusOptions}
            />
            <Button
              className={styles.searchButton}
              onClick={() => {
                setPagination({ page: 1, pageSize: 5 });
                setFilters({
                  searchTitle: "",
                  searchStatus: "",
                  searchCategory: "",
                });
                methods.reset();
              }}
              variant="secondary"
              type="submit"
            >
              <XMarkIcon className={styles.icon} />
            </Button>
            <Button
              className={styles.searchButton}
              onClick={() => handleSearch()}
              variant="secondary"
              type="submit"
            >
              <MagnifyingGlassIcon className={styles.icon} />
            </Button>
          </form>
        </FormProvider>

        {response?.requests?.length > 0 ? (
          <>
            <EmployeeRequestsTable
              requests={response.requests}
              onSelectRequest={setSelectedRequest}
              onStatusChange={handleStatusChange}
              getStatusColor={getStatusColor}
            />
          </>
        ) : (
          <EmptyBlock>
            <p>{t("employeeRequests.empty")}</p>
          </EmptyBlock>
        )}

        <Pagination
          currentPage={pagination.page}
          totalPages={response.totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <Modal isOpen={!!selectedRequest} onClose={handleCloseModal}>
        <RequestDetailsModal
          request={selectedRequest}
          onClose={handleCloseModal}
        />
      </Modal>
    </div>
  );
}
