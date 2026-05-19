import { format } from "date-fns";
import { ru } from "date-fns/locale";
import Button from "../../common/Button/Button";
import styles from "./CommentDetailModal.module.css";
import { useState } from "react";

export default function CommentDetailModal({ isOpen, onClose, comment }) {
  const [selectedImage, setSelectedImage] = useState(null);
  if (!isOpen || !comment) return null;

  const renderStatus = (status) => {
    switch (status) {
      case 1:
        return "Ожидает проверки";
      case 2:
        return "Одобрен";
      case 3:
        return "Удален";
      default:
        return "Неизвестно";
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Детали комментария</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.field}>
            <span className={styles.label}>ID:</span>
            <span className={styles.value}>{comment.id}</span>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Компания:</span>
            <span className={styles.value}>{comment.companyName || "—"}</span>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Текст:</span>
            <p className={styles.text}>{comment.text}</p>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Статус:</span>
            <span className={styles.status}>
              {renderStatus(comment.status)}
            </span>
          </div>

          {comment.photoUrls && comment.photoUrls.length > 0 && (
            <div className={styles.field}>
              <span className={styles.label}>Фотографии:</span>
              <div className={styles.photos}>
                {comment.photoUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    className={styles.photo}
                    onClick={() => setSelectedImage(url)}
                  ></img>
                ))}
              </div>
            </div>
          )}

          <div className={styles.field}>
            <span className={styles.label}>Создан:</span>
            <span className={styles.value}>
              {format(new Date(comment.createdAt), "dd MMM yyyy, HH:mm", {
                locale: ru,
              })}
            </span>
          </div>

          {comment.updatedAt && (
            <div className={styles.field}>
              <span className={styles.label}>Обновлён:</span>
              <span className={styles.value}>
                {format(new Date(comment.updatedAt), "dd MMM yyyy, HH:mm", {
                  locale: ru,
                })}
              </span>
            </div>
          )}

          {comment.deletedAt && (
            <div className={styles.field}>
              <span className={styles.label}>Удалён:</span>
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
            Закрыть
          </Button>
        </div>
      </div>
    </div>
  );
}
