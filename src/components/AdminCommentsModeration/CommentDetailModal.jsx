import { format } from "date-fns";
import { ru } from "date-fns/locale";
import Button from "../../common/Button/Button";
import styles from "./CommentDetailModal.module.css";
import { useState } from "react";
import { useT } from "../../utils/useT";

export default function CommentDetailModal({ isOpen, onClose, comment }) {
  const t = useT();
  const [selectedImage, setSelectedImage] = useState(null);
  if (!isOpen || !comment) return null;

  const renderStatus = (status) => {
    switch (status) {
      case 1:
        return t("adminComments.statuses.pending");
      case 2:
        return t("adminComments.statuses.approved");
      case 3:
        return t("adminComments.statuses.deleted");
      default:
        return t("adminComments.statuses.unknown");
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t("adminComments.detail.title")}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.field}>
            <span className={styles.label}>
              {t("adminComments.detail.id")}:
            </span>
            <span className={styles.value}>{comment.id}</span>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>
              {t("adminComments.detail.company")}
            </span>
            <span className={styles.value}>{comment.companyName || "—"}</span>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>
              {t("adminComments.detail.text")}
            </span>
            <p className={styles.text}>{comment.text}</p>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>
              {t("adminComments.detail.status")}
            </span>
            <span className={styles.status}>
              {renderStatus(comment.status)}
            </span>
          </div>

          {comment.photoUrls && comment.photoUrls.length > 0 && (
            <div className={styles.field}>
              <span className={styles.label}>
                {t("adminComments.detail.photos")}
              </span>
              <div className={styles.photos}>
                {comment.photoUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={url}
                    className={styles.photo}
                    onClick={() => setSelectedImage(url)}
                  ></img>
                ))}
              </div>
            </div>
          )}

          <div className={styles.field}>
            <span className={styles.label}>
              {t("adminComments.detail.createdAt")}
            </span>
            <span className={styles.value}>
              {format(new Date(comment.createdAt), "dd MMM yyyy, HH:mm", {
                locale: ru,
              })}
            </span>
          </div>

          {comment.updatedAt && (
            <div className={styles.field}>
              <span className={styles.label}>
                {t("adminComments.detail.updatedAt")}
              </span>
              <span className={styles.value}>
                {format(new Date(comment.updatedAt), "dd MMM yyyy, HH:mm", {
                  locale: ru,
                })}
              </span>
            </div>
          )}

          {comment.deletedAt && (
            <div className={styles.field}>
              <span className={styles.label}>
                {t("adminComments.detail.deletedAt")}
              </span>
              <span className={styles.value}>
                {format(new Date(comment.deletedAt), "dd MMM yyyy, HH:mm", {
                  locale: ru,
                })}
              </span>
            </div>
          )}
        </div>
        {selectedImage && (
          <div
            className={styles.lightbox}
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              alt="Full size"
              className={styles.fullImage}
            />
          </div>
        )}
        <div className={styles.actions}>
          <Button variant="secondary" onClick={onClose}>
            {t("adminComments.detail.close")}
          </Button>
        </div>
      </div>
    </div>
  );
}
