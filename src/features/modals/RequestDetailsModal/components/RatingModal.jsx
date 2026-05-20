import React, { useState } from "react";
import styles from "./RatingModal.module.css";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../../../../common/Button/Button";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import InputField from "../../../../common/InputField/InputField";
import { reviewRequest } from "../../../../api/services/requestService";

export default function RatingModal({ setShowRatingModal, request }) {
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
        ratingData.comment
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      queryClient.invalidateQueries({ queryKey: ["request", request.id] });
      setShowRatingModal(false);
    },
  });

  const handleSubmitRating = (data) => {
    if (data.rating === 0) return;
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
              <h3>Оцените работу</h3>
              <button type="button" onClick={() => setShowRatingModal(false)}>
                ✕
              </button>
            </div>

            <div className={styles.ratingStars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <StarSolidIcon
                  key={star}
                  className={`${styles.star} ${
                    (hoveredRating || selectedRating) >= star
                      ? styles.starActive
                      : ""
                  }`}
                  onClick={() => {
                    ratingMethods.setValue("rating", star);
                  }}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                />
              ))}
            </div>

            <InputField
              label={"Комментарий"}
              placeholder="Оставьте комментарий к оценке (необязательно)"
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
                Отмена
              </Button>
              <Button type="submit" disabled={rateMutation.isPending}>
                {rateMutation.isPending ? "Отправка..." : "Отправить"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
