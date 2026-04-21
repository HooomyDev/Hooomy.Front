import React, { useEffect, useState } from "react";
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { useForm, FormProvider } from "react-hook-form";
import styles from "./AdminComplaints.module.css";
import PageHeader from "../../common/PageHeader/PageHeader";
import Block from "../../common/Block/Block";
import Loader from "../../common/Loader/Loader";
import EmptyBlock from "../../common/EmptyBlock/EmptyBlock";
import InputField from "../../common/InputField/InputField";
import SelectField from "../../common/SelectField/SelectField";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getComplaints,
  updateComplaintStatus,
} from "../../api/services/complaintService";
import { COMPLAINT_TYPES } from "../../features/modals/CreateComplaintModal/CreateComplaintModal";

const STATUS_MAP = {
  0: { label: "Неизвестно", style: styles.statusUnknown },
  1: { label: "Принята", style: styles.statusAccepted },
  2: { label: "На рассмотрении", style: styles.statusOnReview },
  3: { label: "Закрыта", style: styles.statusClosed },
};

const STATUS_OPTIONS = [
  { value: 0, label: "Все статусы" },
  { value: 1, label: "Принята" },
  { value: 2, label: "На рассмотрении" },
  { value: 3, label: "Закрыта" },
];

const TYPE_OPTIONS = [{ value: 0, label: "Все типы" }, ...COMPLAINT_TYPES];

const STATUS_TRANSITIONS = {
  0: [1],
  1: [2, 3],
  2: [3],
  3: [],
};

const STATUS_ICONS = { 1: CheckCircleIcon, 2: ArrowPathIcon, 3: XCircleIcon };
const STATUS_TITLES = { 1: "Принять", 2: "На рассмотрение", 3: "Закрыть" };

export default function AdminComplaints() {
  const queryClient = useQueryClient();

  const methods = useForm({
    defaultValues: { shortDescription: "", status: 0, type: 0 },
  });

  const watchSearch = methods.watch("shortDescription");
  const watchStatus = methods.watch("status");
  const watchType = methods.watch("type");

  const [filters, setFilters] = useState({});
  const prevSearch = React.useRef("");

  useEffect(() => {
    const isSearchChanged = watchSearch !== prevSearch.current;
    prevSearch.current = watchSearch;
    const t = setTimeout(
      () => {
        setFilters({
          ...(watchStatus !== 0 && { status: watchStatus }),
          ...(watchType !== 0 && { type: watchType }),
          ...(watchSearch && { shortDescription: watchSearch }),
        });
      },
      isSearchChanged ? 400 : 0
    );
    return () => clearTimeout(t);
  }, [watchSearch, watchStatus, watchType]);

  const { data: complaints = [], isLoading } = useQuery({
    queryKey: ["complaints", filters],
    queryFn: () => getComplaints(filters),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => updateComplaintStatus(id, status),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["complaints"] }),
  });

  const getType = (type) =>
    COMPLAINT_TYPES.find((t) => t.value === type)?.label ?? "Неизвестный тип";
  const getStatus = (status) => STATUS_MAP[status] ?? STATUS_MAP[0];

  return (
    <div className={styles.wrapper}>
      <PageHeader title="Жалобы" icon={ExclamationTriangleIcon} />

      <div className={styles.content}>
        <Block>
          <FormProvider {...methods}>
            <form className={styles.filterForm}>
              <div className={styles.searchWrap}>
                <MagnifyingGlassIcon className={styles.searchIcon} />
                <InputField
                  name="shortDescription"
                  placeholder="Поиск по описанию..."
                />
              </div>
              <SelectField
                name="status"
                label="Статус"
                options={STATUS_OPTIONS}
              />
              <SelectField name="type" label="Тип" options={TYPE_OPTIONS} />
            </form>
          </FormProvider>
        </Block>

        <Block title="Список жалоб" Icon={ExclamationTriangleIcon}>
          {isLoading ? (
            <Loader />
          ) : complaints.length === 0 ? (
            <EmptyBlock Icon={ExclamationTriangleIcon}>
              Жалоб не найдено
            </EmptyBlock>
          ) : (
            <div className={styles.list}>
              {complaints.map((item) => {
                const status = getStatus(item.status);
                const transitions = STATUS_TRANSITIONS[item.status] ?? [];
                return (
                  <div key={item.id} className={styles.item}>
                    <div className={styles.itemLeft}>
                      <div className={styles.iconWrap}>
                        <ExclamationTriangleIcon className={styles.cardIcon} />
                      </div>
                      <div className={styles.info}>
                        <span className={styles.shortDescription}>
                          {item.shortDescription}
                        </span>
                        <span className={styles.typeBadge}>
                          {getType(item.type)}
                        </span>
                      </div>
                    </div>

                    <div className={styles.itemRight}>
                      <div className={styles.statusBlock}>
                        <span className={styles.statusLabel}>
                          Текущий статус
                        </span>
                        <span className={`${styles.status} ${status.style}`}>
                          {status.label}
                        </span>
                      </div>
                      {transitions.length > 0 && (
                        <div className={styles.actions}>
                          {transitions.map((nextStatus) => {
                            const Icon = STATUS_ICONS[nextStatus];
                            return (
                              <button
                                key={nextStatus}
                                className={`${styles.actionBtn} ${
                                  styles[`actionBtn${nextStatus}`]
                                }`}
                                disabled={statusMutation.isPending}
                                title={STATUS_TITLES[nextStatus]}
                                onClick={() =>
                                  statusMutation.mutate({
                                    id: item.id,
                                    status: nextStatus,
                                  })
                                }
                              >
                                <Icon className={styles.actionIcon} />
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Block>
      </div>
    </div>
  );
}
