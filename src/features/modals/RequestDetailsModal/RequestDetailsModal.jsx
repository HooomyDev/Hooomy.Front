import React, { useState } from "react";
import styles from "./RequestDetailsModal.module.css";
import { format } from "date-fns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteReview,
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
  StarIcon,
  ClockIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import ImageGallery from "../../../common/ImageGallery/ImageGallery";
import Button from "../../../common/Button/Button";
import ConfirmDialog from "../../../common/ConfirmDialog/ConfirmDialog";
import CompanyComments from "./components/CompanyComments";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import RatingModal from "./components/RatingModal";

export default function RequestDetailsModal({
  request,
  onClose,
  onDeleteSuccess,
}) {
  const [isExpandedDesctiption, setIsExpandedDesctiption] = useState(false);
  const [isExpandedTitle, setIsExpandedTitle] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const STATUS_MAP = {
    1: { text: "Ожидает модерации", icon: ClockIcon, color: "#f57c00" },
    2: { text: "Создан", icon: ClockIcon, color: "#1976d2" },
    3: { text: "Отклонено", icon: XCircleIcon, color: "#d32f2f" },
    4: { text: "В обработке", icon: ExclamationCircleIcon, color: "#f57c00" },
    5: { text: "Выполнено", icon: CheckCircleIcon, color: "#388e3c" },
  };

  const queryClient = useQueryClient();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const { data: requestDetails, isLoading } = useQuery({
    queryKey: ["request", request.id],
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

  const deleteReviewMutaion = useMutation({
    mutationFn: (reviewId) => deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      queryClient.invalidateQueries({ queryKey: ["request", request.id] });
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

  const title = requestDetails.title;
  const isLongTitle = title.length > 25;

  const displayedTitle =
    isExpandedTitle || !isLongTitle ? title : `${title.slice(0, 25).trim()}...`;

  const description = requestDetails.description || "Описание отсутствует";
  const isLongDescription = description.length > 150;

  const displayedDescription =
    isExpandedDesctiption || !isLongDescription
      ? description
      : `${description.slice(0, 100).trim()}...`;

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.title}>Детали заявки</div>

        <div className={styles.content}>
          <div className={styles.photoWrapper}>
            <ImageGallery
              images={requestDetails.imagesUrls || []}
              showThumbnails={true}
              thumbnailSize={80}
              mainHeight={450}
            />
          </div>

          <div className={styles.infoWrapper}>
            {requestDetails?.status === 5 && requestDetails.review === null && (
              <div className={styles.reviewWrapper}>
                <Button
                  variant="secondary"
                  className={styles.reviewButton}
                  onClick={() => setShowRatingModal(true)}
                >
                  Оценить работу
                </Button>
              </div>
            )}
            <div className={styles.reqTitle}>
              <div className={styles.titleHeader}>
                <div className={styles.info}>
                  <DocumentTextIcon className={styles.icon} />
                  <span>Краткое описание проблемы</span>
                </div>

                {isLongTitle && (
                  <button
                    className={styles.expandButton}
                    onClick={() => setIsExpandedTitle(!isExpandedTitle)}
                  >
                    {isExpandedTitle ? (
                      <>
                        <ChevronUpIcon className={styles.buttonIcon} />
                      </>
                    ) : (
                      <>
                        <ChevronDownIcon className={styles.buttonIcon} />
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className={styles.titleContent}>{displayedTitle}</div>
            </div>

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
                <div className={styles.info}>
                  <DocumentTextIcon className={styles.icon} />
                  <span>Описание</span>
                </div>
                {isLongDescription && (
                  <button
                    className={styles.expandButton}
                    onClick={() =>
                      setIsExpandedDesctiption(!isExpandedDesctiption)
                    }
                  >
                    {isExpandedDesctiption ? (
                      <>
                        <ChevronUpIcon className={styles.buttonIcon} />
                      </>
                    ) : (
                      <>
                        <ChevronDownIcon className={styles.buttonIcon} />
                      </>
                    )}
                  </button>
                )}
              </div>
              <div className={styles.descriptionContent}>
                {displayedDescription}
              </div>
            </div>

            {requestDetails.review && (
              <div className={styles.review}>
                <div className={styles.info}>
                  <StarIcon className={styles.icon} />
                  <div className={styles.reviewHeader}>
                    Оценка ({requestDetails.review?.score})
                  </div>
                  <Button
                    variant="secondary"
                    className={styles.trashButton}
                    onClick={() =>
                      deleteReviewMutaion.mutate(requestDetails.review?.id)
                    }
                  >
                    <TrashIcon className={styles.trashIcon} />
                  </Button>
                </div>
                <div className={styles.text}>{requestDetails.review?.text}</div>
              </div>
            )}

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
      {showRatingModal && (
        <RatingModal
          setShowRatingModal={setShowRatingModal}
          request={request}
        />
      )}
    </>
  );
}
