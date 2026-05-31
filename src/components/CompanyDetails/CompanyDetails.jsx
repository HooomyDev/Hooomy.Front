import React, { useRef, useState } from "react";
import styles from "./CompanyDetails.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCompanyDetails,
  deleteCompany,
  removeAddressFromCompany,
  uploadLogo,
} from "../../api/services/companyService";
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
  StarIcon,
} from "@heroicons/react/24/solid";
import {
  ExclamationTriangleIcon,
  PlusIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import Block from "../../common/Block/Block";
import Button from "../../common/Button/Button";
import EmptyBlock from "../../common/EmptyBlock/EmptyBlock";
import { createChat } from "../../api/services/chatService";
import routes from "../../stores/routes.json";
import { useAuthStore } from "../../stores/authStore";
import Notification from "../../common/Notification/Notification";
import AddAddressToCompanyModal from "../../features/modals/AddAddressToCompanyModal/AddAddressToCompanyModal";
import ConfirmDialog from "../../common/ConfirmDialog/ConfirmDialog";
import EditCompanyModal from "../../features/modals/EditCompanyModal/EditCompanyModal";
import {
  getUsersForCompany,
  removeUserFromCompany,
} from "../../api/services/userService";
import AddUserToCompanyModal from "../../features/modals/AddUserToCompanyModal/AddUserToCompanyModal";
import CreateComplaintModal, {
  COMPLAINT_TYPES,
} from "../../features/modals/CreateComplaintModal/CreateComplaintModal";
import { useT } from "../../utils/useT";
import { format } from "date-fns";

export default function CompanyDetails() {
  const t = useT();
  const { companyId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useAuthStore((store) => store.user);
  const [notification, setNotification] = useState(null);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const fileInputRef = useRef(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);

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
        message: t("companyDetails.notifications.deleteCompanyError"),
      }),
  });

  const removeUserMutation = useMutation({
    mutationFn: (userId) => removeUserFromCompany(userId),
    onSuccess: () => {
      setUserToDelete(null);
      queryClient.invalidateQueries({
        queryKey: ["companyEmployees", companyId],
      });
    },
    onError: () =>
      setNotification({
        type: "error",
        message: t("companyDetails.notifications.deleteEmployeeError"),
      }),
  });

  const removeAddressMutation = useMutation({
    mutationFn: (addressId) => removeAddressFromCompany(companyId, addressId),
    onSuccess: () => {
      setAddressToDelete(null);
      queryClient.invalidateQueries({ queryKey: ["company", companyId] });
    },
    onError: () =>
      setNotification({
        type: "error",
        message: t("companyDetails.notifications.deleteAddressError"),
      }),
  });

  const createChatMutation = useMutation({
    mutationKey: ["createChat"],
    mutationFn: () => createChat(companyId),
    onSuccess: (data) => {
      console.log("Chat created:", data);
      navigate(routes.chats);
    },
    onError: (error) => {
      console.error("Failed to create chat:", error);
      navigate(routes.chat);
    },
  });

  const uploadLogoMutation = useMutation({
    mutationFn: (file) => {
      const formData = new FormData();
      formData.append("logo", file);
      return uploadLogo(companyId, formData);
    },
    onMutate: () => setIsUploadingLogo(true),
    onSuccess: () => {
      setIsUploadingLogo(false);
      queryClient.invalidateQueries({ queryKey: ["company", companyId] });
      setNotification({
        type: "success",
        message: t("companyDetails.notifications.logoUploaded"),
      });
    },
    onError: () => {
      setIsUploadingLogo(false);
      setNotification({
        type: "error",
        message: t("companyDetails.notifications.logoUploadError"),
      });
    },
  });

  const handleLogoSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    uploadLogoMutation.mutate(file);
    event.target.value = "";
  };

  const handleClick = () => {
    if (!user) {
      setNotification({
        type: "error",
        message: t("companyDetails.notifications.authRequired"),
      });
      return;
    }

    if (user.status === "Pending") {
      setNotification({
        type: "error",
        message: t("companyDetails.notifications.emailNotConfirmed"),
      });
      return;
    }

    createChatMutation.mutate(companyId);
    navigate(routes.chats);
  };

  // 🔹 Локализация дат
  const dateLocale = t.dateLocale;
  const formatDate = (dateString) => {
    if (!dateString) return t("info.noValue");
    return format(new Date(dateString), "dd.MM.yyyy", { locale: dateLocale });
  };

  if (isLoading) return <Loader />;

  const infoItems = [
    {
      label: t("companyDetails.info.phone"),
      value: company?.phone,
      icon: <PhoneArrowDownLeftIcon className={styles.icon} />,
    },
    {
      label: t("companyDetails.info.email"),
      value: company?.email,
      icon: <EnvelopeIcon className={styles.icon} />,
    },
    {
      label: t("companyDetails.info.address"),
      value: company?.address,
      icon: <GlobeEuropeAfricaIcon className={styles.icon} />,
    },
    {
      label: t("companyDetails.info.workingHours"),
      value: company?.workingHours,
      icon: <ClockIcon className={styles.icon} />,
    },
    {
      label: t("companyDetails.info.registeredAt"),
      value: formatDate(company?.createdAt),
      icon: <CalendarIcon className={styles.icon} />,
    },
    {
      label: t("companyDetails.info.rating"),
      value: company?.averageRating ?? 0,
      icon: <StarIcon className={styles.icon} />,
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
              <div className={styles.header}>
                <h1>{company?.name}</h1>
                {user?.role !== "Admin" && (
                  <Button
                    variant="secondary"
                    className={styles.submitButton}
                    onClick={() => {
                      setSelectedCompany(company);
                      setIsComplaintModalOpen(true);
                    }}
                    aria-label={t("companyDetails.actions.complain")}
                    title={t("companyDetails.actions.complain")}
                  >
                    <ExclamationTriangleIcon className={styles.submitIcon} />
                  </Button>
                )}
              </div>
              {user?.role === "Admin" && (
                <div className={styles.headerActions}>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className={styles.fileInput}
                    onChange={handleLogoSelect}
                    hidden
                    aria-label={t("companyDetails.actions.uploadLogo")}
                  />
                  <Button
                    className={styles.uploadBtn}
                    title={t("companyDetails.actions.uploadLogo")}
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingLogo}
                    aria-label={t("companyDetails.actions.uploadLogo")}
                  >
                    <ArrowUpTrayIcon className={styles.btnIcon} />
                  </Button>
                  <Button
                    className={styles.editBtn}
                    title={t("companyDetails.actions.edit")}
                    onClick={() => setIsEditOpen(true)}
                    aria-label={t("companyDetails.actions.edit")}
                  >
                    <PencilIcon className={styles.btnIcon} />
                  </Button>
                  <Button
                    className={styles.deleteBtn}
                    title={t("companyDetails.actions.delete")}
                    onClick={() => setIsDeleteOpen(true)}
                    aria-label={t("companyDetails.actions.delete")}
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
                  <div className={styles.infoValue}>
                    {item.value || t("companyDetails.info.noValue")}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.actions}>
              {user?.role === "Resident" && (
                <>
                  <Button
                    variant="secondary"
                    className={styles.actionButton}
                    onClick={() => navigate(-1)}
                  >
                    {t("companyDetails.actions.back")}
                  </Button>
                  <Button
                    className={styles.actionButton}
                    onClick={() => handleClick()}
                    disabled={user?.status === "Pending" || !user}
                  >
                    {t("companyDetails.actions.write")}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </Block>

      {/* Отзывы */}
      <div className={styles.addressHeader}>
        <StarIcon className={styles.icon} />
        <h2>{t("companyDetails.sections.reviews")}</h2>
      </div>
      <Block>
        {!company.reviews || company.reviews.length === 0 ? (
          <EmptyBlock Icon={StarIcon}>
            {t("companyDetails.emptyStates.noReviews")}
          </EmptyBlock>
        ) : (
          <div className={styles.reviewsList}>
            {company.reviews.map((review) => (
              <div key={review.id} className={styles.reviewItem}>
                <div className={styles.reviewHeader}>
                  <UserIcon className={styles.icon} />
                  <div className={styles.reviewScore}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`${styles.star} ${
                          i < review.score ? styles.starFilled : ""
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <div className={styles.date}>
                    {formatDate(review.createdAt)}
                  </div>
                </div>
                {review.text && review.text.trim() !== "" ? (
                  <div className={styles.reviewText}>{review.text}</div>
                ) : (
                  <div className={styles.reviewText}>
                    {t("companyDetails.reviews.noComment")}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Block>

      {/* Обслуживаемые адреса */}
      <div className={styles.addressHeader}>
        <MapPinIcon className={styles.icon} />
        <h2>{t("companyDetails.sections.addresses")}</h2>
        {user?.role === "Admin" && (
          <div className={styles.blockActions}>
            <Button
              className={styles.addBtn}
              variant="secondary"
              onClick={() => setIsAddAddressOpen(true)}
              aria-label={t("companyDetails.actions.addAddress")}
              title={t("companyDetails.actions.addAddress")}
            >
              <PlusIcon className={styles.addIcon} />
            </Button>
          </div>
        )}
      </div>
      <Block>
        {!company.addresses || company.addresses.length === 0 ? (
          <EmptyBlock Icon={MapPinIcon}>
            {t("companyDetails.emptyStates.noAddresses")}
          </EmptyBlock>
        ) : (
          <div className={styles.addressList}>
            {company.addresses.map((addr, i) => {
              const addressText = addr.fullAddress ?? addr.street ?? addr;
              return (
                <div key={addr.id ?? i} className={styles.addressItem}>
                  <MapPinIcon className={styles.addressIcon} />
                  <span className={styles.addressText}>{addressText}</span>
                  {user?.role === "Admin" && (
                    <Button
                      className={styles.deleteBtn}
                      title={t("companyDetails.actions.deleteAddress")}
                      onClick={() => setAddressToDelete(addr)}
                      aria-label={t("companyDetails.actions.deleteAddress")}
                    >
                      <TrashIcon className={styles.btnIcon} />
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Block>

      {/* Работники */}
      {user?.role === "Admin" && (
        <>
          <div className={styles.addressHeader}>
            <UsersIcon className={styles.icon} />
            <h2>{t("companyDetails.sections.employees")}</h2>
            <div className={styles.blockActions}>
              <Button
                className={styles.addBtn}
                onClick={() => setIsAddUserOpen(true)}
                variant="secondary"
                aria-label={t("companyDetails.actions.addEmployee")}
                title={t("companyDetails.actions.addEmployee")}
              >
                <PlusIcon className={styles.addIcon} />
              </Button>
            </div>
          </div>
          <Block>
            {isEmployeesLoading ? (
              <Loader />
            ) : employees.length === 0 ? (
              <EmptyBlock Icon={UsersIcon}>
                {t("companyDetails.emptyStates.noEmployees")}
              </EmptyBlock>
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
                    <Button
                      className={styles.deleteBtn}
                      title={t("companyDetails.actions.deleteEmployee")}
                      onClick={() => setUserToDelete(emp)}
                      aria-label={t("companyDetails.actions.deleteEmployee")}
                    >
                      <TrashIcon className={styles.btnIcon} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Block>
        </>
      )}

      {/* Модальные окна */}
      <AddUserToCompanyModal
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        companyId={companyId}
      />

      <ConfirmDialog
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={() => removeUserMutation.mutate(userToDelete.id)}
        title={t("companyDetails.confirmDelete.employee.title")}
        message={t("companyDetails.confirmDelete.employee.message", {
          surname: userToDelete?.surname,
          firstName: userToDelete?.firstName,
        })}
        confirmText={t("companyDetails.confirmDelete.confirm")}
        cancelText={t("companyDetails.confirmDelete.cancel")}
        confirmVariant="danger"
      />

      <ConfirmDialog
        isOpen={!!addressToDelete}
        onClose={() => setAddressToDelete(null)}
        onConfirm={() =>
          removeAddressMutation.mutate(addressToDelete.id ?? addressToDelete)
        }
        title={t("companyDetails.confirmDelete.address.title")}
        message={t("companyDetails.confirmDelete.address.message", {
          address:
            addressToDelete?.fullAddress ??
            addressToDelete?.street ??
            addressToDelete,
        })}
        confirmText={t("companyDetails.confirmDelete.confirm")}
        cancelText={t("companyDetails.confirmDelete.cancel")}
        confirmVariant="danger"
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
        title={t("companyDetails.confirmDelete.company.title")}
        message={t("companyDetails.confirmDelete.company.message", {
          name: company.name,
        })}
        confirmText={t("companyDetails.confirmDelete.confirm")}
        cancelText={t("companyDetails.confirmDelete.cancel")}
        confirmVariant="danger"
      />

      <CreateComplaintModal
        isOpen={isComplaintModalOpen}
        onClose={() => {
          setIsComplaintModalOpen(false);
          setSelectedCompany(null);
        }}
        type={COMPLAINT_TYPES[1]?.value}
        data={selectedCompany}
      />
    </div>
  );
}
