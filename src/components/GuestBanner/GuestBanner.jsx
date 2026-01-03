import React from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import routes from "../../stores/routes.json";
import styles from "./GuestBanner.module.css";
import Button from "../../common/Button/Button";

export default function GuestBanner({ user }) {
  const navigate = useNavigate();

  return (
    <>
      {!user && (
        <div className={styles.guestBanner}>
          <QuestionMarkCircleIcon className={styles.guestBannerIcon} />

          <div className={styles.guestBannerContent}>
            <div className={styles.guestBannerTitle}>Есть вопросы?</div>

            <div className={styles.guestBannerText}>
              Получите быстрые ответы на самые частые вопросы или обратитесь
              напрямую в обслуживающую организацию.
            </div>

            <div className={styles.guestBannerText}>
              Зарегистрируйтесь, чтобы получить полный доступ ко всем функциям
              сервиса.
            </div>

            <div className={styles.guestBannerActions}>
              <Button
                onClick={() => navigate(routes.register)}
                className={styles.guestBannerButton}
              >
                Зарегистрироваться
              </Button>

              <Button
                variant="secondary"
                onClick={() => navigate(routes.login)}
                className={styles.guestBannerButton}
              >
                Войти
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
