import React from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import routes from "../../stores/routes.json";
import styles from "./GuestBanner.module.css";
import Button from "../../common/Button/Button";
import { useT } from "../../utils/useT";

export default function GuestBanner({ user }) {
  const navigate = useNavigate();
  const t = useT();

  return (
    <>
      {!user && (
        <div className={styles.guestBanner}>
          <QuestionMarkCircleIcon className={styles.guestBannerIcon} />

          <div className={styles.guestBannerContent}>
            <div className={styles.guestBannerTitle}>
              {t("guestBanner.title")}
            </div>

            <div className={styles.guestBannerText}>
              {t("guestBanner.text1")}
            </div>

            <div className={styles.guestBannerText}>
              {t("guestBanner.text2")}
            </div>

            <div className={styles.guestBannerActions}>
              <Button
                onClick={() => navigate(routes.register)}
                className={styles.guestBannerButton}
              >
                {t("guestBanner.register")}
              </Button>

              <Button
                variant="secondary"
                onClick={() => navigate(routes.login)}
                className={styles.guestBannerButton}
              >
                {t("guestBanner.login")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
