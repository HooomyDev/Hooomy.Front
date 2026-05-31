import React, { useState } from "react";
import styles from "./RatingModal.module.css";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../../../../common/Button/Button";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import InputField from "../../../../common/InputField/InputField";
import { reviewRequest } from "../../../../api/services/requestService";
import { useT } from "../../../../utils/useT";

export default function RatingModal({ setShowRatingModal, request }) {
  const t = useT();
  const [hoveredRating, setHoveredRating] = useState(0);
  const queryClient = useQueryClient();

  const ratingMethods = useForm({
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const rateMutation = useMutation({
    mutationFn: async (ratingData) => {
      return await reviewRequest(
        request.id,
        ratingData.rating,
        ratingData.comment,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      queryClient.invalidateQueries({ queryKey: ["request", request.id] });
      setShowRatingModal(false);
    },
  });

  const handleSubmitRating = (data) => {
    if (data.rating === 0) {
      ratingMethods.setError("rating", {
        type: "required",
        message: t("validation.ratingRequired"),
      });
      return;
    }
    rateMutation.mutate({
      rating: data.rating,
      comment: data.comment,
    });
  };

  const selectedRating = ratingMethods.watch("rating");

  return (
    <div
      className={styles.ratingModalOverlay}
      onClick={() => setShowRatingModal(false)}
    >
      <div className={styles.ratingModal} onClick={(e) => e.stopPropagation()}>
        <FormProvider {...ratingMethods}>
          <form onSubmit={ratingMethods.handleSubmit(handleSubmitRating)}>
            <div className={styles.ratingModalHeader}>
              <h3>{t("ratingModal.title")}</h3>
              <button
                type="button"
                onClick={() => setShowRatingModal(false)}
                aria-label={t("ratingModal.aria.closeModal")}
                className={styles.closeButton}
              >
                ✕
              </button>
            </div>

            <div
              className={styles.ratingStars}
              role="radiogroup"
              aria-label={t("ratingModal.title")}
            >
              {[1, 2, 3, 4, 5].map((star) => {
                const isActive = (hoveredRating || selectedRating) >= star;
                return (
                  <StarSolidIcon
                    key={star}
                    className={`${styles.star} ${isActive ? styles.starActive : ""}`}
                    onClick={() => {
                      ratingMethods.setValue("rating", star);
                      // Очищаем ошибку при выборе оценки
                      if (ratingMethods.formState.errors.rating) {
                        ratingMethods.clearErrors("rating");
                      }
                    }}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    role="radio"
                    aria-checked={selectedRating === star}
                    aria-label={t("ratingModal.aria.starRating", {
                      rating: star,
                    })}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        ratingMethods.setValue("rating", star);
                        if (ratingMethods.formState.errors.rating) {
                          ratingMethods.clearErrors("rating");
                        }
                      }
                    }}
                  />
                );
              })}
            </div>

            <InputField
              label={t("ratingModal.fields.commentLabel")}
              placeholder={t("ratingModal.fields.commentPlaceholder")}
              name="comment"
              multiline
              rows={4}
            />

            <div className={styles.ratingModalActions}>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowRatingModal(false)}
              >
                {t("ratingModal.actions.cancel")}
              </Button>
              <Button
                type="submit"
                disabled={rateMutation.isPending || selectedRating === 0}
              >
                {rateMutation.isPending
                  ? t("ratingModal.actions.submitting")
                  : t("ratingModal.actions.submit")}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
