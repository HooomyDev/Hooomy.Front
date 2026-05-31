import React, { useState } from "react";
import styles from "./EmployeeWorks.module.css";
import PageHeader from "../../common/PageHeader/PageHeader";
import {
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  WrenchScrewdriverIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Block from "../../common/Block/Block";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../../common/Button/Button";
import InputField from "../../common/InputField/InputField";
import SelectField from "../../common/SelectField/SelectField";
import AutocompleteField from "../../common/AutocompleteField/AutocompleteField";
import { apiClient as client } from "../../api/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../common/Loader/Loader";
import {
  deleteWork,
  getWorksForEmployee,
  updateWork,
  createWork,
} from "../../api/services/workService";
import { format } from "date-fns";
import { ru, enUS } from "date-fns/locale";
import {
  CalendarIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  MapPinIcon,
  TagIcon,
} from "@heroicons/react/24/solid";
import Pagination from "../../common/Pagination/Pagination";
import ConfirmDialog from "../../common/ConfirmDialog/ConfirmDialog";
import EditWorkModal from "./components/EditWorkModal";
import { useAuthStore } from "../../stores/authStore";
import { createWorkNotification } from "../../api/services/notificationService";
import { categoryMap } from "../../stores/categories";
import EmptyBlock from "../../common/EmptyBlock/EmptyBlock";
import { useT } from "../../utils/useT";

export default function EmployeeWorks() {
  const t = useT();
  const queryClient = useQueryClient();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [streetOptions, setStreetOptions] = useState([]);
  const methods = useForm({
    defaultValues: {
      category: 0,
      seriosness: 0,
      searchTitle: "",
      address: "",
    },
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5,
  });
  const [filters, setFilters] = useState({
    category: 0,
    seriosness: 0,
    searchTitle: "",
    address: "",
  });
  const { user } = useAuthStore();

  const seriosnessMap = [
    { value: 0, label: t("seriousnessOptions.all") },
    { value: 1, label: t("seriousnessOptions.informational") },
    { value: 2, label: t("seriousnessOptions.warning") },
  ];

  const { data, isLoading } = useQuery({
    queryKey: [
      "works",
      pagination.page,
      pagination.pageSize,
      filters.address,
      filters.category,
      filters.searchTitle,
      filters.seriosness,
      user?.companyId,
    ],
    queryFn: () =>
      getWorksForEmployee(
        filters.address,
        filters.category,
        filters.seriosness,
        filters.searchTitle,
        pagination.page,
        pagination.pageSize,
        user?.companyId,
      ),
    staleTime: 0,
  });

  const deleteMutation = useMutation({
    mutationKey: ["deleteWork"],
    mutationFn: async ({ id }) => await deleteWork(id),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [
          "works",
          pagination.page,
          pagination.pageSize,
          filters.address,
          filters.category,
          filters.searchTitle,
          filters.seriosness,
        ],
      }),
  });

  const updateWorkMutation = useMutation({
    mutationFn: (workData) => updateWork(workData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "works",
          pagination.page,
          pagination.pageSize,
          filters.address,
          filters.category,
          filters.searchTitle,
          filters.seriosness,
        ],
      });
      setIsEditModalOpen(false);
      setSelectedWork(null);
    },
  });

  const createWorkMutation = useMutation({
    mutationFn: (workData) => createWork(workData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "works",
          pagination.page,
          pagination.pageSize,
          filters.address,
          filters.category,
          filters.searchTitle,
          filters.seriosness,
        ],
      });
      setIsCreateModalOpen(false);
      setSelectedWork(null);
    },
  });

  const notificationMutation = useMutation({
    mutationFn: ({ workId, text }) => createWorkNotification(workId, text),
  });

  const handleSaveWork = (updatedWork) => {
    updateWorkMutation.mutate(updatedWork);
    const text = `Для плановой работы "${updatedWork.title}" изменены данные.`;
    notificationMutation.mutate({ workId: updatedWork.id, text });
  };

  const handleCreateWork = async (newWork) => {
    var workId = await createWorkMutation.mutateAsync(newWork);
    const text = `Создана новая плановая работа "${newWork.title}".`;
    notificationMutation.mutate({ workId: workId, text });
  };

  const handleSearch = () => {
    const formValues = methods.getValues();
    setFilters({
      searchTitle: formValues.searchTitle || "",
      category: formValues.category || "",
      seriosness: formValues.seriosness || "",
      address: formValues.address || "",
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStreetSearch = async (query) => {
    if (!query) {
      setStreetOptions([]);
      return;
    }

    try {
      const res = await client.get(
        `/addresses?searchQuery=${encodeURIComponent(query)}`,
      );
      const options = res.data.addresses.map((s) => ({
        value: s.id,
        label: `${s.street}, ${s.houseNumber}`,
      }));
      setStreetOptions(options);
    } catch (error) {
      console.error("Street search failed:", error);
      setStreetOptions([]);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className={styles.wrapper}>
      {/* 🔹 Заголовок страницы */}
      <PageHeader icon={Cog6ToothIcon} title={t("pageTitle")} />

      <Block>
        <form
          className={styles.searchBlock}
          onSubmit={methods.handleSubmit(handleSearch)}
        >
          <FormProvider {...methods}>
            <InputField
              name="searchTitle"
              label={t("filters.titleLabel")}
              placeholder={t("filters.titlePlaceholder")}
            />
            <SelectField
              name="category"
              label={t("filters.categoryLabel")}
              options={Object.entries(categoryMap).map(([code, key]) => {
                const categoryCode = Number(code);
                return {
                  value: categoryCode,
                  label: t(`statistic.categories.${key}`),
                };
              })}
            />
            <SelectField
              name="seriosness"
              label={t("filters.seriousnessLabel")}
              options={seriosnessMap}
            />
            <AutocompleteField
              label={t("filters.addressLabel")}
              placeholder={t("filters.titleLabel")}
              name="address"
              options={streetOptions}
              onSearch={handleStreetSearch}
            />
            <div className={styles.actionButtons}>
              <Button
                className={styles.searchButton}
                onClick={() => {
                  setPagination({ page: 1, pageSize: 5 });
                  setFilters({
                    category: 0,
                    seriosness: 0,
                    searchTitle: "",
                    address: "",
                  });
                  methods.reset();
                }}
                variant="secondary"
                type="submit"
                aria-label={t("actions.reset")}
              >
                <XMarkIcon className={styles.icon} />
              </Button>
              <Button
                className={styles.searchButton}
                onClick={() => handleSearch()}
                variant="secondary"
                type="submit"
                aria-label={t("actions.search")}
              >
                <MagnifyingGlassIcon className={styles.icon} />
              </Button>
              <Button
                className={styles.searchButton}
                variant="secondary"
                type="button"
                onClick={() => setIsCreateModalOpen(true)}
                aria-label={t("actions.create")}
              >
                <PlusIcon className={styles.icon} />
              </Button>
            </div>
          </FormProvider>
        </form>
      </Block>

      <Block>
        <div className={styles.content}>
          {data?.works.length === 0 ? (
            <EmptyBlock Icon={WrenchScrewdriverIcon}>
              {t("emptyState")}
            </EmptyBlock>
          ) : (
            <div className={styles.worksList}>
              {data?.works?.map((work) => (
                <div key={work.id} className={styles.workCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.info}>
                      <h3 className={styles.title}>{work.title}</h3>
                      <span
                        className={`${styles.seriousness} ${
                          work.seriousness === 1
                            ? styles.seriousnessInfo
                            : styles.seriousnessWarn
                        }`}
                      >
                        {work.seriousness === 1 ? (
                          <InformationCircleIcon
                            className={styles.seriousnessIcon}
                          />
                        ) : (
                          <ExclamationCircleIcon
                            className={styles.seriousnessIcon}
                          />
                        )}
                        {work.seriousness === 1
                          ? t("seriousnessLabels.info")
                          : t("seriousnessLabels.warn")}
                      </span>
                    </div>
                    <div className={styles.actions}>
                      <button
                        className={`${styles.actionButton} ${styles.editButton}`}
                        onClick={() => {
                          setSelectedWork(work);
                          setIsEditModalOpen(true);
                        }}
                        aria-label={t("actions.edit")}
                      >
                        <PencilIcon className={styles.actionIcon} />
                      </button>
                      <button
                        className={`${styles.actionButton} ${styles.trashButton}`}
                        onClick={() => {
                          setSelectedWork(work);
                          setIsDeleteOpen(true);
                        }}
                        aria-label={t("actions.deleteTitle")}
                      >
                        <TrashIcon className={styles.actionIcon} />
                      </button>
                    </div>
                  </div>

                  <p className={styles.description}>{work.description}</p>

                  <div className={styles.details}>
                    <div className={styles.detailItem}>
                      <MapPinIcon className={styles.detailIcon} />
                      <span>{work.address}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <TagIcon className={styles.detailIcon} />
                      <span>
                        {t(
                          `statistic.categories.${categoryMap[work.category]}`,
                        )}
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <CalendarIcon className={styles.detailIcon} />
                      <span>
                        {format(
                          new Date(work.plannedStartTime),
                          "dd MMM yyyy HH:mm",
                          {
                            locale:
                              t.lang === "ru" || t.lang === "by" ? ru : enUS,
                          },
                        )}{" "}
                        -{" "}
                        {format(
                          new Date(work.plannedEndTime),
                          "dd MMM yyyy HH:mm",
                          {
                            locale:
                              t.lang === "ru" || t.lang === "by" ? ru : enUS,
                          },
                        )}
                      </span>
                    </div>
                  </div>

                  {work.factStartTime && (
                    <div className={styles.factDates}>
                      <div className={styles.detailItem}>
                        <span className={styles.factLabel}>
                          {t("factDates.startLabel")}
                        </span>
                        <span>
                          {format(
                            new Date(work.factStartTime),
                            "dd MMM yyyy, HH:mm",
                            {
                              locale:
                                t.lang === "ru" || t.lang === "by" ? ru : enUS,
                            },
                          )}
                        </span>
                      </div>
                      {work.factEndTime && (
                        <div className={styles.detailItem}>
                          <span className={styles.factLabel}>
                            {t("factDates.endLabel")}
                          </span>
                          <span>
                            {format(
                              new Date(work.factEndTime),
                              "dd MMM yyyy, HH:mm",
                              {
                                locale:
                                  t.lang === "ru" || t.lang === "by"
                                    ? ru
                                    : enUS,
                              },
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <Pagination
          totalPages={data?.totalPages || 0}
          onPageChange={handlePageChange}
          currentPage={pagination.page}
        />

        <ConfirmDialog
          isOpen={isDeleteOpen}
          onClose={() => {
            setIsDeleteOpen(false);
            setSelectedWork(null);
          }}
          onConfirm={() => {
            deleteMutation.mutate({ id: selectedWork.id });
            setIsDeleteOpen(false);
            setSelectedWork(null);
          }}
          title={t("actions.deleteTitle")}
          message={t("actions.deleteMessage")}
          confirmText={t("common.deleteConfirm")}
          cancelText={t("common.cancel")}
          confirmVariant="danger"
        />

        <EditWorkModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedWork(null);
          }}
          work={selectedWork}
          onSave={handleSaveWork}
          categories={categoryMap}
          streetOptions={streetOptions}
          onSearchStreets={handleStreetSearch}
        />
        <EditWorkModal
          isOpen={isCreateModalOpen}
          onClose={() => {
            setIsCreateModalOpen(false);
          }}
          work={null}
          onSave={handleCreateWork}
          categories={categoryMap}
          streetOptions={streetOptions}
          onSearchStreets={handleStreetSearch}
        />
      </Block>
    </div>
  );
}
