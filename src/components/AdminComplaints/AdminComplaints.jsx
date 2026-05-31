import React, { useEffect, useState } from "react";
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  XCircleIcon,
  EyeIcon,
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
import { useT } from "../../utils/useT";
import {
  getComplaints,
  updateComplaintStatus,
} from "../../api/services/complaintService";
import { COMPLAINT_TYPES } from "../../features/modals/CreateComplaintModal/CreateComplaintModal";
import ComplaintDetailsModal from "../../features/modals/ComplaintDetailsModal/ComplaintDetailsModal";

const STATUS_TRANSITIONS = {
  0: [1],
  1: [2, 3],
  2: [3],
  3: [],
};

const STATUS_ICONS = { 1: CheckCircleIcon, 2: ArrowPathIcon, 3: XCircleIcon };

export default function AdminComplaints() {
  const queryClient = useQueryClient();
  const t = useT();

  const STATUS_MAP = {
    0: {
      label: t("adminComplaints.statuses.unknown"),
      style: styles.statusUnknown,
    },
    1: {
      label: t("adminComplaints.statuses.accepted"),
      style: styles.statusAccepted,
    },
    2: {
      label: t("adminComplaints.statuses.onReview"),
      style: styles.statusOnReview,
    },
    3: {
      label: t("adminComplaints.statuses.closed"),
      style: styles.statusClosed,
    },
  };

  const STATUS_OPTIONS = [
    { value: 0, label: t("adminComplaints.allStatuses") },
    { value: 1, label: t("adminComplaints.statuses.accepted") },
    { value: 2, label: t("adminComplaints.statuses.onReview") },
    { value: 3, label: t("adminComplaints.statuses.closed") },
  ];

  const TYPE_OPTIONS = [
    { value: 0, label: t("adminComplaints.allTypes") },
    ...COMPLAINT_TYPES.map((item) => ({
      value: item.value,
      label: t(`adminComplaints.types.${item.value}`),
    })),
  ];

  const STATUS_TITLES = {
    1: t("adminComplaints.actions.accept"),
    2: t("adminComplaints.actions.review"),
    3: t("adminComplaints.actions.close"),
  };

  const methods = useForm({
    defaultValues: { shortDescription: "", status: 0, type: 0 },
  });

  const watchSearch = methods.watch("shortDescription");
  const watchStatus = methods.watch("status");
  const watchType = methods.watch("type");

  const [filters, setFilters] = useState({});
  const prevSearch = React.useRef("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showComplaintModal, setShowComplaintModal] = useState(false);

  useEffect(() => {
    const isSearchChanged = watchSearch !== prevSearch.current;
    prevSearch.current = watchSearch;
    const timeoutId = setTimeout(
      () => {
        setFilters({
          ...(watchStatus !== 0 && { status: watchStatus }),
          ...(watchType !== 0 && { type: watchType }),
          ...(watchSearch && { shortDescription: watchSearch }),
        });
      },
      isSearchChanged ? 400 : 0,
    );
    return () => clearTimeout(timeoutId);
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
    t(`adminComplaints.types.${type}`, {
      defaultValue: t("adminComplaints.unknownType"),
    });
  const getStatus = (status) => STATUS_MAP[status] ?? STATUS_MAP[0];

  return (
    <div className={styles.wrapper}>
      <PageHeader
        title={t("adminComplaints.title")}
        icon={ExclamationTriangleIcon}
      />

      <div className={styles.content}>
        <Block>
          <FormProvider {...methods}>
            <form className={styles.filterForm}>
              <div className={styles.searchWrap}>
                <InputField
                  name="shortDescription"
                  label={t("adminComplaints.search")}
                  placeholder={t("adminComplaints.searchPlaceholder")}
                />
              </div>
              <SelectField
                name="status"
                label={t("adminComplaints.statusLabel")}
                options={STATUS_OPTIONS}
              />
              <SelectField
                name="type"
                label={t("adminComplaints.typeLabel")}
                options={TYPE_OPTIONS}
              />
            </form>
          </FormProvider>
        </Block>

        <Block
          title={t("adminComplaints.listTitle")}
          Icon={ExclamationTriangleIcon}
        >
          {isLoading ? (
            <Loader />
          ) : complaints.length === 0 ? (
            <EmptyBlock Icon={ExclamationTriangleIcon}>
              {t("adminComplaints.notFound")}
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
                          {t("adminComplaints.currentStatus")}
                        </span>
                        <span className={`${styles.status} ${status.style}`}>
                          {status.label}
                        </span>
                      </div>
                      {transitions.length > 0 && (
                        <div className={styles.actions}>
                          <button
                            className={`${styles.detailsButton}`}
                            onClick={() => {
                              setSelectedComplaint(item);
                              setShowComplaintModal(true);
                            }}
                          >
                            <EyeIcon className={styles.icon} />
                          </button>
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
        <ComplaintDetailsModal
          isOpen={showComplaintModal}
          onClose={() => setShowComplaintModal(false)}
          complaint={selectedComplaint}
        />
      </div>
    </div>
  );
}
