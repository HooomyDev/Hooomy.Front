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

const categoryMap = {
  0: "Все",
  1: "Водоснабжение. Горячая вода",
  2: "Электроснабжение",
  3: "Бытовые услуги",
  4: "Санитарное состояние многоквартирного дома",
  5: "Отопление",
  6: "Благоустройство территории",
  7: "Водоснабжение",
  8: "Общестроительные работы",
  9: "Санитарное состояние территории",
  11: "Техническое обслуживание ЗПУ",
  12: "Техническое обслуживание лифта",
  13: "Обращение с ТКО",
  14: "Водоснабжение. Холодная вода",
  15: "Канализация",
  16: "Автомобильные дороги, тротуары",
  17: "Кровельные работы",
  18: "Уличное освещение",
  19: "Общественные места (Парки, скверы)",
  20: "Работы по ремонту стыков",
  21: "Техническое обслуживание зданий и сооружений",
  22: "Рекламные и информационные конструкции и объявления",
};

export default function MyRequestsList({ requests }) {
  const t = useT();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const statusMap = {
    1: "На модерации",
    2: "Создана",
    3: "Отклонена",
    4: "В процессе",
    5: "Выполнена",
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
                        {categoryMap[req.category]}
                      </span>
                    </div>

                    <div className={styles.infoRowCategory}>
                      <span className={styles.infoLabel}>
                        <MapPinIcon className={styles.icon} /> Адрес:{" "}
                        {req.address}
                      </span>
                    </div>

                    <div className={styles.infoRow}>
                      <span className={styles.infoLabel}>
                        <CalendarDateRangeIcon className={styles.icon} /> Дата:{" "}
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
