import React, { useState } from "react";
import { ReactComponent as MascotIcon } from "../../assets/mascot.svg";
import MainHeroContent from "../MainHeroContent/MainHeroContent";
import MainHeroTitle from "../MainHeroTitle/MainHeroTitle";
import MainHeroStats from "../MainHeroStats/MainHeroStats";
import styles from "./MainHero.module.css";
import CreateRequestModal from "../../features/modals/CreateRequestModal/CreateRequestModal";
import Modal from "../../features/modals/Modal/Modal";
import Button from "../../common/Button/Button";
import { useT } from "../../utils/useT";

export default function MainHero() {
  const t = useT();
  const [openModal, setOpenModal] = useState(false);

  const handleCTAButtonClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className={styles.wrapper}>
      <MascotIcon className={styles.image} />
      <MainHeroContent>
        <MainHeroTitle />
        <MainHeroStats />
        <Button onClick={handleCTAButtonClick}>
          {t("main.createRequest")}
        </Button>
        <Modal isOpen={openModal} onClose={handleCloseModal}>
          <CreateRequestModal onSuccess={handleCloseModal} />
        </Modal>
      </MainHeroContent>
    </div>
  );
}
