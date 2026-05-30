import React, { useEffect, useState } from "react";
import styles from "./FavoriteAddressModal.module.css";
import { useT } from "../../../utils/useT";
import { FormProvider } from "react-hook-form";
import InputField from "../../../common/InputField/InputField";
import AutocompleteField from "../../../common/AutocompleteField/AutocompleteField";
import Button from "../../../common/Button/Button";
import { apiClient as client } from "../../../api/client";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import Map from "../../map/Map/Map";
import { findOrCreateAddress } from "../../../api/services/addressController";

export default function FavoriteAddressModal({
  editingAddress,
  handleSaveAddress,
  methods,
}) {
  const t = useT();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isCreatingAddress, setIsCreatingAddress] = useState(false);
  const [localError, setLocalError] = useState(null);

  // useQuery для поиска улиц
  const { data: streetOptions = [], isFetching } = useQuery({
    queryKey: ["streetSearch", debouncedSearchTerm],
    queryFn: async () => {
      if (!debouncedSearchTerm || debouncedSearchTerm.length < 2) {
        return [];
      }

      const res = await client.get(
        `/addresses?searchQuery=${debouncedSearchTerm}`,
      );
      return res.data.addresses.map((s) => ({
        value: s.id,
        label: `${s.street}, ${s.houseNumber}`,
      }));
    },
    enabled: debouncedSearchTerm?.length >= 2,
    staleTime: 5 * 60 * 1000,
    placeholderData: [],
  });

  const handleStreetSearch = (query) => {
    setSearchTerm(query);
  };

  useEffect(() => {
    if (!showMap) {
      setSelectedLocation(null);
      setLocalError(null);
    }
  }, [showMap]);

  const onSubmit = async (data) => {
    if (showMap) {
      if (!selectedLocation) {
        setLocalError("Выберите точку на карте");
        return;
      }

      setLocalError(null);
      setIsCreatingAddress(true);
      try {
        const id = await findOrCreateAddress(
          selectedLocation.lat,
          selectedLocation.lng,
          selectedLocation.address,
        );

        await handleSaveAddress({ ...data, street: id });
      } catch (err) {
        console.error(err);
        setLocalError("Ошибка при создании адреса");
      } finally {
        setIsCreatingAddress(false);
      }

      return;
    }

    await handleSaveAddress(data);
  };

  return (
    <div className={styles.modalContent}>
      <h2>
        {editingAddress ? t("profile.changeAddress") : t("profile.addAddress")}
      </h2>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <InputField
            label={t("profile.enterPseudonym")}
            name="pseudonym"
            type="text"
            required
            placeholder={t("profile.enterPseudonym")}
          />

          <div className={styles.modeToggle}>
            <button
              type="button"
              className={showMap ? styles.modeBtn : styles.modeBtnActive}
              onClick={() => setShowMap(false)}
            >
              Поиск
            </button>
            <button
              type="button"
              className={showMap ? styles.modeBtnActive : styles.modeBtn}
              onClick={() => setShowMap(true)}
            >
              По карте
            </button>
          </div>

          {!showMap && (
            <AutocompleteField
              label="Адрес"
              name="street"
              options={streetOptions}
              required
              onSearch={handleStreetSearch}
              loading={isFetching}
            />
          )}

          {showMap && (
            <>
              <div className={styles.mapContainer}>
                <Map
                  onSelect={(loc) => setSelectedLocation(loc)}
                  allowMarkers={true}
                />
              </div>
              <div className={styles.mapPreview}>
                {selectedLocation ? (
                  <>
                    <div>
                      <strong>Выбранный адрес:</strong>
                    </div>
                    <div>{selectedLocation.address}</div>
                    <div>
                      Координаты: {selectedLocation.lat.toFixed(6)},{" "}
                      {selectedLocation.lng.toFixed(6)}
                    </div>
                  </>
                ) : (
                  <div>Нажмите на карту, чтобы выбрать точку</div>
                )}
              </div>
              {localError && <p className={styles.error}>{localError}</p>}
            </>
          )}

          <Button
            className={styles.button}
            type="submit"
            disabled={isCreatingAddress}
          >
            {isCreatingAddress ? "Сохранение..." : t("user.save")}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
