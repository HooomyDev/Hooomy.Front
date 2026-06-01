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
import { useNavigate } from "react-router-dom";

const parseAddress = (address) => {
  if (!address) return { street: "", houseNumber: "" };

  const normalizedAddress = address
    .replace(/\s+/g, " ")
    .replace(/,+/g, ",")
    .trim();
  const housePattern = /(\d+[А-Яа-я]?(?:\/\d+)?(?:\s+[кК](?:орпус)?\s*\d+)?)$/;
  const match = normalizedAddress.match(housePattern);

  if (match) {
    const houseNumber = match[1].trim();
    const street = normalizedAddress
      .replace(match[0], "")
      .replace(/[ ,]+$/, "")
      .trim();
    return { street, houseNumber };
  }

  return {
    street: normalizedAddress.replace(/[ ,]+$/, "").trim(),
    houseNumber: "",
  };
};

export default function AddCompany() {
  const queryClient = useQueryClient();
  const t = useT();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [addressMode, setAddressMode] = useState("input");
  const [addressSaveError, setAddressSaveError] = useState("");
  const navigate = useNavigate();

  const handleSelect = (location) => {
    setSelectedLocation(location);
  };

  const formatSelectedAddress = (address) => {
    if (!address) return "";
    const parsed = parseAddress(address);
    return [parsed.street, parsed.houseNumber].filter(Boolean).join(", ");
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
    if (!selectedLocation) {
      setAddressSaveError(t("company.addressSelection.noLocation"));
      return false;
    }

    setAddressSaveError("");
    setIsSavingAddress(true);

    try {
      const { lng, lat, address } = selectedLocation;
      const parsedAddress = parseAddress(address);
      const formattedAddress = [parsedAddress.street, parsedAddress.houseNumber]
        .filter(Boolean)
        .join(", ");

      const addressId = await findOrCreateAddress(lat, lng, formattedAddress);

      methods.setValue("addressId", addressId, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });

      return true;
    } catch (error) {
      console.error("Failed to save address:", error);
      setAddressSaveError(t("company.addressSelection.saveError"));
      return false;
    } finally {
      setIsSavingAddress(false);
    }
  };

  const { data: streetOptions = [], isFetching } = useQuery({
    queryKey: ["streetSearch", debouncedSearchTerm],
    queryFn: async () => {
      if (!debouncedSearchTerm) return [];

      const res = await apiClient.get(
        `/addresses?searchQuery=${encodeURIComponent(debouncedSearchTerm)}`,
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
      console.log(data);
      var companyId = await createCompany(
        data.name,
        data.phone,
        data.email,
        data.addressId || null,
        data.workingHours,
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
      navigate(-1);
    },
    onError: (error) => {
      console.error("Ошибка при добавлении компании:", error);
    },
  });

  const onSubmit = async (data) => {
    if (addressMode === "map") {
      if (!data.addressId) {
        const saved = await handleSaveAddress();
        if (!saved) return;
        data.addressId = methods.getValues("addressId");
      }
    }

    mutation.mutate(data);
  };

  const Info = () => {
    return (
      <div className={styles.infoText}>
        <p>
          <strong>{t("company.addressInfo.title")}</strong>
        </p>
        <ul>
          <li>{t("company.addressInfo.spellCheck")}</li>
          <li>{t("company.addressInfo.addManually")}</li>
        </ul>
        <p>{t("company.addressInfo.instructions")}</p>
        <Button
          className={styles.infoButton}
          onClick={() => setAddressMode("map")}
        >
          {t("company.addressInfo.add")}
        </Button>
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <PageHeader
        title={t("common.createCompany")}
        icon={WrenchScrewdriverIcon}
        info={Info}
      />

      <div className={styles.content}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.formGroup}>
              <FileUploadField
                label={t("common.logo")}
                name="logo"
                maxFiles={1}
              />
            </div>
            <div className={styles.formGroup}>
              <InputField
                label={t("company.name")}
                name="name"
                type="text"
                required
                placeholder={t("company.namePlaceholder")}
                rules={{ required: t("company.nameRequired") }}
              />

              <div className={styles.addressMode}>
                <div className={styles.modeToggle}>
                  <Button
                    type="button"
                    variant={addressMode === "input" ? "primary" : "secondary"}
                    onClick={() => setAddressMode("input")}
                  >
                    {t("company.addressSelection.search")}
                  </Button>
                  <Button
                    type="button"
                    variant={addressMode === "map" ? "primary" : "secondary"}
                    onClick={() => setAddressMode("map")}
                  >
                    {t("company.addressSelection.map")}
                  </Button>
                </div>

                {addressMode === "input" && (
                  <AutocompleteField
                    label={t("user.address")}
                    name="addressId"
                    options={streetOptions}
                    onSearch={handleStreetSearch}
                    loading={isFetching}
                  />
                )}

                {addressMode === "map" && (
                  <div className={styles.mapSection}>
                    <div className={styles.mapContainer}>
                      <Map onSelect={handleSelect} allowMarkers={true} />
                    </div>
                    <div className={styles.selectedAddress}>
                      <strong>{t("company.selectedAddress")}</strong>
                      <span>
                        {selectedLocation
                          ? formatSelectedAddress(selectedLocation.address)
                          : t("company.addressSelection.noLocation")}
                      </span>
                    </div>
                    <div className={styles.buttons}>
                      <Button
                        type="button"
                        onClick={handleSaveAddress}
                        disabled={!selectedLocation || isSavingAddress}
                      >
                        {isSavingAddress
                          ? t("common.saving")
                          : t("company.addressSelection.save")}
                      </Button>
                    </div>
                    {addressSaveError && (
                      <p className={styles.error}>{addressSaveError}</p>
                    )}
                    {methods.watch("addressId") && !addressSaveError && (
                      <p className={styles.success}>
                        {t("company.addressSelection.saved")}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <MaskedInputField
                label={t("user.phone")}
                name="phone"
                mask="+{375} (00) 000-00-00"
                placeholder="+375 (__) ___-__-__"
              />

              <InputField
                label={t("user.email")}
                name="email"
                type="email"
                placeholder={t("company.emailPlaceholder")}
                rules={{
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: t("errors.invalidEmail"),
                  },
                }}
              />

              <InputField
                label={t("company.workingHours")}
                name="workingHours"
                type="text"
                placeholder={t("company.workingHoursPlaceholder")}
              />

              <div className={styles.buttons}>
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending
                    ? t("company.adding")
                    : t("company.addCompany")}
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
