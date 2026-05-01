import React, { useState, useEffect } from "react";
import styles from "./EmployeeRequests.module.css";
import PageHeader from "../../common/PageHeader/PageHeader";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import EmployeeRequestsControls from "../EmployeeRequestsControls/EmployeeRequestsControls";
import EmployeeRequestsTable from "../EmployeeRequestsTable/EmployeeRequestsTable";
import RequestDetailsModal from "../../features/modals/RequestDetailsModal/RequestDetailsModal";
import Modal from "../../features/modals/Modal/Modal";
import { useT } from "../../utils/useT";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getRequestsForAdmin } from "../../api/services/requestService";
import { useAuthStore } from "../../stores/authStore";
import Loader from "../../common/Loader/Loader";

export default function EmployeeRequests() {
  const t = useT();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [newComment, setNewComment] = useState("");

  // Получаем companyId из данных пользователя
  const companyId = user?.companyId;

  // Загрузка заявок с сервера
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
  });
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    searchTitle: "",
    searchStatus: "",
    searchCategory: "",
  });

  const { data: response, isLoading } = useQuery({
    queryKey: [
      "requests",
      pagination.page,
      pagination.pageSize,
      filters.searchTitle,
      filters.searchStatus,
      filters.searchCategory,
    ],
    queryFn: async () => {
      return await getRequestsForAdmin(
        pagination.page,
        pagination.pageSize,
        filters.searchTitle,
        filters.searchStatus,
        filters.searchCategory
      );
    },
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });

  // // Мутация для изменения статуса
  // const statusMutation = useMutation({
  //   mutationFn: ({ requestId, status }) =>
  //     updateRequestStatus(requestId, status),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["companyRequests"] });
  //     queryClient.invalidateQueries({ queryKey: ["request"] });
  //   },
  // });

  // // Мутация для добавления комментария
  // const commentMutation = useMutation({
  //   mutationFn: ({ requestId, comment }) =>
  //     addRequestComment(requestId, comment),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["companyRequests"] });
  //     queryClient.invalidateQueries({ queryKey: ["request"] });
  //     setNewComment("");
  //   },
  // });

  const handleCloseModal = () => {
    setSelectedRequest(null);
    setNewComment("");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Создан":
        return "#1976d2";
      case "В обработке":
        return "#f57c00";
      case "Выполнено":
        return "#388e3c";
      case "Отклонено":
        return "#d32f2f";
      default:
        return "#999";
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.wrapper}>
      <PageHeader
        title={t("employeeRequests.header")}
        icon={ClipboardDocumentListIcon}
      />

      <div className={styles.container}>
        <EmployeeRequestsControls
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        <div className={styles.requestsTable}>
          {response.requests.length > 0 ? (
            <EmployeeRequestsTable
              requests={response.requests}
              onSelectRequest={setSelectedRequest}
              //onStatusChange={handleStatusChange}
              getStatusColor={getStatusColor}
              //isUpdating={statusMutation.isPending}
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
          onClose={handleCloseModal}
        />
      </Modal>
    </div>
  );
}
