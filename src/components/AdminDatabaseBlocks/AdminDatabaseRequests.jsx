import React, { useState } from "react";
import Block from "../../common/Block/Block";
import {
  ClipboardDocumentListIcon,
  CubeIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PlayCircleIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import styles from "./AdminDatabaseRequests.module.css";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "../../common/InputField/InputField";
import SelectField from "../../common/SelectField/SelectField";
import PageHeader from "../../common/PageHeader/PageHeader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../common/Loader/Loader";
import {
  getRequestCategories,
  getRequestsForAdmin,
  softDeleteRequest,
  updateRequest,
} from "../../api/services/requestService";
import Pagination from "../../common/Pagination/Pagination";
import EmptyBlock from "../../common/EmptyBlock/EmptyBlock";
import Button from "../../common/Button/Button";
import Modal from "../../features/modals/Modal/Modal";
import RequestDetailsModal from "../../features/modals/RequestDetailsModal/RequestDetailsModal";
import ConfirmDialog from "../../common/ConfirmDialog/ConfirmDialog";

const statusMap = {
  1: { text: "Ожидает проеверки", className: "statusPending" },
  2: { text: "Новая", className: "statusNew" },
  3: { text: "Отклонена", className: "statusRejected" },
  4: { text: "В работе", className: "statusInProgress" },
  5: { text: "Завершена", className: "statusCompleted" },
};

const categoryMap = {
  0: "Все",
  1: "Водоснабжение. Горячая вода",
  2: "Электроснабжение",
  3: "Бытовые услуги",
  4: "Санитарное состояние многоквартирного дома",
  5: "Отопление",
  6: "Благоустройство территории",
  7: "Водоснабжение",
  8: "Общестроительные работы",
  9: "Санитарное состояние территории",
  11: "Техническое обслуживание ЗПУ",
  12: "Техническое обслуживание лифта",
  13: "Обращение с ТКО",
  14: "Водоснабжение. Холодная вода",
  15: "Канализация",
  16: "Автомобильные дороги, тротуары",
  17: "Кровельные работы",
  18: "Уличное освещение",
  19: "Общественные места (Парки, скверы)",
  20: "Работы по ремонту стыков",
  21: "Техническое обслуживание зданий и сооружений",
  22: "Рекламные и информационные конструкции и объявления",
};

export default function AdminDatabaseRequests() {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    searchTitle: "",
    searchStatus: "",
    searchCategory: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const queryClient = useQueryClient();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const { data: response, isLoading } = useQuery({
    queryKey: [
      "requests",
      pagination.page,
      pagination.pageSize,
      filters.searchTitle,
      filters.searchStatus,
      filters.searchCategory,
    ],
    queryFn: async () => {
      const categoriesData = await getRequestCategories();
      setCategories(categoriesData);

      return await getRequestsForAdmin(
        pagination.page,
        pagination.pageSize,
        filters.searchTitle,
        filters.searchStatus,
        filters.searchCategory
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
    { value: 1, label: "Ожидает проверки" },
    { value: 2, label: "Новая" },
    { value: 3, label: "Отклонена" },
    { value: 4, label: "В работе" },
    { value: 5, label: "Завершена" },
  ];

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

  const statusMutation = useMutation({
    mutationFn: (request) => updateRequest(request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "requests",
          pagination.page,
          pagination.pageSize,
          filters.searchTitle,
          filters.searchStatus,
          filters.searchCategory,
        ],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (requestId) => softDeleteRequest(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "requests",
          pagination.page,
          pagination.pageSize,
          filters.searchTitle,
          filters.searchStatus,
          filters.searchCategory,
        ],
      });
    },
  });

  const handleConfirmDelete = () => {
    deleteMutation.mutate(selectedRequest.id);
    setSelectedRequest(null);
    setShowConfirmDialog(false);
  };
  const handleCancelDelete = () => {
    setSelectedRequest(null);
    setShowConfirmDialog(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.wrapper}>
      <PageHeader icon={ClipboardDocumentListIcon} title="Заявки" />
      <div className={styles.content}>
        <Block>
          <form
            className={styles.searchBlock}
            onSubmit={methods.handleSubmit(handleSearch)}
          >
            <FormProvider {...methods}>
              <InputField
                name="searchTitle"
                label="Поиск"
                placeholder="Название заявки"
                required={false}
                rules={{}}
              />

              <SelectField
                name="searchStatus"
                label="Статус"
                options={statusOptions}
                required={false}
                onValueChange={() => {}}
              />

              <SelectField
                name="searchCategory"
                label="Категория"
                options={categories.map((category) => {
                  return { value: category.code, label: category.name };
                })}
                required={false}
                onValueChange={() => {}}
              />
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
        <Block title="Заявки" Icon={ClipboardDocumentListIcon}>
          {response.requests.length === 0 ? (
            <EmptyBlock Icon={ClipboardDocumentListIcon}>
              Заявок не найдено
            </EmptyBlock>
          ) : (
            <>
              <div className={styles.requestsList}>
                {response.requests.map((request) => (
                  <>
                    <div key={request.id} className={styles.requestCard}>
                      <div className={styles.cardHeader}>
                        <h3 className={styles.title}>{request.title}</h3>
                        <span
                          className={`${styles.status} ${
                            styles[statusMap[request.status]?.className]
                          }`}
                        >
                          {statusMap[request.status]?.text || "Неизвестно"}
                        </span>
                      </div>

                      <p className={styles.description}>
                        {request.description}
                      </p>

                      <div className={styles.cardFooter}>
                        <div className={styles.info}>
                          <span className={styles.address}>
                            <MapPinIcon className={styles.icon} />{" "}
                            {request.address}
                          </span>
                          <span className={styles.category}>
                            <CubeIcon className={styles.icon} />{" "}
                            {categoryMap[request.category] || "Другое"}
                          </span>
                        </div>
                        <div className={styles.actions}>
                          <button
                            className={`${styles.detailsButton}`}
                            onClick={() => {
                              setSelectedRequest(request);
                              setIsModalOpen(true);
                            }}
                          >
                            <EyeIcon className={styles.icon} />
                          </button>
                          {request.status === 1 && (
                            <button
                              className={`${styles.detailsButton} ${styles.approveButton}`}
                              onClick={() =>
                                statusMutation.mutate({ ...request, status: 2 })
                              }
                            >
                              <PlayCircleIcon className={styles.actionIcon} />
                            </button>
                          )}
                          <button
                            className={`${styles.detailsButton} ${styles.rejectButton}`}
                            onClick={() => {
                              setSelectedRequest(request);
                              setShowConfirmDialog(true);
                            }}
                          >
                            <TrashIcon className={styles.actionIcon} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <Pagination
                currentPage={pagination.page}
                totalPages={response.totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </Block>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRequest(null);
        }}
      >
        <RequestDetailsModal
          request={selectedRequest}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRequest(null);
          }}
        />
      </Modal>
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Подтверждение удаления"
        message="Вы уверены, что хотите удалить эту заявку? Это действие можно будет отменить."
        confirmText="Удалить"
        cancelText="Отмена"
        confirmVariant="danger"
      />
    </div>
  );
}
