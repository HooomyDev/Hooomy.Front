import React, { useRef, useState } from "react";
import styles from "./CompanyComments.module.css";
import { format } from "date-fns";
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
import { useT } from "../../../../utils/useT";

export default function CompanyComments({ request }) {
  const t = useT();
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

  // 🔹 Локализованная валидация
  const validationRules = {
    required: t("companyComments.fields.required"),
    minLength: {
      value: 3,
      message: t("companyComments.fields.minLength", { count: 3 }),
    },
  };

  // Обработка выбора файлов
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    const currentCount = selectedFiles.length;
    const maxFiles = 10;

    const availableSlots = maxFiles - currentCount;

    if (availableSlots <= 0) {
      // 🔹 Можно показать toast-уведомление
      console.warn(t("file.maxFiles", { max: maxFiles }));
      event.target.value = "";
      return;
    }

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
    event.target.value = "";
  };

  const handleRemoveFile = (fileId) => {
    setSelectedFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === fileId);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f) => f.id !== fileId);
    });
  };

  // 🔹 Локализованное форматирование размера файла
  const formatFileSize = (bytes) => {
    if (bytes === 0) return `0 ${t("companyComments.file.size.bytes")}`;
    const k = 1024;
    const sizes = [
      t("companyComments.file.size.bytes"),
      t("companyComments.file.size.kb"),
      t("companyComments.file.size.mb"),
      t("companyComments.file.size.gb"),
    ];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // 🔹 Локализованный рендер статуса
  const renderStatus = (status) => {
    switch (status) {
      case 1:
        return t("companyComments.status.pending");
      case 2:
        return t("companyComments.status.approved");
      case 3:
        return t("companyComments.status.deleted");
      default:
        return t("companyComments.status.unknown");
    }
  };

  // 🔹 Получение локали для дат из useT
  const dateLocale = t.dateLocale;

  // 🔹 Хелпер для форматирования даты
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return format(new Date(dateString), "dd MMM yyyy, HH:mm", {
      locale: dateLocale,
    });
  };

  return (
    <div className={styles.commentsSection}>
      <div className={styles.header}>
        <div className={styles.info}>
          <ChatBubbleLeftRightIcon className={styles.headerIcon} />
          <h3>{t("companyComments.title")}</h3>
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
              placeholder={t("companyComments.fields.placeholder")}
              rows={3}
              multiline
              rules={validationRules}
            />
            <div className={styles.formActions}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                multiple
                accept="image/*,application/pdf"
                style={{ display: "none" }}
                aria-label={t("companyComments.actions.attachFile")}
              />
              {!editingComment && (
                <Button
                  type="button"
                  variant="secondary"
                  className={styles.submitButton}
                  onClick={() => fileInputRef.current?.click()}
                  aria-label={t("companyComments.actions.attachFile")}
                  title={t("companyComments.actions.attachFile")}
                >
                  <PaperClipIcon className={styles.submitIcon} />
                </Button>
              )}

              <Button
                type="submit"
                className={styles.submitButton}
                variant="secondary"
                aria-label={t("companyComments.actions.send")}
                title={t("companyComments.actions.send")}
              >
                <PaperAirplaneIcon className={styles.submitIcon} />
              </Button>

              {editingComment && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={cancelEdit}
                  className={styles.submitButton}
                  aria-label={t("companyComments.actions.cancel")}
                  title={t("companyComments.actions.cancel")}
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
                    aria-label={t("companyComments.file.remove")}
                    title={t("companyComments.file.remove")}
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
                {t("emptyState")}
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
                      role="button"
                      tabIndex={0}
                      aria-label={`${t("aria.authorLink")}: ${comment.senderName || t("senderFallback")}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          navigate(`${routes.companies}/${comment?.companyId}`);
                        }
                      }}
                    >
                      {comment.senderName || t("senderFallback")}
                    </span>
                    <span className={styles.commentDate}>
                      {formatDate(comment.createdAt)}
                      {comment.updatedAt && (
                        <>
                          {" "}
                          ({t("labels.updated")}:{" "}
                          {formatDate(comment.updatedAt)})
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
                      role="dialog"
                      aria-modal="true"
                      aria-label={t("aria.closeImage")}
                    >
                      <img
                        src={selectedImage}
                        alt=""
                        className={styles.fullImage}
                      />
                    </div>
                  )}

                  <div className={styles.commentImages}>
                    {comment?.photoUrls?.map((photo, idx) => (
                      <img
                        key={idx}
                        className={styles.commentImage}
                        src={photo}
                        alt={`${t("aria.expandImage")} ${idx + 1}`}
                        onClick={() => setSelectedImage(photo)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            setSelectedImage(photo);
                          }
                        }}
                      />
                    ))}
                  </div>
                </div>

                {user?.role === "Employee" ? (
                  <div className={styles.commentActions}>
                    <Button
                      variant="secondary"
                      className={styles.trashButton}
                      onClick={() => handleDelete(comment.id)}
                      aria-label={t("actions.delete")}
                      title={t("actions.delete")}
                    >
                      <TrashIcon className={styles.trashIcon} />
                    </Button>
                    <Button
                      variant="secondary"
                      className={styles.submitButton}
                      onClick={() => startEdit(comment)}
                      aria-label={t("actions.edit")}
                      title={t("actions.edit")}
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
                        aria-label={t("actions.complain")}
                        title={t("actions.complain")}
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
              {t("labels.loadMore")}
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
        type={COMPLAINT_TYPES[2]?.value}
        data={selectedComment}
      />
    </div>
  );
}
