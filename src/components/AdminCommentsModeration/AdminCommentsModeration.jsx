import { useState, useEffect } from "react";
import {
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  TrashIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  EyeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { useForm, FormProvider } from "react-hook-form";
import styles from "./AdminCommentsModeration.module.css";
import PageHeader from "../../common/PageHeader/PageHeader";
import InputField from "../../common/InputField/InputField";
import SelectField from "../../common/SelectField/SelectField";
import Block from "../../common/Block/Block";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteComment,
  getRequestComments,
  updateComment,
} from "../../api/services/requestService";
import Loader from "../../common/Loader/Loader";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import Pagination from "../../common/Pagination/Pagination";
import Button from "../../common/Button/Button";
import CommentDetailModal from "./CommentDetailModal";
import EmptyBlock from "../../common/EmptyBlock/EmptyBlock";

export default function AdminCommentsModeration() {
  const queryClient = useQueryClient();

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    status: 0,
    searchText: "",
  });

  const { data, isLoading } = useQuery({
    queryKey: [
      "comments",
      pagination.page,
      pagination.pageSize,
      pagination.status,
      pagination.searchText,
    ],
    queryFn: () =>
      getRequestComments(
        null,
        pagination.page,
        pagination.pageSize,
        pagination.status,
        pagination.searchText
      ),
  });

  const statusMutation = useMutation({
    mutationFn: (comment) => updateComment(comment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "comments",
          pagination.page,
          pagination.pageSize,
          pagination.status,
          pagination.searchText,
        ],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "comments",
          pagination.page,
          pagination.pageSize,
          pagination.status,
          pagination.searchText,
        ],
      });
    },
  });

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [detailModal, setDetailModal] = useState({
    isOpen: false,
    comment: null,
  });

  const methods = useForm({
    defaultValues: {
      searchText: "",
      status: 0,
    },
  });

  const statusOptions = [
    { value: 0, label: "Все статусы" },
    { value: 1, label: "Ожидает проверки" },
    { value: 2, label: "Одобрен" },
    { value: 3, label: "Удален" },
  ];

  const renderStatus = (status) => {
    switch (status) {
      case 1:
        return "Ожидает проверки";
      case 2:
        return "Одобрен";
      case 3:
        return "Удален";
      default:
        return "Неизвестно";
    }
  };

  useEffect(() => {
    let comments;
    if (sortConfig.key) {
      data?.requestComments.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return comments;
  }, [data?.requestComments, sortConfig]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (data) => {
    setPagination((prev) => ({
      ...prev,
      page: 1,
      searchText: data?.searchText || "",
      status: data?.status || 0,
    }));
  };

  const handleViewClick = (comment) => {
    setDetailModal({ isOpen: true, comment });
  };

  const handleCloseDetailModal = () => {
    setDetailModal({ isOpen: false, comment: null });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.wrapper}>
      <PageHeader
        title="Модерация комментариев"
        icon={ChatBubbleLeftRightIcon}
      />

      <div className={styles.content}>
        <Block>
          <FormProvider {...methods}>
            <form
              className={styles.searchBlock}
              onSubmit={methods.handleSubmit(handleSearch)}
            >
              <InputField
                name="searchText"
                label="Поиск"
                placeholder="Текст комментария"
                required={false}
              />

              <SelectField
                name="status"
                label="Статус"
                options={statusOptions}
                required={false}
              />

              <Button
                className={styles.searchButton}
                variant="secondary"
                type="submit"
              >
                <MagnifyingGlassIcon className={styles.icon} />
              </Button>
            </form>

            {data.requestComments.length === 0 ? (
              <EmptyBlock Icon={ChatBubbleLeftRightIcon}>
                Нет комментариев
              </EmptyBlock>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>
                      ID{" "}
                      {sortConfig.key === "id" &&
                        (sortConfig.direction === "asc" ? (
                          <ChevronUpIcon className={styles.sortIcon} />
                        ) : (
                          <ChevronDownIcon className={styles.sortIcon} />
                        ))}
                    </th>
                    <th onClick={() => handleSort("author")}>
                      Автор{" "}
                      {sortConfig.key === "author" &&
                        (sortConfig.direction === "asc" ? (
                          <ChevronUpIcon className={styles.sortIcon} />
                        ) : (
                          <ChevronDownIcon className={styles.sortIcon} />
                        ))}
                    </th>
                    <th>Комментарий</th>
                    <th onClick={() => handleSort("status")}>
                      Статус{" "}
                      {sortConfig.key === "status" &&
                        (sortConfig.direction === "asc" ? (
                          <ChevronUpIcon className={styles.sortIcon} />
                        ) : (
                          <ChevronDownIcon className={styles.sortIcon} />
                        ))}
                    </th>
                    <th>Время создания</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {data.requestComments.map((c) => (
                    <tr key={c.id}>
                      <td className={styles.idCell}>{c.id}</td>
                      <td className={styles.nameCell}>{c.senderName}</td>
                      <td className={styles.textCell}>{c.text}</td>
                      <td className={styles.statusCell}>
                        {renderStatus(c.status)}
                      </td>
                      <td className={styles.dateCell}>
                        {format(new Date(c.createdAt), "dd MMM yyyy, HH:mm", {
                          locale: ru,
                        })}
                      </td>
                      <td className={styles.actions}>
                        <button
                          className={styles.viewButton}
                          title="Подробнее"
                          onClick={() => handleViewClick(c)}
                        >
                          <EyeIcon className={styles.buttonIcon} />
                        </button>
                        <button
                          className={styles.approveButton}
                          title="Одобрить"
                          onClick={() =>
                            statusMutation.mutate({ ...c, status: 2 })
                          }
                        >
                          <CheckCircleIcon className={styles.buttonIcon} />
                        </button>
                        <button
                          className={styles.blockButton}
                          title="Удалить"
                          onClick={() => deleteMutation.mutate(c.id)}
                        >
                          <TrashIcon className={styles.buttonIcon} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </FormProvider>
          <Pagination
            totalPages={data.totalCount / pagination.pageSize + 1}
            currentPage={pagination.page}
            onPageChange={handlePageChange}
          />
        </Block>
      </div>
      <CommentDetailModal
        isOpen={detailModal.isOpen}
        onClose={handleCloseDetailModal}
        comment={detailModal.comment}
      />
    </div>
  );
}
