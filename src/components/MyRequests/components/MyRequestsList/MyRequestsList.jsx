import React, { useState } from "react";
import styles from "./MyRequestsList.module.css";
import {
  CalendarDateRangeIcon,
  DocumentChartBarIcon,
  ListBulletIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import Modal from "../../../../features/modals/Modal/Modal";
import RequestDetailsModal from "../../../../features/modals/RequestDetailsModal/RequestDetailsModal";
import { format } from "date-fns";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import { useT } from "../../../../utils/useT";
import Block from "../../../../common/Block/Block";
import EmptyBlock from "../../../../common/EmptyBlock/EmptyBlock";
import { categoryMap } from "../../../../stores/categories";

export default function MyRequestsList({ requests }) {
  const t = useT();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const statusMap = {
    1: t("requests.moder"),
    2: t("employeeRequests.status.new"),
    3: t("requests.rejected"),
    4: t("requests.pending"),
    5: t("employeeRequests.status.completed"),
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
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.title}>{req.title}</h3>
                    <div
                      className={`${styles.badge} ${
                        styles[`badge${req.status}`]
                      }`}
                    >
                      {statusMap[req.status]}
                    </div>
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>
                        <DocumentChartBarIcon className={styles.icon} />
                        {t(`statistic.categories.${categoryMap[req.category]}`)}
                      </span>
                    </div>

                    <div className={styles.infoRowCategory}>
                      <span className={styles.infoLabel}>
                        <MapPinIcon className={styles.icon} />{" "}
                        {t("common.address")}: {req.address}
                      </span>
                    </div>

                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>
                        <CalendarDateRangeIcon className={styles.icon} />{" "}
                        {t("requests.date")}:{" "}
                        {format(new Date(req.createdAt), "dd.MM.yyyy HH:mm")}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <RequestDetailsModal
          request={selectedRequest}
          onClose={handleCloseModal}
        />
      </Modal>
    </Block>
  );
}
