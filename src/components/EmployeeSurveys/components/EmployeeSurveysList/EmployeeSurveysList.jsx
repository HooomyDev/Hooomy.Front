import { useEffect, useState } from "react";
import styles from "./EmployeeSurveysList.module.css";
import {
  DocumentTextIcon,
  ChartBarIcon,
  UsersIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import EmployeeSurveysStat from "../EmployeeSurveysStat/EmployeeSurveysStat";
import Loader from "../../../../common/Loader/Loader";
import Button from "../../../../common/Button/Button";
import Pagination from "../../../../common/Pagination/Pagination";
import { useT } from "../../../../utils/useT";
import {
  deleteSurvay,
  getSurvayDetails,
  getSurvays,
  updateSurvay,
} from "../../../../api/services/survaceService";
import Notification from "../../../../common/Notification/Notification";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../../../../common/InputField/InputField";
import SelectField from "../../../../common/SelectField/SelectField";
import { useAuthStore } from "../../../../stores/authStore";
import ConfirmDialog from "../../../../common/ConfirmDialog/ConfirmDialog";
import EditSurveyModal from "./EditSurveyModal";
import EmptyBlock from "../../../../common/EmptyBlock/EmptyBlock";

export default function EmployeeSurveysList() {
  const { user } = useAuthStore();
  const t = useT();
  const [sort, setSort] = useState("asc");
  const [selectedSurvayId, setSelectedSurvayId] = useState(null);
  const [selectedSurvay, setSelectedSurvay] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5,
    status: 0,
    title: "",
    type: 0,
  });
  const queryClient = useQueryClient();

  const [expandedId, setExpandedId] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    surveyId: null,
  });

  const [editModal, setEditModal] = useState({
    isOpen: false,
  });

  const toggleExpand = (id) => {
    setSelectedSurvayId(id);
    setExpandedId(expandedId === id ? null : id);
  };

  const [notification, setNotification] = useState(null);

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      "surveys",
      pagination.page,
      pagination.pageSize,
      pagination.status,
      pagination.type,
      pagination.title,
      user?.companyId,
    ],
    queryFn: async () => {
      const result = await getSurvays(
        pagination.page,
        pagination.pageSize,
        pagination.status,
        pagination.type,
        pagination.title,
        user?.companyId,
      );
      return result;
    },
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });

  const { data: survay, isSurvayLoading } = useQuery({
    queryKey: ["survey", selectedSurvayId],
    queryFn: () => getSurvayDetails(selectedSurvayId),
    enabled: !!selectedSurvayId,
  });

  const deleteSurvayMutation = useMutation({
    mutationKey: ["deleteSurvayMutation"],
    mutationFn: (id) => deleteSurvay(id),
    onSuccess: () => {
      setNotification({
        type: "success",
        message: t("employeeSurveysList.notifications.deleteSuccess"),
      });
      queryClient.invalidateQueries({
        queryKey: [
          "surveys",
          pagination.page,
          pagination.pageSize,
          pagination.status,
          pagination.type,
          pagination.title,
          user?.companyId,
        ],
      });
      setTimeout(() => {}, 1500);
    },
  });

  const updateSurvayMutation = useMutation({
    mutationKey: ["updateSurvayMutation"],
    mutationFn: ({ id, data }) => updateSurvay(id, data),
    onSuccess: () => {
      setNotification({
        type: "success",
        message: t("employeeSurveysList.notifications.updateSuccess"),
      });
      setEditModal({ isOpen: false, surveyId: null });
      queryClient.invalidateQueries({
        queryKey: ["surveys"],
      });
    },
    onError: () => {
      setNotification({
        type: "error",
        message: t("employeeSurveysList.notifications.updateError"),
      });
    },
  });

  useEffect(() => {
    if (isError) {
      setNotification({
        type: "error",
        message: t("employeeSurveysList.notifications.loadError"),
      });
    }
  }, [isError, setNotification, t]);

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPollType = (type) => {
    switch (type) {
      case 1:
        return {
          label: t("employeeSurveysList.controls.typeOptions.single"),
          icon: <ChartBarIcon className={styles.voteIcon} />,
        };
      case 2:
        return {
          label: t("employeeSurveysList.controls.typeOptions.multiple"),
          icon: <DocumentTextIcon className={styles.voteIcon} />,
        };
      default:
        return {
          label: "Неизвестный",
          icon: <DocumentTextIcon className={styles.voteIcon} />,
        };
    }
  };

  const getPollStatus = (status, isActive) => {
    if (status === 1)
      return {
        label: t("employeeSurveysList.controls.statusOptions.active"),
        className: styles.active,
      };
    if (status === 2)
      return {
        label: t("employeeSurveysList.controls.statusOptions.completed"),
        className: styles.completed,
      };
    if (status === 3)
      return {
        label: t("employeeSurveysList.controls.statusOptions.archived"),
        className: styles.draft,
      };
    return { label: "Неизвестно", className: styles.draft };
  };

  const methods = useForm({
    defaultValues: {
      searchTitle: "",
      searchStatus: 0,
      searchType: 0,
    },
  });

  const handleSearch = (data) => {
    setPagination((prev) => ({
      ...prev,
      page: 1,
      title: data?.searchTitle || "",
      status: data?.searchStatus || 1,
      type: data?.searchType || 0,
    }));
    setExpandedId(null);
    setSelectedSurvayId(null);
  };

  const handleDeleteClick = (id) => {
    setConfirmDialog({ isOpen: true, surveyId: id });
  };

  const handleConfirmDelete = () => {
    if (confirmDialog.surveyId) {
      deleteSurvayMutation.mutate(confirmDialog.surveyId);
    }
    setConfirmDialog({ isOpen: false, surveyId: null });
  };

  const handleCancelDelete = () => {
    setConfirmDialog({ isOpen: false, surveyId: null });
  };

  const handleEditClick = (survey) => {
    setEditModal({ isOpen: true, survey: survey });
    setSelectedSurvay(survey);
  };

  const handleCloseEditModal = () => {
    setEditModal({ isOpen: false, surveyId: null });
    setSelectedSurvay(null);
  };

  const handleConfirmEdit = (data) => {
    if (editModal.surveyId) {
      updateSurvayMutation.mutate({ id: editModal.surveyId, data });
    }
  };

  const handleToggleSort = () => {
    setSort(sort === "asc" ? "desc" : "asc");
  };

  const sortedSurveys = [...(response?.polls || [])].sort((a, b) => {
    if (sort === "asc") {
      return a.title.localeCompare(b.title, "ru");
    } else {
      return b.title.localeCompare(a.title, "ru");
    }
  });

  if (isLoading) return <Loader />;

  return (
    <div className={styles.listWrapper}>
      {notification && (
        <Notification
          duration={3000}
          onClose={() => setNotification(null)}
          type={notification.type}
        >
          <div>{notification.message}</div>
        </Notification>
      )}

      <FormProvider {...methods}>
        <form
          className={styles.search}
          onSubmit={methods.handleSubmit(handleSearch)}
        >
          <InputField
            name="searchTitle"
            label={t("employeeSurveysList.controls.searchLabel")}
            placeholder={t("employeeSurveysList.controls.searchPlaceholder")}
          />
          <SelectField
            name="searchType"
            label={t("employeeSurveysList.controls.typeLabel")}
            options={[
              {
                value: 0,
                label: t("employeeSurveysList.controls.typeOptions.all"),
              },
              {
                value: 1,
                label: t("employeeSurveysList.controls.typeOptions.single"),
              },
              {
                value: 2,
                label: t("employeeSurveysList.controls.typeOptions.multiple"),
              },
            ]}
          />
          <SelectField
            name="searchStatus"
            label={t("employeeSurveysList.controls.statusLabel")}
            options={[
              {
                value: 0,
                label: t("employeeSurveysList.controls.statusOptions.all"),
              },
              {
                value: 1,
                label: t("employeeSurveysList.controls.statusOptions.active"),
              },
              {
                value: 2,
                label: t(
                  "employeeSurveysList.controls.statusOptions.completed",
                ),
              },
              {
                value: 3,
                label: t("employeeSurveysList.controls.statusOptions.archived"),
              },
            ]}
          />
          <Button
            className={styles.searchButton}
            onClick={() => {
              setPagination({
                page: 1,
                pageSize: 5,
                status: 0,
                title: "",
                type: 0,
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
            onClick={() => handleToggleSort()}
            variant="secondary"
            type="button"
          >
            {sort === "asc" ? (
              <ChevronDownIcon className={styles.icon} />
            ) : (
              <ChevronUpIcon className={styles.icon} />
            )}
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

      {response.polls.length === 0 ? (
        <EmptyBlock Icon={DocumentTextIcon}>
          <p>{t("employeeSurveysList.empty")}</p>
        </EmptyBlock>
      ) : (
        sortedSurveys.map((survey) => {
          const pollType = getPollType(survey.type);
          const pollStatus = getPollStatus(survey.status, survey.isActive);

          return (
            <div key={survey.id} className={styles.listItem}>
              <div className={styles.itemHeader}>
                <div className={styles.itemTitle}>
                  <h3>{survey.title}</h3>
                  <div className={styles.headerActions}>
                    <span
                      className={`${styles.status} ${pollStatus.className}`}
                    >
                      {pollStatus.label}
                    </span>
                    <Button
                      className={styles.voteButton}
                      onClick={() => toggleExpand(survey.id)}
                    >
                      {selectedSurvayId === survey.id ? (
                        !expandedId ? (
                          <EyeIcon className={styles.btnIcon} />
                        ) : (
                          <EyeSlashIcon className={styles.btnIcon} />
                        )
                      ) : (
                        <EyeIcon className={styles.btnIcon} />
                      )}
                    </Button>
                    <Button
                      className={styles.editBtn}
                      title="Изменить"
                      onClick={() => handleEditClick(survey)}
                    >
                      <PencilIcon className={styles.btnIcon} />
                    </Button>
                    <Button
                      className={styles.deleteBtn}
                      onClick={() => handleDeleteClick(survey.id)}
                    >
                      <TrashIcon className={styles.btnIcon} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Компания и тип */}
              <div className={styles.infoGrid}>
                <div className={styles.infoCard}>
                  <UsersIcon className={styles.infoIcon} />
                  <div>
                    <div className={styles.infoLabel}>
                      {t("employeeHome.companyDefault")}
                    </div>
                    <div className={styles.infoValue}>{survey.companyName}</div>
                  </div>
                </div>
                <div className={styles.infoCard}>
                  <DocumentTextIcon className={styles.infoIcon} />
                  <div>
                    <div className={styles.infoLabel}>
                      {t("employeeSurveysList.controls.typeLabel")}
                    </div>
                    <div className={styles.infoValue}>{pollType.label}</div>
                  </div>
                </div>
                <div className={styles.infoCard}>
                  <ChartBarIcon className={styles.infoIcon} />
                  <div>
                    <div className={styles.infoLabel}>
                      {t("employeeSurveysList.allVotes")}
                    </div>
                    <div className={styles.infoValue}>{survey.voteCount}</div>
                  </div>
                </div>
              </div>

              {isSurvayLoading ? (
                <Loader />
              ) : (
                <div
                  className={`${styles.itemContent} ${
                    expandedId === survey.id ? styles.expanded : ""
                  }`}
                >
                  {selectedSurvayId === survey.id && (
                    <EmployeeSurveysStat survey={survay} />
                  )}
                </div>
              )}
            </div>
          );
        })
      )}
      <Pagination
        currentPage={pagination.page}
        totalPages={response.totalPages}
        onPageChange={handlePageChange}
      />
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title={t("common.title")}
        message={t("employeeSurveysList.deleteText")}
        confirmText={t("adminComments.actions.delete")}
        cancelText={t("common.cancel")}
        confirmVariant="danger"
      />
      <EditSurveyModal
        isOpen={editModal.isOpen}
        onClose={handleCloseEditModal}
        onConfirm={handleConfirmEdit}
        survey={selectedSurvay}
        isLoading={updateSurvayMutation.isPending}
      />
    </div>
  );
}
