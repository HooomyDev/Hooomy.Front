import React from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import routes from "../../stores/routes.json";
import styles from "./GuestBanner.module.css";

export default function GuestBanner({ user }) {
  const navigate = useNavigate();

  return (
    <>
      {!user && (
        <div class={styles.guestBanner}>
          <QuestionMarkCircleIcon className={styles.guestBannerIcon} />

          <div class={styles.guestBannerContent}>
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
              <button
                class={styles.guestBannerAccentButton}
                onClick={() => navigate(routes.register)}
              >
                Зарегистрироваться
              </button>

              <button
                class={styles.guestBannerButton}
                onClick={() => navigate(routes.login)}
              >
                Войти
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
