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
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function MyRequests() {
  const t = useT();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState({
    requestStatus: undefined,
    startDate: undefined,
    endDate: undefined,
  });
  const [notification, setNotification] = useState(null);

  const { data: requests, isLoading } = useQuery({
    queryKey: ["requests", filters],
    queryFn: () =>
      getMyRequests(filters.requestStatus, filters.startDate, filters.endDate),
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

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

          <MyRequestsFilters onFilterChange={handleFilterChange} />
        </div>
      </div>
      <Modal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
        <CreateRequestModal
          onSuccess={() => {
            setIsModalOpen(false);
            queryClient.invalidateQueries({ queryKey: ["requests"] });
          }}
        />
      </Modal>
    </div>
  );
}
