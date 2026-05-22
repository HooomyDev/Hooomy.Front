import React from "react";
import MainHeroContent from "../MainHeroContent/MainHeroContent";
import MainHeroTitle from "../MainHeroTitle/MainHeroTitle";
import MainHeroStats from "../MainHeroStats/MainHeroStats";
import styles from "./MainHero.module.css";
import Button from "../../common/Button/Button";
import { useT } from "../../utils/useT";
import { useNavigate } from "react-router-dom";
import routes from "../../stores/routes.json";
import { useAuthStore } from "../../stores/authStore";

export default function MainHero() {
  const t = useT();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  return (
    <div className={styles.wrapper}>
      <MainHeroContent>
        <MainHeroTitle />
        <MainHeroStats />
        <Button
          onClick={() => navigate(routes.createRequest)}
          disabled={user?.status !== "Approved"}
        >
          {t("main.createRequest")}
        </Button>
      </MainHeroContent>
    </div>
  );
}
