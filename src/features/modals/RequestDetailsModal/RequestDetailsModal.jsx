import React, { useState } from "react";
import styles from "./RequestDetailsModal.module.css";
import { format } from "date-fns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getRequestDetails,
  softDeleteRequest,
} from "../../../api/services/requestService";
import Loader from "../../../common/Loader/Loader";
import {
  CalendarIcon,
  MapPinIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import ImageGallery from "../../../common/ImageGallery/ImageGallery";
import Button from "../../../common/Button/Button";
import ConfirmDialog from "../../../common/ConfirmDialog/ConfirmDialog";
import CompanyComments from "./components/CompanyComments";

export default function RequestDetailsModal({
  request,
  onClose,
  onDeleteSuccess,
}) {
  const STATUS_MAP = {
    1: { text: "Создан", icon: ClockIcon, color: "#1976d2" },
    2: { text: "Отклонено", icon: XCircleIcon, color: "#d32f2f" },
    3: { text: "В обработке", icon: ExclamationCircleIcon, color: "#f57c00" },
    4: { text: "Выполнено", icon: CheckCircleIcon, color: "#388e3c" },
  };

  const queryClient = useQueryClient();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const { data: requestDetails, isLoading } = useQuery({
    queryKey: ["request", request],
    queryFn: () => getRequestDetails(request.id),
  });

  const deleteMutation = useMutation({
    mutationFn: (requestId) => softDeleteRequest(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      queryClient.invalidateQueries({ queryKey: ["request", request.id] });
      setTimeout(() => {
        if (onDeleteSuccess) onDeleteSuccess();
        if (onClose) onClose();
      }, 1500);
    },
  });

  const handleCancelDelete = () => setShowConfirmDialog(false);

  const handleConfirmDelete = () => {
    setShowConfirmDialog(false);
    deleteMutation.mutate(request.id);
  };

  if (isLoading) return <Loader />;

  const statusInfo = STATUS_MAP[requestDetails.status] || {
    text: "Неизвестный статус",
    icon: ExclamationCircleIcon,
    color: "#999",
  };
  const StatusIcon = statusInfo.icon;

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Детали заявки</div>

      <div className={styles.content}>
        <div className={styles.photoWrapper}>
          <ImageGallery
            images={requestDetails.imagesUrls || []}
            baseUrl="http://localhost:5001"
            showThumbnails={true}
            thumbnailSize={80}
            mainHeight={450}
          />
        </div>

        <div className={styles.infoWrapper}>
          <div className={styles.reqTitle}>{requestDetails.title}</div>

          <div
            className={styles.reqStatus}
            style={{
              backgroundColor: `${statusInfo.color}15`,
              color: statusInfo.color,
            }}
          >
            <StatusIcon className={styles.statusIcon} />
            {statusInfo.text}
          </div>

          <div className={styles.reqDate}>
            <CalendarIcon className={styles.icon} />
            <span>
              Создано:{" "}
              {format(new Date(requestDetails.createdAt), "dd.MM.yyyy HH:mm")}
            </span>
          </div>

          <div className={styles.reqAddress}>
            <MapPinIcon className={styles.icon} />
            <span>
              <strong>Адрес:</strong> {requestDetails.address}
            </span>
          </div>

          <div className={styles.reqDescription}>
            <div className={styles.descriptionHeader}>
              <DocumentTextIcon className={styles.icon} />
              <span>Описание</span>
            </div>
            <p>{requestDetails.description || "Описание отсутствует"}</p>
          </div>

          <div className={styles.actions}>
            <Button
              variant="danger"
              onClick={() => setShowConfirmDialog(true)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Удаление..." : "Удалить"}
            </Button>
          </div>
        </div>
      </div>

      <CompanyComments request={requestDetails} />

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
