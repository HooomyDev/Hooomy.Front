import React, { useState } from "react";
import styles from "./MyRequestsList.module.css";
import { useT } from "../../utils/useT";
import Block from "../../common/Block/Block";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import Modal from "../../modals/Modal/Modal";
import RequestDetailsModal from "../../modals/RequestDetailsModal/RequestDetailsModal";

export default function MyRequestsList({ requests }) {
  const t = useT();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const statusClassMap = {
    Выполнено: styles.done,
    "В обработке": styles.pending,
    Отклонено: styles.rejected,
  };

  const handleOpenModal = (req) => {
    setSelectedRequest(req);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
    setIsModalOpen(false);
  };

  return (
    <Block title={t("requests.list")} Icon={ListBulletIcon}>
      <div className={styles.container}>
        {requests.length === 0 ? (
          <div className={styles.message}>{t("requests.empty")}</div>
        ) : (
          <ul className={styles.list}>
            {requests.map((req) => (
              <li
                key={req.id}
                className={styles.item}
                onClick={() => handleOpenModal(req)}
              >
                <span className={styles.reqTitle}>{req.title}</span>
                <span className={styles.reqDate}>{req.date}</span>
                <div className={styles.status}>
                  <span className={styles.reqStatus}>{req.status}</span>
                  <span
                    className={`${styles.reqStatusSquare} ${
                      statusClassMap[req.status] || styles.default
                    }`}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <RequestDetailsModal request={selectedRequest} />
      </Modal>
    </Block>
  );
}
