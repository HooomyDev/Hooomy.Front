import React, { useState, useEffect } from "react";
import styles from "./ProfileMyAddressesSection.module.css";
import { HomeIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import Block from "../../common/Block/Block";
import { useT } from "../../utils/useT";
import { useAuthStore } from "../../stores/authStore";
import AddressCard from "../AddressCard/AddressCard";
import Modal from "../../features/modals/Modal/Modal";
import { streets } from "../../stores/streets";
import AutocompleteField from "../../common/AutocompleteField/AutocompleteField";
import { useForm, FormProvider } from "react-hook-form";
import InputField from "../../common/InputField/InputField";
import Button from "../../common/Button/Button";
import { apiClient as client } from "../../api/client";

export default function ProfileMyAddressesSection() {
  const user = useAuthStore((store) => store.user);
  const t = useT();

  const [favAddresses, setFavAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const allStreets = Object.entries(streets).flatMap(([district, arr]) =>
    arr.map((s) => ({
      value: s.value,
      label: s.label,
    }))
  );

  const methods = useForm();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await client.get("/favorite-addresses");
        setFavAddresses(response.data);
      } catch (error) {
        console.error("Ошибка загрузки адресов:", error);
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
    const fullAddress = `${data.street}, ${data.house}`;
    if (editingAddress) {
      // 🔹 обновляем на сервере
      await client.put(`/favorite-addresses/${editingAddress.id}`, {
        ...data,
        address: fullAddress,
      });

      setFavAddresses(
        favAddresses.map((addr) =>
          addr.id === editingAddress.id
            ? { ...addr, ...data, address: fullAddress }
            : addr
        )
      );
    } else {
      // 🔹 сохраняем на сервере
      const response = await client.post("/favorite-addresses", {
        ...data,
        address: fullAddress,
      });

      setFavAddresses([...favAddresses, response.data]);
    }
    setIsModalOpen(false);
    methods.reset();
  };

  const handleDeleteClick = async (id) => {
    await client.delete(`/favorite-addresses/${id}`);
    setFavAddresses(favAddresses.filter((addr) => addr.id !== id));
  };

  if (user.role === "employee") return null;

  return (
    <Block title={t("profile.addresses")} Icon={HomeIcon}>
      <div className={styles.list}>
        {favAddresses.map((item) => (
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
        <div className={styles.modalContent}>
          <h2>
            {editingAddress
              ? t("profile.changeAddress")
              : t("profile.addAddress")}
          </h2>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSaveAddress)}>
              <InputField
                label={t("profile.enterPseudonym")}
                name="pseudonym"
                type="text"
                required
                placeholder={t("profile.enterPseudonym")}
              />

              <AutocompleteField
                label="Улица"
                name="street"
                options={allStreets}
                required
              />

              <InputField
                label={t("profile.enterHouse")}
                name="house"
                type="number"
                required
                placeholder={t("profile.enterHouse")}
              />

              <Button type="submit">{t("user.save")}</Button>
            </form>
          </FormProvider>
        </div>
      </Modal>
    </Block>
  );
}
