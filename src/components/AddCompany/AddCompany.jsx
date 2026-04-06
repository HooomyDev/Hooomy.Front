import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import InputField from "../../common/InputField/InputField";
import MaskedInputField from "../../common/InputField/MaskedInput";
import Button from "../../common/Button/Button";
import { apiClient } from "../../api/client";
import styles from "./AddCompany.module.css";
import { useT } from "../../utils/useT";
import FileUploadField from "../../common/FileUploadField/FileUploadField";
import AutocompleteField from "../../common/AutocompleteField/AutocompleteField";
import { useDebounce } from "use-debounce";
import PageHeader from "../../common/PageHeader/PageHeader";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/solid";
import Map from "../../features/map/Map/Map";
import { findOrCreateAddress } from "../../api/services/addressController";
import { createCompany, uploadLogo } from "../../api/services/companyService";

const parseAddress = (address) => {
  if (!address) return { street: "", houseNumber: "" };

  const housePattern = /(\d+[А-Яа-я]?(?:\/\d+)?(?:\s+[кК](?:орпус)?\s*\d+)?)$/;
  const match = address.match(housePattern);

  if (match) {
    const houseNumber = match[1].trim();
    const street = address.replace(match[0], "").trim();
    return { street, houseNumber };
  }

  return { street: address, houseNumber: "" };
};

export default function AddCompany() {
  const queryClient = useQueryClient();
  const t = useT();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  const handleSelect = (location) => {
    setSelectedLocation(location);
  };

  const methods = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      workingHours: "",
      addressId: "",
      logo: "",
    },
  });

  const { handleSubmit, reset } = methods;

  const handleSaveAddress = async () => {
    setIsSaving(true);

    try {
      const { lng, lat, address } = selectedLocation;
      const parsedAddress = parseAddress(address);

      await findOrCreateAddress(
        lat,
        lng,
        `${parsedAddress.street}, ${parsedAddress.houseNumber}`
      );
    } catch (error) {
      console.error("Failed to save address:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const { data: streetOptions = [], isFetching } = useQuery({
    queryKey: ["streetSearch", debouncedSearchTerm],
    queryFn: async () => {
      if (!debouncedSearchTerm) return [];

      const res = await apiClient.get(
        `/addresses?searchQuery=${encodeURIComponent(debouncedSearchTerm)}`
      );
      return res.data.addresses.map((s) => ({
        value: s.id,
        label: `${s.street}, ${s.houseNumber}`,
      }));
    },
    enabled: !!debouncedSearchTerm,
  });

  const handleStreetSearch = (query) => {
    setSearchTerm(query);
  };

  const mutation = useMutation({
    mutationFn: async (data) => {
      var companyId = await createCompany(
        data.name,
        data.phone,
        data.email,
        data.addressId || null,
        data.workingHours
      );

      if (data.logo) {
        const formData = new FormData();

        formData.append("logo", data.logo[0]);

        await uploadLogo(companyId, formData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      reset();
    },
    onError: (error) => {
      console.error("Ошибка при добавлении компании:", error);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  const Info = () => {
    return (
      <div className={styles.infoText}>
        <p>
          <strong>Что делать, если адреса нет в списке?</strong>
        </p>
        <ul>
          <li>Проверьте правильность написания улицы</li>
          <li>Если адреса всё ещё нет, вы можете добавить его вручную</li>
        </ul>
        <p>Для добавления адреса нажмите на кнопку ниже.</p>
        <Button
          className={styles.infoButton}
          onClick={() => setIsAddingAddress(true)}
        >
          Добавить
        </Button>
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <PageHeader
        title="Добавить компанию"
        icon={WrenchScrewdriverIcon}
        info={Info}
      />

      {isAddingAddress && (
        <div className={styles.createAddressContent}>
          <Map onSelect={handleSelect} />
          {selectedLocation && (
            <div className={styles.selectedAddress}>
              <strong>Выбранный адрес: </strong>
              <span>{selectedLocation.address}</span>
            </div>
          )}
          <div className={styles.buttons}>
            <Button
              onClick={handleSaveAddress}
              disabled={!selectedLocation || isSaving}
            >
              {isSaving ? "Сохранение..." : "Добавить адрес"}
            </Button>
          </div>
        </div>
      )}

      <div className={styles.content}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.formGroup}>
              <FileUploadField label="Логотип" name="logo" maxFiles={1} />
            </div>
            <div className={styles.formGroup}>
              <InputField
                label="Название компании"
                name="name"
                type="text"
                required
                placeholder="Введите название компании"
                rules={{ required: "Название компании обязательно" }}
              />

              <AutocompleteField
                label="Улица"
                name="street"
                options={streetOptions}
                onSearch={handleStreetSearch}
                loading={isFetching}
              />

              <MaskedInputField
                label={t("user.phone")}
                name="phone"
                mask="+{375} (00) 000-00-00"
                placeholder="+375 (__) ___-__-__"
              />

              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="company@example.com"
                rules={{
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Некорректный email",
                  },
                }}
              />

              <InputField
                label="Рабочие часы"
                name="workingHours"
                type="text"
                placeholder="09:00-18:00"
              />

              <div className={styles.buttons}>
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? "Добавление..." : "Добавить компанию"}
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
