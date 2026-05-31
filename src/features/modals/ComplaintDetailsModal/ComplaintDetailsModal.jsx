import React from "react";
import Modal from "../Modal/Modal";
import styles from "./ComplaintDetailsModal.module.css";
import { format } from "date-fns";
import { useT } from "../../../utils/useT";
import Button from "../../../common/Button/Button";
import { useQuery } from "@tanstack/react-query";
import { getComplaintDetails } from "../../../api/services/complaintService";
import Loader from "../../../common/Loader/Loader";

export default function ComplaintDetailsModal({ isOpen, onClose, complaint }) {
  const t = useT();
  const complaintId = complaint?.id;

  const { data: details, isLoading } = useQuery({
    queryKey: ["complaint", complaintId],
    queryFn: () => getComplaintDetails(complaintId),
    enabled: Boolean(complaintId) && isOpen,
    staleTime: 1000 * 60,
  });

  const complaintData = details || complaint;

  if (!complaintData) return null;

  if (isLoading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className={styles.wrapper}>
          <Loader />
        </div>
      </Modal>
    );
  }

  const created = complaintData.createdAt
    ? format(new Date(complaintData.createdAt), "dd.MM.yyyy HH:mm")
    : "-";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{t("adminComplaints.detail.title")}</h2>

        <div className={styles.row}>
          <div className={styles.label}>{t("adminComplaints.table.id")}:</div>
          <div className={styles.value}>{complaintData.id}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>
            {t("adminComplaints.table.fullName") ||
              t("adminComplaints.detail.short")}
            :
          </div>
          <div className={styles.value}>
            {complaintData.shortDescription || "-"}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>
            {t("adminComplaints.detail.type") || t("adminComplaints.typeLabel")}
            :
          </div>
          <div className={styles.value}>
            {t(`adminComplaints.types.${complaintData.type}`) ||
              t("adminComplaints.unknownType")}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>
            {t("adminComplaints.detail.status") ||
              t("adminComplaints.table.status")}
            :
          </div>
          <div className={styles.value}>
            {t(`adminComplaints.statuses.${complaintData.status}`) ||
              complaintData.status}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>
            {t("adminComplaints.detail.description") ||
              t("adminComplaints.detail.desc")}
            :
          </div>
          <div className={styles.value}>{complaintData.description || "-"}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>
            {t("adminComplaints.detail.createdAt") || "Created at"}:
          </div>
          <div className={styles.value}>{created}</div>
        </div>

        <div className={styles.actions}>
          <Button variant="secondary" onClick={onClose}>
            {t("common.cancel")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
