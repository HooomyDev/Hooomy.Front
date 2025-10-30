import React, { useState } from "react";
import { ReactComponent as MascotIcon } from "../../assets/mascot.svg";
import MainHeroContent from "../MainHeroContent/MainHeroContent";
import MainHeroTitle from "../MainHeroTitle/MainHeroTitle";
import MainHeroStats from "../MainHeroStats/MainHeroStats";
import MainHeroCTAButton from "../MainHeroCTAButton/MainHeroCTAButton";
import styles from "./MainHero.module.css";
import CreateRequestModal from "../modals/CreateRequestModal/CreateRequestModal";
import Modal from "../Modal/Modal";

export default function MainHero() {
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
        <MainHeroCTAButton onClick={handleCTAButtonClick} />
        <Modal isOpen={openModal} onClose={handleCloseModal}>
          <CreateRequestModal onSuccess={handleCloseModal} />
        </Modal>
      </MainHeroContent>
    </div>
  );
}
