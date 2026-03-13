import React from "react";
import styles from "./RequestDetailsModal.v2.module.css";
import {
  PhotoIcon,
  MapPinIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { useForm, FormProvider } from "react-hook-form";
import FileUploadField from "../../../common/FileUploadField/FileUploadField";
import InputField from "../../../common/InputField/InputField";
import Button from "../../../common/Button/Button";

export default function RequestDetailsModal({
  request,
  isOpen,
  onClose,
  onStatusChange,
  onAddComment,
  onPhotoUpload,
  getStatusColor,
}) {
  const methods = useForm({
    defaultValues: {
      photo: null,
      newComment: "",
    },
  });

  const { handleSubmit, register, watch, reset } = methods;
  const newComment = watch("newComment");

  const submitPhoto = (data) => {
    if (data.photo) {
      onPhotoUpload(request.id, data.photo);
      reset({ photo: null });
    }
  };

  const submitComment = (data) => {
    if (data.newComment.trim()) {
      onAddComment(request.id, data.newComment);
      reset({ newComment: "" });
    }
  };

  return (
    <FormProvider {...methods}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div>
            <h3 className={styles.title}>{request.title}</h3>
            <div className={styles.subtitle}>
              <span className={styles.id}>ID: #{request.id}</span>
              <span
                className={styles.status}
                style={{
                  backgroundColor: getStatusColor(request.status),
                }}
              >
                {request.status}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.detailGrid}>
            <div className={styles.detailSection}>
              <h4 className={styles.sectionTitle}>
                <MapPinIcon className={styles.detailIcon} />
                Адрес
              </h4>
              <div className={styles.detailInfo}>
                <p>
                  <strong>Район:</strong> {request.district}
                </p>
                <p>
                  <strong>Улица:</strong> {request.street}
                </p>
                <p>
                  <strong>Дом:</strong> {request.house}
                </p>
                <p className={styles.coordinates}>
                  Координаты: {request.location.lat.toFixed(4)},{" "}
                  {request.location.lng.toFixed(4)}
                </p>
              </div>
            </div>
          </div>

          <div className={styles.detailSection}>
            <h4 className={styles.sectionTitle}>Описание заявки</h4>
            <div className={styles.descriptionBox}>{request.description}</div>
          </div>

          <div className={styles.detailSection}>
            <h4 className={styles.sectionTitle}>Фотоотчёт</h4>
            <div className={styles.photoSection}>
              {request.photo ? (
                <img
                  src={request.photo}
                  alt="Фото по заявке"
                  className={styles.photoPreview}
                />
              ) : (
                <div className={styles.noPhoto}>
                  <PhotoIcon className={styles.noPhotoIcon} />
                  <p>Фото не загружено</p>
                </div>
              )}

              <form onSubmit={handleSubmit(submitPhoto)}>
                <FileUploadField
                  name="photo"
                  label="Загрузить фото"
                  required={false}
                />
                <Button
                  type="submit"
                  variant="secondary"
                  className={styles.uploadButton}
                >
                  Загрузить
                </Button>
              </form>
            </div>
          </div>

          <div className={styles.detailSection}>
            <h4 className={styles.sectionTitle}>Комментарии</h4>
            <div className={styles.commentsSection}>
              {(request.comments || []).map((comment, index) => (
                <div key={index} className={styles.comment}>
                  <div className={styles.commentHeader}>
                    <strong>{comment.author}</strong>
                    <span className={styles.commentTime}>{comment.time}</span>
                  </div>
                  <p className={styles.commentText}>{comment.text}</p>
                </div>
              ))}

              <form
                onSubmit={handleSubmit(submitComment)}
                className={styles.addComment}
              >
                <InputField
                  name="newComment"
                  multiline
                  rows={3}
                  placeholder="Введите комментарий..."
                  {...register("newComment", {
                    required: "Введите комментарий",
                  })}
                  className={styles.commentInput}
                />

                <Button
                  type="submit"
                  variant="primary"
                  disabled={!newComment.trim()}
                  className={styles.commentSubmit}
                >
                  Добавить
                </Button>
              </form>
            </div>
          </div>

          <div className={styles.modalActions}>
            <div className={styles.statusActions}>
              <span className={styles.statusLabel}>Изменить статус:</span>
              <button
                onClick={() => onStatusChange(request.id, "Выполнено")}
                className={`${styles.statusButton} ${styles.statusComplete}`}
              >
                <CheckCircleIcon className={styles.statusButtonIcon} />
                Выполнено
              </button>
              <button
                onClick={() => onStatusChange(request.id, "Отклонено")}
                className={`${styles.statusButton} ${styles.statusReject}`}
              >
                <XCircleIcon className={styles.statusButtonIcon} />
                Отклонить
              </button>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
