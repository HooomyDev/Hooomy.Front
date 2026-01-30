import React, { useEffect, useState } from "react";
import styles from "./MyRequests.module.css";
import { useT } from "../../utils/useT";
import Loader from "../../common/Loader/Loader";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import MyRequestsList from "../MyRequestsList/MyRequestsList";
import MyRequestsNewRequest from "../MyRequestsNewRequest/MyRequestsNewRequest";
import MyRequestsFilters from "../MyRequestsFilters/MyRequestsFilters";
import Modal from "../../features/modals/Modal/Modal";
import CreateRequestModal from "../../features/modals/CreateRequestModal/CreateRequestModal";
import PageHeader from "../../common/PageHeader/PageHeader";
import { getMyRequests } from "../../api/services/requestService";
import { useAuthStore } from "../../stores/authStore";
import Notification from "../../common/Notification/Notification";

export default function MyRequests() {
  const t = useT();
  const [allRequests, setAllRequests] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useAuthStore((store) => store.user);

  const [selectedStatus, setSelectedStatus] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [notification, setNotification] = useState(null);

  const handleCreateRequest = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function fetchRequests() {
      try {
        setLoading(true);

        const data = await getMyRequests(user.id);

        setAllRequests(data);
        setRequests(data);
      } catch (error) {
        setNotification({
          type: "error",
          message: "Возникли проблемы при загрузке заявок",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, [user.id]);

  const handleFilterSubmit = (filtered) => {
    setRequests(filtered);
  };

  if (loading) return <Loader />;

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
          <MyRequestsFilters
            allRequests={allRequests}
            selectedStatus={selectedStatus}
            startDate={startDate}
            endDate={endDate}
            onStatusChange={setSelectedStatus}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            onFilterSubmit={handleFilterSubmit}
          />
          <MyRequestsNewRequest handleCreateRequest={handleCreateRequest} />
        </div>
      </div>
      <Modal onClose={handleCloseModal} isOpen={isModalOpen}>
        <CreateRequestModal onSuccess={handleCloseModal} />
      </Modal>
    </div>
  );
}
