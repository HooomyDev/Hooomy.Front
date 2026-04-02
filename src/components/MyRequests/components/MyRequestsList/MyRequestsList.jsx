import React, { useState } from "react";
import styles from "./MyRequestsList.module.css";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import Modal from "../../../../features/modals/Modal/Modal";
import RequestDetailsModal from "../../../../features/modals/RequestDetailsModal/RequestDetailsModal";
import { format } from "date-fns";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import { useT } from "../../../../utils/useT";
import Block from "../../../../common/Block/Block";
import EmptyBlock from "../../../../common/EmptyBlock/EmptyBlock";

export default function MyRequestsList({ requests }) {
  const t = useT();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const statusClassMap = {
    1: styles.created,
    2: styles.rejected,
    3: styles.pending,
    4: styles.done,
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
          <EmptyBlock Icon={ClipboardDocumentListIcon}>
            {t("requests.empty")}
          </EmptyBlock>
        ) : (
          <ul className={styles.list}>
            {requests.map((req) => (
              <li
                key={req.id}
                className={styles.item}
                onClick={() => handleOpenModal(req)}
              >
                <span className={styles.reqTitle}>
                  {req.title.slice(0, 9) + "..."}
                </span>
                <span className={styles.reqDate}>
                  {format(new Date(req.createdAt), "dd.MM.yyyy HH:mm")}
                </span>
                <div className={styles.status}>
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
