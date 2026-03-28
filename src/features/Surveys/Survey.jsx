import React from "react";
import {
  CheckCircleIcon,
  ClipboardDocumentCheckIcon,
  SignalIcon,
  PencilSquareIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import styles from "./Survey.module.css";
import Button from "../../common/Button/Button";
import { useT } from "../../utils/useT";
import { useNavigate } from "react-router-dom";
import routes from "../../stores/routes.json";

export default function Survey({
  id,
  title = "Survey Title",
  type = 1,
  isActive = true,
  companyName = "",
}) {
  const t = useT();
  const navigate = useNavigate();

  const handleSurveyClick = (surveyId) => {
    navigate(`${routes.news}/${surveyId}`);
  };

  const iconMap = {
    1: CheckCircleIcon,
    2: ClipboardDocumentCheckIcon,
    3: PencilSquareIcon,
    4: SignalIcon,
  };

  const Icon = ({ type }) => {
    const IconComponent = iconMap[type];
    return IconComponent ? (
      <IconComponent className={styles.surveyIcon} />
    ) : (
      <StarIcon className={styles.surveyIcon} />
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.title}>
          <Icon type={type} />
          {title}
        </div>
        <div className={styles.info}>{companyName}</div>
      </div>

      <Button
        type="submit"
        variant="primary"
        disabled={!isActive}
        onClick={() => handleSurveyClick(id)}
      >
        {t("surveys.voite")}
      </Button>
    </div>
  );
}
