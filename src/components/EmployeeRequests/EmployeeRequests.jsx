import React, { useState } from "react";
import styles from "./EmployeeRequests.module.css";
import PageHeader from "../../common/PageHeader/PageHeader";
import {
  ClipboardDocumentListIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import EmployeeRequestsTable from "../EmployeeRequestsTable/EmployeeRequestsTable";
import RequestDetailsModal from "../../features/modals/RequestDetailsModal/RequestDetailsModal";
import Modal from "../../features/modals/Modal/Modal";
import { useT } from "../../utils/useT";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getRequestCategories,
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

export default function EmployeeRequests() {
  const t = useT();
  const queryClient = useQueryClient();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [categories, setCategories] = useState([]);

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
      const categoriesData = await getRequestCategories();
      setCategories(categoriesData);

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
    { value: 0, label: "Все статусы" },
    { value: 2, label: "Новая" },
    { value: 3, label: "В работе" },
    { value: 4, label: "Завершена" },
    { value: 5, label: "Отклонена" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 2:
        return "#1976d2";
      case 3:
        return "#f57c00";
      case 4:
        return "#388e3c";
      case 5:
        return "#d32f2f";
      default:
        return "#999";
    }
  };

  const statusMap = {
    2: "Новая",
    3: "В работе",
    4: "Завершена",
    5: "Отклонена",
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
              label="Поиск"
              name="searchTitle"
              type="text"
              placeholder={t("employeeRequestsControls.searchPlaceholder")}
            />

            <SelectField
              name="searchCategory"
              label="Категория"
              options={categories?.map((category) => {
                return { value: category.code, label: category.name };
              })}
              required={false}
              onValueChange={() => {}}
            />

            <SelectField
              label="Статус"
              name="searchStatus"
              options={statusOptions}
            />

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

        {response.requests?.length > 0 ? (
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
