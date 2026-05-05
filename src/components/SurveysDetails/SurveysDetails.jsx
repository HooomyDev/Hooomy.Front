import React, { useEffect, useRef, useState } from "react";
import styles from "./SurveysDetails.module.css";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSurvayDetails,
  submitSurveyAnswer,
} from "../../api/services/survaceService";
import Loader from "../../common/Loader/Loader";
import {
  CheckCircleIcon,
  ClipboardDocumentCheckIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import SurveyResults from "./components/SurveyResults/SurveyResults";
import SurveyForm from "./components/SurveyForm/SurveyForm";
import Notification from "../../common/Notification/Notification";

export default function SurveysDetails() {
  const { surveyId } = useParams();
  const bottomRef = useRef(null);
  const queryClient = useQueryClient();
  const [notification, setNotification] = useState(null);

  const {
    data: survey,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["survey", surveyId],
    queryFn: async () => await getSurvayDetails(surveyId),
    enabled: !!surveyId,
  });

  const iconMap = {
    1: CheckCircleIcon,
    2: ClipboardDocumentCheckIcon,
  };

  const Icon = ({ type }) => {
    const IconComponent = iconMap[type];
    return IconComponent ? (
      <IconComponent className={styles.icon} />
    ) : (
      <StarIcon className={styles.icon} />
    );
  };

  const submitMutation = useMutation({
    mutationFn: async (answerData) => {
      return await submitSurveyAnswer(surveyId, answerData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["survey", surveyId] });
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    },
  });

  const methods = useForm({
    defaultValues: {
      surveyAnswer: null,
      surveyCheckbox: {},
    },
  });

  const onSubmit = async (data) => {
    let answerData;

    if (survey.type === 1) {
      answerData = {
        type: 1,
        optionId: data.surveyAnswer,
      };
    } else if (survey.type === 2) {
      const selectedIds = Object.keys(data.surveyCheckbox).filter(
        (key) => data.surveyCheckbox[key] !== false
      );

      answerData = {
        type: 2,
        optionIds: selectedIds,
      };
    }

    await submitMutation.mutateAsync(answerData);
  };

  useEffect(() => {
    if (isError) {
      setNotification({
        type: "error",
        message: "Произошла ошибка во время загрузки опроса",
      });
    }
  }, [isError]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) return;

  return (
    <div className={styles.wrapper}>
      {notification && (
        <Notification
          duration={3000}
          onClose={() => setNotification(null)}
          type={notification.type}
        >
          <div>{notification.message}</div>
        </Notification>
      )}
      <div className={styles.container}>
        <SurveyForm
          Icon={Icon}
          survey={survey}
          onSubmit={onSubmit}
          methods={methods}
        />
        <SurveyResults survey={survey} />
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
