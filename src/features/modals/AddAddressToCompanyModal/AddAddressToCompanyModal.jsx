import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import Modal from "../Modal/Modal";
import AutocompleteField from "../../../common/AutocompleteField/AutocompleteField";
import Map from "../../map/Map/Map";
import { findOrCreateAddress } from "../../../api/services/addressController";
import Button from "../../../common/Button/Button";
import { apiClient as client } from "../../../api/client";
import { addAddressToCompany } from "../../../api/services/companyService";
import styles from "./AddAddressToCompanyModal.module.css";

export default function AddAddressToCompanyModal({
  isOpen,
  onClose,
  companyId,
}) {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);

  const methods = useForm({ defaultValues: { address: "" } });
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isCreatingAddress, setIsCreatingAddress] = useState(false);
  const [localError, setLocalError] = useState(null);

  const { data: addressOptions = [], isFetching } = useQuery({
    queryKey: ["addressSearch", debouncedSearch],
    queryFn: async () => {
      const res = await client.get(`/addresses?searchQuery=${debouncedSearch}`);
      return res.data.addresses.map((a) => ({
        value: a.id,
        label: `${a.street}, ${a.houseNumber}`,
      }));
    },
    enabled: debouncedSearch.length >= 2,
    staleTime: 5 * 60 * 1000,
    placeholderData: [],
  });

  const mutation = useMutation({
    mutationFn: ({ address }) => addAddressToCompany(companyId, address),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company", companyId] });
      methods.reset();
      onClose();
    },
  });

  const handleSubmit = async (data) => {
    // If user picked point on map, create/find address first
    if (showMap) {
      if (!selectedLocation) {
        setLocalError("Выберите точку на карте");
        return;
      }
      setLocalError(null);
      try {
        setIsCreatingAddress(true);
        const id = await findOrCreateAddress(
          selectedLocation.lat,
          selectedLocation.lng,
          selectedLocation.address,
        );

        await mutation.mutateAsync({ address: id });
      } catch (err) {
        console.error(err);
        setLocalError("Ошибка при создании адреса");
      } finally {
        setIsCreatingAddress(false);
      }
    } else {
      // address from autocomplete (value is address id)
      await mutation.mutateAsync({ address: data.address });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className={styles.title}>Добавить адрес</h2>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className={styles.form}
        >
          <div className={styles.modeToggle}>
            <Button
              type="button"
              variant={showMap ? "secondary" : "primary"}
              onClick={() => setShowMap(false)}
            >
              Поиск
            </Button>
            <Button
              type="button"
              variant={showMap ? "primary" : "secondary"}
              onClick={() => setShowMap(true)}
            >
              По карте
            </Button>
          </div>

          {!showMap && (
            <AutocompleteField
              name="address"
              label="Адрес"
              options={addressOptions}
              required
              rules={{ required: "Выберите адрес" }}
              onSearch={setSearchTerm}
              loading={isFetching}
            />
          )}

          {showMap && (
            <>
              <Map
                onSelect={(loc) => setSelectedLocation(loc)}
                allowMarkers={true}
              />
              <div className={styles.mapPreview}>
                {selectedLocation ? (
                  <div>
                    <div>
                      <strong>Выбранный адрес:</strong>
                    </div>
                    <div>{selectedLocation.address}</div>
                    <div>
                      Координаты: {selectedLocation.lat.toFixed(6)},{" "}
                      {selectedLocation.lng.toFixed(6)}
                    </div>
                  </div>
                ) : (
                  <div>Нажмите на карту, чтобы выбрать точку</div>
                )}
              </div>
              {localError && <p className={styles.error}>{localError}</p>}
            </>
          )}
          {mutation.isError && (
            <p className={styles.error}>Ошибка при добавлении адреса</p>
          )}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              Отмена
            </button>
            <Button
              type="submit"
              disabled={mutation.isPending || isCreatingAddress}
              title={
                mutation.isPending || isCreatingAddress
                  ? "Сохранение..."
                  : "Добавить"
              }
            >
              {mutation.isPending || isCreatingAddress
                ? "Сохранение..."
                : "Добавить"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
}
