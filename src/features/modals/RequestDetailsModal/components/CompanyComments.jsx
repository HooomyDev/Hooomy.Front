import React, { useRef, useState } from "react";
import styles from "./CompanyComments.module.css";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addComment,
  deleteComment,
  getRequestComments,
  updateComment,
  uploadRequestCommentPhotos,
} from "../../../../api/services/requestService";
import {
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
  PaperAirplaneIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import { useAuthStore } from "../../../../stores/authStore";
import Button from "../../../../common/Button/Button";
import EmptyBlock from "../../../../common/EmptyBlock/EmptyBlock";
import InputField from "../../../../common/InputField/InputField";
import { FormProvider, useForm } from "react-hook-form";
import {
  ChevronDownIcon,
  DocumentIcon,
  PaperClipIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Loader from "../../../../common/Loader/Loader";
import { useNavigate } from "react-router-dom";
import routes from "../../../../stores/routes.json";
import CreateComplaintModal, {
  COMPLAINT_TYPES,
} from "../../CreateComplaintModal/CreateComplaintModal";

export default function CompanyComments({ request }) {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5,
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedComment, setSelectedComment] = useState(null);
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [editingComment, setEditingComment] = useState(null);
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);

  const { data: response, isLoading } = useQuery({
    queryKey: ["comments", request.id, pagination.page, pagination.pageSize],
    queryFn: () =>
      getRequestComments(request?.id, pagination.page, pagination.pageSize),
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });

  const addCommentMutation = useMutation({
    mutationFn: async ({ requestId, comment, files }) => {
      const commentId = await addComment(requestId, user?.companyId, comment);

      if (files && files.length > 0) {
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("files", file.file);
        });

        await uploadRequestCommentPhotos(commentId, formData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "comments",
          request.id,
          pagination.page,
          pagination.pageSize,
        ],
      });
      setSelectedFiles([]);
      methods.reset();
    },
  });

  const updateCommentMutation = useMutation({
    mutationFn: ({ id, text }) => updateComment({ id: id, text: text }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "comments",
          request.id,
          pagination.page,
          pagination.pageSize,
        ],
      });
      setEditingComment(null);
      methods.reset();
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: ({ id }) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "comments",
          request.id,
          pagination.page,
          pagination.pageSize,
        ],
      });
    },
  });

  const handleSubmit = (data) => {
    if (editingComment) {
      updateCommentMutation.mutate({
        id: editingComment.id,
        text: data.comment,
      });
    } else {
      addCommentMutation.mutate({
        requestId: request?.id,
        comment: data.comment,
        files: selectedFiles,
      });
    }
    methods.reset();
  };

  const startEdit = (comment) => {
    setEditingComment(comment);
    methods.setValue("comment", comment.text);
    document
      .querySelector(".commentForm")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingComment(null);
    methods.reset();
  };

  const handleDelete = (id) => {
    deleteCommentMutation.mutate({ id: id });
  };

  const methods = useForm({
    defaultValues: {
      id: request?.id,
      comment: "",
      photos: [],
    },
  });

  // Обработка выбора файлов
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    const currentCount = selectedFiles.length;
    const maxFiles = 10; // Максимальное количество файлов

    // Проверяем, сколько файлов можно ещё добавить
    const availableSlots = maxFiles - currentCount;

    if (availableSlots <= 0) {
      event.target.value = ""; // Очищаем input
      return;
    }

    // Берём только то количество файлов, которое можно добавить
    const filesToAdd = files.slice(0, availableSlots);

    const newFiles = filesToAdd.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type,
    }));

    setSelectedFiles((prev) => [...prev, ...newFiles]);
    event.target.value = ""; // Очищаем input для возможности повторного выбора
  };

  // Удаление файла
  const handleRemoveFile = (fileId) => {
    setSelectedFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === fileId);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f) => f.id !== fileId);
    });
  };

  // Форматирование размера файла
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

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
    <div className={styles.commentsSection}>
      <div className={styles.header}>
        <div className={styles.info}>
          <ChatBubbleLeftRightIcon className={styles.headerIcon} />
          <h3>Комментарии</h3>
        </div>
        <div className={styles.count}>{response?.totalCount}</div>
      </div>

      {user?.role === "Employee" && (
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleSubmit)}
            className={styles.commentForm}
          >
            <InputField
              name="comment"
              placeholder="Напишите комментарий..."
              rows={3}
              multiline
              rules={{
                required: "Введите комментарий",
                minLength: { value: 3, message: "Минимум 3 символа" },
              }}
            />
            <div className={styles.formActions}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                multiple
                accept="image/*,application/pdf"
                style={{ display: "none" }}
              />
              {!editingComment && (
                <Button
                  type="button"
                  variant="secondary"
                  className={styles.submitButton}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <PaperClipIcon className={styles.submitIcon} />
                </Button>
              )}

              <Button
                type="submit"
                className={styles.submitButton}
                variant="secondary"
              >
                <PaperAirplaneIcon className={styles.submitIcon} />
              </Button>

              {editingComment && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={cancelEdit}
                  className={styles.submitButton}
                >
                  <XMarkIcon className={styles.submitIcon} />
                </Button>
              )}
            </div>
          </form>

          {!editingComment && selectedFiles.length > 0 && (
            <div className={styles.filesPreview}>
              {selectedFiles.map((file) => (
                <div key={file.id} className={styles.fileCard}>
                  {file.preview ? (
                    <img
                      src={file.preview}
                      alt={file.name}
                      className={styles.filePreviewImage}
                    />
                  ) : (
                    <div className={styles.fileIconWrapper}>
                      <DocumentIcon className={styles.fileIcon} />
                    </div>
                  )}
                  <div className={styles.fileInfo}>
                    <span className={styles.fileName} title={file.name}>
                      {file.name.length > 20
                        ? file.name.substring(0, 20) + "..."
                        : file.name}
                    </span>
                    <span className={styles.fileSize}>{file.size}</span>
                  </div>
                  <button
                    type="button"
                    className={styles.removeFileBtn}
                    onClick={() => handleRemoveFile(file.id)}
                  >
                    <XMarkIcon className={styles.removeIcon} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </FormProvider>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.commentsList}>
          {response?.requestComments?.length === 0 ? (
            <div className={styles.emptyState}>
              <EmptyBlock Icon={ChatBubbleLeftRightIcon}>
                Комментариев пока что нет
              </EmptyBlock>
            </div>
          ) : (
            response?.requestComments?.map((comment) => (
              <div key={comment.id} className={styles.commentItem}>
                <div className={styles.commentAvatar}>
                  <BuildingOfficeIcon className={styles.avatarIcon} />
                </div>
                <div className={styles.commentContent}>
                  <div className={styles.commentHeader}>
                    <span
                      className={styles.commentAuthor}
                      onClick={() =>
                        navigate(`${routes.companies}/${comment?.companyId}`)
                      }
                    >
                      {comment.senderName || "ЖЭУ"}
                    </span>
                    <span className={styles.commentDate}>
                      {format(
                        new Date(comment.createdAt),
                        "dd MMM yyyy, HH:mm",
                        {
                          locale: ru,
                        }
                      )}

                      {comment.updatedAt && (
                        <>
                          {" "}
                          (обновлено:{" "}
                          {format(
                            new Date(comment.updatedAt),
                            "dd MMM yyyy, HH:mm",
                            {
                              locale: ru,
                            }
                          )}
                          )
                        </>
                      )}
                    </span>
                    <span
                      className={`${styles.status} ${
                        comment.status === 1
                          ? styles.pendingStatus
                          : styles.approvedStatus
                      }`}
                    >
                      {renderStatus(comment.status)}
                    </span>
                  </div>
                  <p className={styles.commentText}>{comment.text}</p>
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
                  <div className={styles.commentImages}>
                    {comment?.photoUrls?.map((photo) => {
                      return (
                        <img
                          className={styles.commentImage}
                          src={photo}
                          alt={photo}
                          onClick={() => setSelectedImage(photo)}
                        />
                      );
                    })}
                  </div>
                </div>
                {user?.role === "Employee" ? (
                  <div className={styles.commentActions}>
                    <Button
                      variant="secondary"
                      className={styles.trashButton}
                      onClick={() => handleDelete(comment.id)}
                    >
                      <TrashIcon className={styles.trashIcon} />
                    </Button>
                    <Button
                      variant="secondary"
                      className={styles.submitButton}
                      onClick={() => startEdit(comment)}
                    >
                      <PencilIcon className={styles.icon} />
                    </Button>
                  </div>
                ) : (
                  user?.role === "Resident" && (
                    <div className={styles.commentActions}>
                      <Button
                        variant="secondary"
                        className={styles.submitButton}
                        onClick={() => {
                          setSelectedComment(comment);
                          setIsComplaintModalOpen(true);
                        }}
                      >
                        <ExclamationTriangleIcon
                          className={styles.submitIcon}
                        />
                      </Button>
                    </div>
                  )
                )}
              </div>
            ))
          )}

          {pagination.pageSize <= response?.requestComments?.length && (
            <Button
              className={styles.loadMoreBtn}
              variant="secondary"
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  pageSize: prev.pageSize + 5,
                }))
              }
            >
              <ChevronDownIcon className={styles.submitIcon} />
              Загрузить ещё
            </Button>
          )}
        </div>
      )}
      <CreateComplaintModal
        isOpen={isComplaintModalOpen}
        onClose={() => {
          setIsComplaintModalOpen(false);
          setSelectedComment(null);
        }}
        type={COMPLAINT_TYPES[2].value}
        data={selectedComment}
      />
    </div>
  );
}
