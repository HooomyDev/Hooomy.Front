import React, { useState } from "react";
import styles from "./EmployeeRequests.module.css";
import PageHeader from "../../common/PageHeader/PageHeader";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import EmployeeRequestsControls from "../EmployeeRequestsControls/EmployeeRequestsControls";
import EmployeeRequestsTable from "../EmployeeRequestsTable/EmployeeRequestsTable";
import RequestDetailsModal from "../../features/modals/RequestDetailsModal.v2/RequestDetailsModal.v2";
import Modal from "../../features/modals/Modal/Modal";
import { useT } from "../../utils/useT";

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
    photo: null,
    location: { lat: 53.9, lng: 27.5667 },
    comments: [
      {
        text: "Сантехник назначен на завтра",
        author: "Иванов И.И.",
        time: "2025-12-01 14:30",
      },
    ],
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
    photo: null,
    location: { lat: 53.91, lng: 27.55 },
    comments: [
      {
        text: "Уборка выполнена успешно",
        author: "Петров П.П.",
        time: "2025-12-03 16:45",
      },
    ],
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
    photo: null,
    location: { lat: 53.92, lng: 27.57 },
    comments: [
      {
        text: "Доставка перенесена на следующую неделю",
        author: "Сидоров С.С.",
        time: "2025-12-05 11:20",
      },
    ],
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
    photo: null,
    location: { lat: 53.93, lng: 27.58 },
    comments: [],
  },
];

export default function EmployeeRequests() {
  const t = useT();

  const [requests, setRequests] = useState(data);
  const [searchTerm] = useState("");
  const [statusFilter] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [newComment, setNewComment] = useState("");

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.apartment.includes(searchTerm) ||
      `${request.street} ${request.house}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };

  const handleAddComment = (id) => {
    if (!newComment.trim()) return;

    const comment = {
      text: newComment,
      author: t("employeeRequests.defaultAuthor"),
      time: new Date().toLocaleString("ru-RU"),
    };

    setRequests((prev) =>
      prev.map((request) =>
        request.id === id
          ? {
              ...request,
              comments: [...(request.comments || []), comment],
            }
          : request
      )
    );

    setNewComment("");
  };

  const handlePhotoUpload = (id, file) => {
    const formData = new FormData();
    formData.append("photo", file);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
    setNewComment("");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "В обработке":
        return "orange";
      case "Выполнено":
        return "green";
      case "Отклонено":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div className={styles.wrapper}>
      <PageHeader
        title={t("employeeRequests.header")}
        icon={ClipboardDocumentListIcon}
      />

      <div className={styles.container}>
        <EmployeeRequestsControls />

        <div className={styles.requestsTable}>
          {filteredRequests.length > 0 ? (
            <EmployeeRequestsTable
              requests={requests}
              onSelectRequest={setSelectedRequest}
              onStatusChange={handleStatusChange}
              getStatusColor={getStatusColor}
            />
          ) : (
            <div className={styles.emptyState}>
              <p>{t("employeeRequests.empty")}</p>
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={!!selectedRequest} onClose={handleCloseModal}>
        <RequestDetailsModal
          request={selectedRequest}
          onStatusChange={handleStatusChange}
          onAddComment={handleAddComment}
          onPhotoUpload={handlePhotoUpload}
          newComment={newComment}
          onNewCommentChange={setNewComment}
          getStatusColor={getStatusColor}
        />
      </Modal>
    </div>
  );
}
