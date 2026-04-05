import React, { useState } from "react";
import styles from "./MyRequests.module.css";
import { useT } from "../../utils/useT";
import Loader from "../../common/Loader/Loader";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import MyRequestsList from "./components/MyRequestsList/MyRequestsList";
import MyRequestsNewRequest from "./components/MyRequestsNewRequest/MyRequestsNewRequest";
import MyRequestsFilters from "./components/MyRequestsFilters/MyRequestsFilters";
import Modal from "../../features/modals/Modal/Modal";
import CreateRequestModal from "../../features/modals/CreateRequestModal/CreateRequestModal";
import PageHeader from "../../common/PageHeader/PageHeader";
import { getMyRequests } from "../../api/services/requestService";
import Notification from "../../common/Notification/Notification";
import { useQuery } from "@tanstack/react-query";

export default function MyRequests() {
  const t = useT();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [notification, setNotification] = useState(null);

  const { data: requests, isLoading } = useQuery({
    queryKey: ["requests"],
    queryFn: getMyRequests,
  });

  if (isLoading) return <Loader />;

  return (
    <div className={styles.wrapper}>
      {notification && (
        <Notification
          duration={3000}
          onClose={() => setNotification(null)}
          type={notification.type}
        >
          <div>{notification.message}</div>
        </Notification>
      )}
      <PageHeader
        title={t("requests.title")}
        icon={ClipboardDocumentListIcon}
      />

      <div className={styles.section}>
        <div className={styles.sectionItem1}>
          <MyRequestsList requests={requests} />
        </div>

        <div className={styles.sectionItem2}>
          <MyRequestsNewRequest
            handleCreateRequest={() => setIsModalOpen(true)}
          />

          <MyRequestsFilters
            allRequests={requests}
            selectedStatus={selectedStatus}
            startDate={startDate}
            endDate={endDate}
            onStatusChange={setSelectedStatus}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            onFilterSubmit={() => {
              console.log("asd");
            }}
          />
        </div>
      </div>
      <Modal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
        <CreateRequestModal onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}
