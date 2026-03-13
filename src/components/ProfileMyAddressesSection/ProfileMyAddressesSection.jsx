import React, { useState, useEffect } from "react";
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

export default function ProfileMyAddressesSection() {
  const user = useAuthStore((store) => store.user);
  const t = useT();

  const [favAddresses, setFavAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const methods = useForm();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await getFavoriteAddresses();

        setFavAddresses(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAddresses();
  }, []);

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

  const handleSaveAddress = async (data) => {
    if (editingAddress) {
      await updateFavoriteAddress(data);
    } else {
      await createFavoriteAddress(data);
    }

    const addresses = await getFavoriteAddresses();
    setFavAddresses(addresses);

    setIsModalOpen(false);
    methods.reset();
  };

  const handleDeleteClick = async (data) => {
    await deleteFavoriteAddress(data);

    const addresses = await getFavoriteAddresses();

    setFavAddresses(addresses);
  };

  if (user.role === "employee") return null;

  return (
    <Block title={t("profile.addresses")} Icon={HomeIcon}>
      <div className={styles.list}>
        {favAddresses &&
          favAddresses.map((item) => (
            <AddressCard
              key={item.id}
              item={item}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
            />
          ))}

        <div className={styles.item}>
          <div className={styles.itemPseudonym}>{t("profile.newAddress")}</div>
          <div className={styles.itemAddress}>
            {t("profile.newAddressMessage")}
          </div>
          <button className={styles.addButton} onClick={handleAddClick}>
            <PlusCircleIcon className={styles.icon} /> {t("profile.addAddress")}
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <FavoriteAddressModal
          editingAddress={editingAddress}
          handleSaveAddress={handleSaveAddress}
          methods={methods}
        />
      </Modal>
    </Block>
  );
}
