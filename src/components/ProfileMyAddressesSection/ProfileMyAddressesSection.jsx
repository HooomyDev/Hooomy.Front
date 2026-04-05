import React, { useState } from "react";
import styles from "./ProfileMyAddressesSection.module.css";
import { HomeIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import Block from "../../common/Block/Block";
import { useT } from "../../utils/useT";
import { useAuthStore } from "../../stores/authStore";
import AddressCard from "../AddressCard/AddressCard";
import Modal from "../../features/modals/Modal/Modal";
import { useForm } from "react-hook-form";
import {
  createFavoriteAddress,
  deleteFavoriteAddress,
  getFavoriteAddresses,
  updateFavoriteAddress,
} from "../../api/services/favoriteAddressService";
import FavoriteAddressModal from "../../features/modals/FavoriteAddressModal/FavoriteAddressModal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loader from "../../common/Loader/Loader";

export default function ProfileMyAddressesSection() {
  const user = useAuthStore((store) => store.user);
  const t = useT();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const methods = useForm();

  const { data: favAddresses = [], isLoading } = useQuery({
    queryKey: ["favAddresses"],
    queryFn: getFavoriteAddresses,
  });

  const createMutation = useMutation({
    mutationFn: createFavoriteAddress,
    onMutate: async (newAddress) => {
      await queryClient.cancelQueries({ queryKey: ["favAddresses"] });

      const previousAddresses = queryClient.getQueryData(["favAddresses"]);

      queryClient.setQueryData(["favAddresses"], (old) => [
        ...(old || []),
        { ...newAddress, id: `temp-${Date.now()}`, isPending: true },
      ]);

      return { previousAddresses };
    },
    onError: (err, newAddress, context) => {
      queryClient.setQueryData(["favAddresses"], context.previousAddresses);
      console.error("Failed to create address:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favAddresses"] });
    },
    onSuccess: () => {
      setIsModalOpen(false);
      methods.reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateFavoriteAddress,
    onMutate: async (updatedAddress) => {
      await queryClient.cancelQueries({ queryKey: ["favAddresses"] });

      const previousAddresses = queryClient.getQueryData(["favAddresses"]);

      queryClient.setQueryData(["favAddresses"], (old) =>
        old.map((address) =>
          address.id === editingAddress?.id
            ? { ...address, ...updatedAddress, isPending: true }
            : address
        )
      );

      return { previousAddresses };
    },
    onError: (err, updatedAddress, context) => {
      queryClient.setQueryData(["favAddresses"], context.previousAddresses);
      console.error("Failed to update address:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favAddresses"] });
    },
    onSuccess: () => {
      setIsModalOpen(false);
      methods.reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFavoriteAddress,
    onMutate: async (addressToDelete) => {
      await queryClient.cancelQueries({ queryKey: ["favAddresses"] });

      const previousAddresses = queryClient.getQueryData(["favAddresses"]);

      queryClient.setQueryData(["favAddresses"], (old) =>
        old.filter((address) => address.id !== addressToDelete.id)
      );

      return { previousAddresses };
    },
    onError: (err, addressToDelete, context) => {
      queryClient.setQueryData(["favAddresses"], context.previousAddresses);
      console.error("Failed to delete address:", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favAddresses"] });
    },
  });

  const handleAddClick = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
    methods.reset();
  };

  const handleEditClick = (item) => {
    setEditingAddress(item);
    setIsModalOpen(true);
    methods.reset(item);
  };

  const handleSaveAddress = (data) => {
    if (editingAddress) {
      updateMutation.mutate({ ...data, id: editingAddress.id });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDeleteClick = (data) => {
    if (window.confirm(t("profile.confirmDelete"))) {
      deleteMutation.mutate(data);
    }
  };

  if (user.role === "Employee") return null;

  if (isLoading) {
    return <Loader />;
  }

  const isMutating =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  return (
    <Block title={t("profile.addresses")} Icon={HomeIcon}>
      <div className={styles.list}>
        {favAddresses.map((item) => (
          <AddressCard
            key={item.id}
            item={item}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            isPending={item.isPending}
            isDisabled={isMutating}
          />
        ))}

        <div className={styles.item}>
          <div className={styles.itemPseudonym}>{t("profile.newAddress")}</div>
          <div className={styles.itemAddress}>
            {t("profile.newAddressMessage")}
          </div>
          <button
            className={styles.addButton}
            onClick={handleAddClick}
            disabled={isMutating}
          >
            <PlusCircleIcon className={styles.icon} /> {t("profile.addAddress")}
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <FavoriteAddressModal
          editingAddress={editingAddress}
          handleSaveAddress={handleSaveAddress}
          methods={methods}
          isSaving={createMutation.isPending || updateMutation.isPending}
        />
      </Modal>
    </Block>
  );
}
