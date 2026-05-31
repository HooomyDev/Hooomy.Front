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
} from "@heroicons/react/24/solid";
import styles from "./AdminDatabaseRequests.module.css";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "../../common/InputField/InputField";
import SelectField from "../../common/SelectField/SelectField";
import PageHeader from "../../common/PageHeader/PageHeader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../common/Loader/Loader";
import {
  getRequestsForAdmin,
  softDeleteRequest,
  updateRequest,
} from "../../api/services/requestService";
import { createRequestNotification } from "../../api/services/notificationService";
import Pagination from "../../common/Pagination/Pagination";
import EmptyBlock from "../../common/EmptyBlock/EmptyBlock";
import Button from "../../common/Button/Button";
import Modal from "../../features/modals/Modal/Modal";
import RequestDetailsModal from "../../features/modals/RequestDetailsModal/RequestDetailsModal";
import ConfirmDialog from "../../common/ConfirmDialog/ConfirmDialog";
import { categoryMap } from "../../stores/categories";
import { useT } from "../../utils/useT";

export default function AdminDatabaseRequests() {
  const t = useT();
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });
  const [filters, setFilters] = useState({
    searchTitle: "",
    searchStatus: "",
    searchCategory: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const queryClient = useQueryClient();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const statusMap = {
    1: {
      text: t("employeeRequests.status.awaitingReview"),
      className: "statusPending",
    },
    2: { text: t("employeeRequests.status.new"), className: "statusNew" },
    3: {
      text: t("employeeRequests.status.rejected"),
      className: "statusRejected",
    },
    4: {
      text: t("employeeRequests.status.pending"),
      className: "statusInProgress",
    },
    5: {
      text: t("employeeRequests.status.completed"),
      className: "statusCompleted",
    },
  };

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
      return await getRequestsForAdmin(
        pagination.page,
        pagination.pageSize,
        filters.searchTitle,
        filters.searchStatus,
        filters.searchCategory,
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
    { value: 0, label: t("employeeRequests.status.all") },
    { value: 1, label: t("employeeRequests.status.awaitingReview") },
    { value: 2, label: t("employeeRequests.status.new") },
    { value: 3, label: t("employeeRequests.status.rejected") },
    { value: 4, label: t("employeeRequests.status.pending") },
    { value: 5, label: t("employeeRequests.status.completed") },
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
    onSuccess: (data, request) => {
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

  const notificationMutation = useMutation({
    mutationFn: ({ requestId, text }) =>
      createRequestNotification(requestId, text),
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
      <PageHeader
        icon={ClipboardDocumentListIcon}
        title={t("employeeRequests.header")}
      />
      <div className={styles.content}>
        <Block>
          <form
            className={styles.searchBlock}
            onSubmit={methods.handleSubmit(handleSearch)}
          >
            <FormProvider {...methods}>
              <InputField
                name="searchTitle"
                label={t("common.search")}
                placeholder={t("employeeRequestsControls.searchPlaceholder")}
                required={false}
                rules={{}}
              />

              <SelectField
                name="searchStatus"
                label={t("employeeRequestsTable.headers.status")}
                options={statusOptions}
                required={false}
                onValueChange={() => {}}
              />

              <SelectField
                name="searchCategory"
                label={t("requests.category")}
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
        <Block title={t("requests.list")} Icon={ClipboardDocumentListIcon}>
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
                          {statusMap[request.status]?.text}
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
                            {categoryMap[request.category]}
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
                              onClick={() => {
                                statusMutation.mutate({
                                  ...request,
                                  status: 2,
                                });
                                const text = `Для заявки изменён статус на ${statusMap[2].text}`;
                                notificationMutation.mutate({
                                  requestId: request.id,
                                  text,
                                });
                              }}
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
        title={t("common.title")}
        message={t("common.text1")}
        confirmText={t("common.confirm")}
        cancelText={t("common.cancel")}
        confirmVariant="danger"
      />
    </div>
  );
}
