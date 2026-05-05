import React, { useState } from "react";
import styles from "./CompanyComments.module.css";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "../../../../api/services/requestService";
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import { useAuthStore } from "../../../../stores/authStore";
import Button from "../../../../common/Button/Button";
import EmptyBlock from "../../../../common/EmptyBlock/EmptyBlock";
import InputField from "../../../../common/InputField/InputField";
import { FormProvider, useForm } from "react-hook-form";

export default function CompanyComments({ request }) {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const addCommentMutation = useMutation({
    mutationFn: ({ requestId, comment }) => addComment(requestId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["request", request],
      });
    },
  });

  const handleSubmit = (data) => {
    addCommentMutation.mutate({
      requestId: request?.id,
      comment: data.comment,
    });
  };

  const companyComments = request?.comments ?? [];

  const methods = useForm({
    defaultValues: {
      id: request?.id,
      comment: "",
    },
  });

  return (
    <div className={styles.commentsSection}>
      <div className={styles.header}>
        <ChatBubbleLeftRightIcon className={styles.headerIcon} />
        <h3>Комментарии от управляющей компании</h3>
      </div>

      <div className={styles.commentsList}>
        {companyComments?.length === 0 ? (
          <div className={styles.emptyState}>
            <EmptyBlock Icon={ChatBubbleLeftRightIcon}>
              Нет комментариев от управляющей компании
            </EmptyBlock>
          </div>
        ) : (
          companyComments?.map((comment) => (
            <div key={comment.id} className={styles.commentItem}>
              <div className={styles.commentAvatar}>
                <BuildingOfficeIcon className={styles.avatarIcon} />
              </div>
              <div className={styles.commentContent}>
                <div className={styles.commentHeader}>
                  <span className={styles.commentAuthor}>
                    {comment.authorName || "Управляющая компания"}
                  </span>
                  <span className={styles.commentDate}>
                    {format(new Date(comment.createdAt), "dd MMM yyyy, HH:mm", {
                      locale: ru,
                    })}
                  </span>
                </div>
                <p className={styles.commentText}>{comment.text}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Форма добавления комментария (только для сотрудников) */}
      {(user?.role === "Employee" || user?.role === "Admin") && (
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
              <Button type="submit" className={styles.submitButton}>
                <PaperAirplaneIcon className={styles.submitIcon} />
                {addCommentMutation.isPending ? "Отправка..." : "Отправить"}
              </Button>
            </div>
          </form>
        </FormProvider>
      )}
    </div>
  );
}
