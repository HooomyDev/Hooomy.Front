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
  ExclamationTriangleIcon,
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
import CreateComplaintModal from "../CreateComplaintModal/CreateComplaintModal";
import { useAuthStore } from "../../../stores/authStore";
import { useT } from "../../../utils/useT";

export default function RequestDetailsModal({
  request,
  onClose,
  onDeleteSuccess,
}) {
  const t = useT();
  const [isExpandedDesctiption, setIsExpandedDesctiption] = useState(false);
  const [isExpandedTitle, setIsExpandedTitle] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const { user } = useAuthStore();

  // 🔹 STATUS_MAP с локализацией
  const STATUS_MAP = {
    1: {
      text: t("requestDetailsModal.status.pending"),
      icon: ClockIcon,
      color: "#f57c00",
    },
    2: {
      text: t("requestDetailsModal.status.created"),
      icon: ClockIcon,
      color: "#1976d2",
    },
    3: {
      text: t("requestDetailsModal.status.rejected"),
      icon: XCircleIcon,
      color: "#d32f2f",
    },
    4: {
      text: t("requestDetailsModal.status.processing"),
      icon: ExclamationCircleIcon,
      color: "#f57c00",
    },
    5: {
      text: t("requestDetailsModal.status.completed"),
      icon: CheckCircleIcon,
      color: "#388e3c",
    },
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
    text: t("requestDetailsModal.status.unknown"),
    icon: ExclamationCircleIcon,
    color: "#999",
  };
  const StatusIcon = statusInfo.icon;

  const title = requestDetails.title;
  const isLongTitle = title.length > 25;
  const displayedTitle =
    isExpandedTitle || !isLongTitle ? title : `${title.slice(0, 25).trim()}...`;

  const description =
    requestDetails.description || t("requestDetailsModal.labels.noDescription");
  const isLongDescription = description.length > 150;
  const displayedDescription =
    isExpandedDesctiption || !isLongDescription
      ? description
      : `${description.slice(0, 100).trim()}...`;

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.title}>{t("requestDetailsModal.title")}</div>

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
            {requestDetails?.status === 5 &&
              requestDetails.review === null &&
              user?.role === "Resident" && (
                <div className={styles.reviewWrapper}>
                  <Button
                    variant="secondary"
                    className={styles.reviewButton2}
                    onClick={() => setShowRatingModal(true)}
                  >
                    {t("requestDetailsModal.actions.rateWork")}
                  </Button>
                </div>
              )}

            <div className={styles.reqTitle}>
              <div className={styles.titleHeader}>
                <div className={styles.info}>
                  <DocumentTextIcon className={styles.icon} />
                  <span>{t("requestDetailsModal.labels.problemTitle")}</span>
                </div>

                {isLongTitle && (
                  <button
                    className={styles.expandButton}
                    onClick={() => setIsExpandedTitle(!isExpandedTitle)}
                    aria-label={
                      isExpandedTitle
                        ? t("requestDetailsModal.expand.showLess")
                        : t("requestDetailsModal.expand.showMore")
                    }
                  >
                    {isExpandedTitle ? (
                      <ChevronUpIcon className={styles.buttonIcon} />
                    ) : (
                      <ChevronDownIcon className={styles.buttonIcon} />
                    )}
                  </button>
                )}
              </div>
              <div className={styles.titleContent}>{displayedTitle}</div>
              <Button
                variant="secondary"
                className={styles.reviewButton}
                onClick={() => {
                  setShowComplaintModal(true);
                }}
                title={t("requestDetailsModal.actions.complain")}
              >
                <ExclamationTriangleIcon className={styles.reviewIcon} />
              </Button>
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
                {t("requestDetailsModal.labels.createdAt")}{" "}
                {format(new Date(requestDetails.createdAt), "dd.MM.yyyy HH:mm")}
              </span>
            </div>

            <div className={styles.reqAddress}>
              <MapPinIcon className={styles.icon} />
              <span>
                <strong>{t("requestDetailsModal.labels.address")}</strong>{" "}
                {requestDetails.address}
              </span>
            </div>

            <div className={styles.reqDescription}>
              <div className={styles.descriptionHeader}>
                <div className={styles.info}>
                  <DocumentTextIcon className={styles.icon} />
                  <span>{t("requestDetailsModal.labels.description")}</span>
                </div>
                {isLongDescription && (
                  <button
                    className={styles.expandButton}
                    onClick={() =>
                      setIsExpandedDesctiption(!isExpandedDesctiption)
                    }
                    aria-label={
                      isExpandedDesctiption
                        ? t("requestDetailsModal.expand.showLess")
                        : t("requestDetailsModal.expand.showMore")
                    }
                  >
                    {isExpandedDesctiption ? (
                      <ChevronUpIcon className={styles.buttonIcon} />
                    ) : (
                      <ChevronDownIcon className={styles.buttonIcon} />
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
                    {t("requestDetailsModal.labels.reviewScore")} (
                    {requestDetails.review?.score})
                  </div>
                  <Button
                    variant="secondary"
                    className={styles.trashButton}
                    onClick={() =>
                      deleteReviewMutaion.mutate(requestDetails.review?.id)
                    }
                    aria-label="Удалить оценку"
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
                {deleteMutation.isPending
                  ? t("requestDetailsModal.actions.deleting")
                  : t("requestDetailsModal.actions.delete")}
              </Button>
            </div>
          </div>
        </div>

        <CompanyComments request={requestDetails} />

        <ConfirmDialog
          isOpen={showConfirmDialog}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          title={t("requestDetailsModal.confirmDelete.title")}
          message={t("requestDetailsModal.confirmDelete.message")}
          confirmText={t("requestDetailsModal.confirmDelete.confirm")}
          cancelText={t("requestDetailsModal.confirmDelete.cancel")}
          confirmVariant="danger"
        />
      </div>

      {showRatingModal && (
        <RatingModal
          setShowRatingModal={setShowRatingModal}
          request={request}
        />
      )}
      {showComplaintModal && (
        <CreateComplaintModal
          isOpen={showComplaintModal}
          onClose={() => setShowComplaintModal(false)}
          type={4}
          data={{ id: requestDetails?.id }}
        />
      )}
    </>
  );
}
