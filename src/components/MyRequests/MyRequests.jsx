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
import testImage from "../../assets/test.png";
import PageHeader from "../../common/PageHeader/PageHeader";

export default function MyRequests() {
  const t = useT();
  const [allRequests, setAllRequests] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateRequest = () => {
    // TODO: реализовать создание новой заявки
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function fetchRequests() {
      try {
        setLoading(true);

        // имитация загрузки
        //await new Promise((resolve) => setTimeout(resolve, 2000));

        // TODO: подключить реальные данные
        const data = [
          {
            id: 1,
            title: "Заявка на ремонт",
            status: "В обработке",
            date: "2025-12-01",
            district: "Центральный",
            street: "Независимости",
            house: "10",
            entrance: "2",
            floor: "5",
            apartment: "45",
            description: "Необходимо отремонтировать ванную комнату",
            photo: testImage,
            location: { lat: 53.9, lng: 27.5667 },
          },
          {
            id: 2,
            title: "Заявка на уборку",
            status: "Выполнено",
            date: "2025-12-03",
            district: "Советский",
            street: "Купалы",
            house: "15",
            entrance: "1",
            floor: "3",
            apartment: "12",
            description: "Уборка квартиры после ремонта",
            photo: testImage,
            location: { lat: 53.91, lng: 27.55 },
          },
          {
            id: 3,
            title: "Заявка на доставку",
            status: "Отклонено",
            date: "2025-12-05",
            district: "Партизанский",
            street: "Московская",
            house: "20",
            entrance: "3",
            floor: "7",
            apartment: "70",
            description: "Доставка мебели",
            photo: testImage,
            location: { lat: 53.92, lng: 27.57 },
          },
          {
            id: 4,
            title: "Заявка на ремонт",
            status: "В обработке",
            date: "2025-12-10",
            district: "Фрунзенский",
            street: "Пушкина",
            house: "5",
            entrance: "4",
            floor: "9",
            apartment: "90",
            description: "Ремонт электрики",
            photo: testImage,
            location: { lat: 53.93, lng: 27.58 },
          },
        ];

        setAllRequests(data);
        setRequests(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, []);

  const handleFilterSubmit = (filtered) => {
    setRequests(filtered);
  };

  const onFilterSelect = (value) => {
    if (value === "all") {
      setSelectedFilters([{ value: "all", label: t("requests.all") }]);
      return;
    }

    let updatedFilters = [...selectedFilters];

    if (value !== "all" && updatedFilters.some((f) => f.value === "all")) {
      updatedFilters = updatedFilters.filter((f) => f.value !== "all");
    }

    if (!updatedFilters.some((f) => f.value === value)) {
      updatedFilters.push({ value, label: t(`requests.${value}`) });
    }

    setSelectedFilters(updatedFilters);
  };

  const handleRemoveFilter = (value) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.filter((filter) => filter.value !== value.value)
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.wrapper}>
      <PageHeader
        title={t("requests.title")}
        icon={ClipboardDocumentListIcon}
      />

      <div className={styles.section}>
        <div className={styles.sectionItem1}>
          <MyRequestsList requests={requests} />
        </div>

        <div className={styles.sectionItem2}>
          <MyRequestsNewRequest handleCreateRequest={handleCreateRequest} />

          <MyRequestsFilters
            allRequests={allRequests}
            selectedFilters={selectedFilters}
            onFilterSubmit={handleFilterSubmit}
            onFilterSelect={onFilterSelect}
            onRemoveFilter={handleRemoveFilter}
          />
        </div>
      </div>
      <Modal onClose={handleCloseModal} isOpen={isModalOpen}>
        <CreateRequestModal onSuccess={handleCloseModal} />
      </Modal>
    </div>
  );
}
