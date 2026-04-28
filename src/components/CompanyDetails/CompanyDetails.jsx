import React, { useState } from "react";
import styles from "./CompanyDetails.module.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getCompanyDetails } from "../../api/services/companyService";
import Loader from "../../common/Loader/Loader";
import {
  CalendarIcon,
  ClockIcon,
  EnvelopeIcon,
  GlobeEuropeAfricaIcon,
  PhoneArrowDownLeftIcon,
  MapPinIcon,
  UserIcon,
  UsersIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import Block from "../../common/Block/Block";
import Button from "../../common/Button/Button";
import EmptyBlock from "../../common/EmptyBlock/EmptyBlock";
import { createChat } from "../../api/services/chatService";
import routes from "../../stores/routes.json";
import { useAuthStore } from "../../stores/authStore";
import Notification from "../../common/Notification/Notification";
import AddAddressToCompanyModal from "../../features/modals/AddAddressToCompanyModal/AddAddressToCompanyModal";
import ConfirmDialog from "../../common/ConfirmDialog/ConfirmDialog";
import { deleteCompany } from "../../api/services/companyService";
import EditCompanyModal from "../../features/modals/EditCompanyModal/EditCompanyModal";
import { getUsersForCompany } from "../../api/services/userService";
import AddUserToCompanyModal from "../../features/modals/AddUserToCompanyModal/AddUserToCompanyModal";

export default function CompanyDetails() {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((store) => store.user);
  const [notification, setNotification] = useState(null);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const { data: company, isLoading } = useQuery({
    queryKey: ["company", companyId],
    queryFn: () => getCompanyDetails(companyId),
  });

  const { data: employees = [], isLoading: isEmployeesLoading } = useQuery({
    queryKey: ["companyEmployees", companyId],
    queryFn: () => getUsersForCompany(companyId),
    enabled: user?.role === "Admin",
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteCompany(companyId),
    onSuccess: () => navigate(routes["companies-data"]),
    onError: () =>
      setNotification({
        type: "error",
        message: "Ошибка при удалении компании",
      }),
  });

  const createChatMutation = useMutation({
    mutationKey: ["createChat"],
    mutationFn: () => createChat(companyId),
    onSuccess: (data) => {
      // Успешно создан чат
      console.log("Chat created:", data);
      navigate(routes.chats);
    },
    onError: (error) => {
      console.error("Failed to create chat:", error);
      navigate(routes.chat);
    },
  });

  const handleClick = () => {
    if (!user) {
      setNotification({
        type: "error",
        message: "Необходимо авторизоваться",
      });
      return;
    }

    if (user.status === "Pending") {
      setNotification({
        type: "error",
        message: "Подтвердите email для создания чата",
      });
      return;
    }

    createChatMutation.mutate(companyId);
  };

  if (isLoading) {
    return <Loader />;
  }

  const infoItems = [
    {
      label: "Телефон",
      value: company.phone,
      icon: <PhoneArrowDownLeftIcon className={styles.icon} />,
    },
    {
      label: "Email",
      value: company.email,
      icon: <EnvelopeIcon className={styles.icon} />,
    },
    {
      label: "Адрес",
      value: company.address,
      icon: <GlobeEuropeAfricaIcon className={styles.icon} />,
    },
    {
      label: "Режим работы",
      value: company.workingHours,
      icon: <ClockIcon className={styles.icon} />,
    },
    {
      label: "Дата регистрации",
      value: new Date(company.createdAt).toLocaleDateString("ru-RU"),
      icon: <CalendarIcon className={styles.icon} />,
    },
  ];

  return (
    <div className={styles.wrapper}>
      {notification && (
        <Notification
          duration={3000}
          onClose={() => setNotification(null)}
          type={notification.type}
        >
          {notification.message}
        </Notification>
      )}

      <Block>
        <div className={styles.blockInner}>
          {company.logoUrl && (
            <div className={styles.logoSide}>
              <img
                src={company.logoUrl}
                alt={company.name}
                className={styles.companyLogo}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          )}
          <div className={styles.blockContent}>
            <div className={styles.companyHeader}>
              <h1>{company.name}</h1>
              {user?.role === "Admin" && (
                <div className={styles.headerActions}>
                  <Button
                    className={styles.editBtn}
                    title="Изменить"
                    onClick={() => setIsEditOpen(true)}
                  >
                    <PencilIcon className={styles.btnIcon} />
                  </Button>
                  <Button
                    className={styles.deleteBtn}
                    title="Удалить"
                    onClick={() => setIsDeleteOpen(true)}
                  >
                    <TrashIcon className={styles.btnIcon} />
                  </Button>
                </div>
              )}
            </div>

            <div className={styles.info}>
              {infoItems.map((item, index) => (
                <div key={index} className={styles.infoCard}>
                  <div className={styles.infoHeader}>
                    {item.icon}
                    <div className={styles.infoLabel}>{item.label}</div>
                  </div>
                  <div className={styles.infoValue}>{item.value || "—"}</div>
                </div>
              ))}
            </div>

            <div className={styles.actions}>
              <Button
                variant="secondary"
                className={styles.actionButton}
                onClick={() => navigate(-1)}
              >
                Назад
              </Button>
              {user?.Role === "Resident" && (
                <Button
                  className={styles.actionButton}
                  onClick={handleClick}
                  disabled={user?.status === "Pending" || !user}
                  isLoading={createChatMutation.isPending}
                >
                  {"Написать"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Block>

      {/* Обслуживаемые адреса */}
      <div className={styles.addressHeader}>
        <MapPinIcon className={styles.icon} />
        <h2>Обслуживаемые адреса</h2>
        {user?.role === "Admin" && (
          <div className={styles.blockActions}>
            <Button
              className={styles.addBtn}
              variant="secondary"
              onClick={() => setIsAddAddressOpen(true)}
            >
              <PlusIcon className={styles.addIcon} />
            </Button>
          </div>
        )}
      </div>
      <Block>
        {!company.addresses || company.addresses.length === 0 ? (
          <EmptyBlock Icon={MapPinIcon}>Адреса не указаны</EmptyBlock>
        ) : (
          <div className={styles.addressList}>
            {company.addresses.map((addr, i) => (
              <div key={i} className={styles.addressItem}>
                <MapPinIcon className={styles.addressIcon} />
                <span>{addr}</span>
              </div>
            ))}
          </div>
        )}
      </Block>

      {/* Работники */}
      <div className={styles.addressHeader}>
        <UsersIcon className={styles.icon} />
        <h2>Работники</h2>
        <div className={styles.blockActions}>
          <Button
            className={styles.addBtn}
            onClick={() => setIsAddUserOpen(true)}
            variant="secondary"
          >
            <PlusIcon className={styles.addIcon} />
          </Button>
        </div>
      </div>
      <Block>
        {isEmployeesLoading ? (
          <Loader />
        ) : employees.length === 0 ? (
          <EmptyBlock Icon={UsersIcon}>Работников пока что нет</EmptyBlock>
        ) : (
          <div className={styles.employeeList}>
            {employees.map((emp) => (
              <div key={emp.id} className={styles.employeeItem}>
                <div className={styles.employeeAvatar}>
                  <UserIcon className={styles.avatarIcon} />
                </div>
                <div className={styles.employeeInfo}>
                  <span className={styles.employeeName}>
                    {emp.surname} {emp.firstName}
                  </span>
                  <span className={styles.employeeRole}>{emp.role}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Block>

      <AddUserToCompanyModal
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        companyId={companyId}
      />

      <EditCompanyModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        company={company}
      />

      <AddAddressToCompanyModal
        isOpen={isAddAddressOpen}
        onClose={() => setIsAddAddressOpen(false)}
        companyId={companyId}
      />

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => deleteMutation.mutate()}
        title="Удалить компанию"
        message={`Вы уверены, что хотите удалить компанию "${company.name}"? Это действие необратимо.`}
        confirmText="Удалить"
        confirmVariant="danger"
      />
    </div>
  );
}
