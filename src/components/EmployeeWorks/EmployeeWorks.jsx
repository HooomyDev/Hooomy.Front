import React, { useState } from "react";
import styles from "./EmployeeWorks.module.css";
import PageHeader from "../../common/PageHeader/PageHeader";
import {
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import Block from "../../common/Block/Block";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../../common/Button/Button";
import InputField from "../../common/InputField/InputField";
import SelectField from "../../common/SelectField/SelectField";
import AutocompleteField from "../../common/AutocompleteField/AutocompleteField";
import { apiClient as client } from "../../api/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRequestCategories } from "../../api/services/requestService";
import Loader from "../../common/Loader/Loader";
import {
  deleteWork,
  getWorksForEmployee,
  updateWork,
  createWork,
} from "../../api/services/workService";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
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
  12: "Другое",
  13: "Техническое обслуживание лифта",
  14: "Обращение с ТКО",
  15: "Водоснабжение. Холодная вода",
  16: "Канализация",
  17: "Автомобильные дороги, тротуары",
  18: "Кровельные работы",
  19: "Уличное освещение",
  20: "Общественные места (Парки, скверы)",
  21: "Работы по ремонту стыков",
  22: "Техническое обслуживание зданий и сооружений",
  23: "Рекламные и информационные конструкции и объявления",
};

export default function EmployeeWorks() {
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
    { value: 0, label: "Все" },
    { value: 1, label: "Информационные" },
    { value: 2, label: "Предупреждения" },
  ];

  const { data: requestCategories } = useQuery({
    queryKey: ["requestCategories"],
    queryFn: () => getRequestCategories(),
  });

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
      <PageHeader icon={Cog6ToothIcon} title="Плановые работы" />
      <Block>
        <form
          className={styles.searchBlock}
          onSubmit={methods.handleSubmit(handleSearch)}
        >
          <FormProvider {...methods}>
            <InputField
              name="searchTitle"
              label="Название"
              placeholder="Введите что-нибудь..."
            />
            <SelectField
              name="category"
              label="Категория"
              options={
                requestCategories?.map((c) => ({
                  value: c.code,
                  label: c.name,
                })) || []
              }
            />
            <SelectField
              name="seriosness"
              label="Серьёзность"
              options={seriosnessMap}
            />
            <AutocompleteField
              label="Адрес"
              name="address"
              options={streetOptions}
              onSearch={handleStreetSearch}
            />
            <Button
              className={styles.searchButton}
              onClick={() => handleSearch()}
              variant="secondary"
              type="submit"
            >
              <MagnifyingGlassIcon className={styles.icon} />
            </Button>
            <Button
              className={styles.searchButton}
              variant="secondary"
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <PlusIcon className={styles.icon} />
            </Button>
          </FormProvider>
        </form>
      </Block>

      <Block>
        <div className={styles.content}>
          <div className={styles.worksList}>
            {data?.works?.map((work, index) => (
              <>
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
                        {work.seriousness === 1 ? "Информация" : "Важно"}
                      </span>
                    </div>
                    <div className={styles.actions}>
                      <button
                        className={`${styles.actionButton} ${styles.editButton}`}
                        onClick={() => {
                          setSelectedWork(work);
                          setIsEditModalOpen(true);
                        }}
                      >
                        <PencilIcon className={styles.actionIcon} />
                      </button>

                      <button
                        className={`${styles.actionButton} ${styles.trashButton}`}
                        onClick={() => {
                          setSelectedWork(work);
                          setIsDeleteOpen(true);
                        }}
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
                      <span>{categoryMap[work.category] || "Другое"}</span>
                    </div>

                    <div className={styles.detailItem}>
                      <CalendarIcon className={styles.detailIcon} />
                      <span>
                        {format(
                          new Date(work.plannedStartTime),
                          "dd MMM yyyy HH:mm",
                          {
                            locale: ru,
                          },
                        )}{" "}
                        -{" "}
                        {format(
                          new Date(work.plannedEndTime),
                          "dd MMM yyyy HH:mm",
                          {
                            locale: ru,
                          },
                        )}
                      </span>
                    </div>
                  </div>

                  {work.factStartTime && (
                    <div className={styles.factDates}>
                      <div className={styles.detailItem}>
                        <span className={styles.factLabel}>
                          Фактическое начало:
                        </span>
                        <span>
                          {format(
                            new Date(work.factStartTime),
                            "dd MMM yyyy, HH:mm",
                            {
                              locale: ru,
                            },
                          )}
                        </span>
                      </div>
                      {work.factEndTime && (
                        <div className={styles.detailItem}>
                          <span className={styles.factLabel}>
                            Фактическое окончание:
                          </span>
                          <span>
                            {format(
                              new Date(work.factEndTime),
                              "dd MMM yyyy, HH:mm",
                              {
                                locale: ru,
                              },
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            ))}
          </div>
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
          title="Удалить"
          message={`Вы уверены, что хотите удалить? Это действие необратимо.`}
          confirmText="Удалить"
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
          categories={requestCategories}
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
          categories={requestCategories}
          streetOptions={streetOptions}
          onSearchStreets={handleStreetSearch}
        />
      </Block>
    </div>
  );
}
