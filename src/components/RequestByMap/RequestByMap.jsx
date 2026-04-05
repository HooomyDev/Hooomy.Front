import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import Map from "../../features/map/Map/Map";
import styles from "./RequestByMap.module.css";
import { findOrCreateAddress } from "../../api/services/addressController";

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

export default function RequestByMap() {
  const {
    setValue,
    watch,
    register,
    formState: { errors },
  } = useFormContext();

  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const location = watch("location");
  const addressId = watch("addressId");

  useEffect(() => {
    register("location", {
      required: "Выберите точку на карте",
      validate: (v) => (v && v.lat && v.lng ? true : "Выберите точку на карте"),
    });
    register("street", {
      required: "Адрес не найден",
    });
    register("street1");
    register("houseNumber");
  }, [register]);

  const handleSelect = async ({ lng, lat, address }) => {
    const { street, houseNumber } = parseAddress(address);

    const formattedAddress = houseNumber ? `${street}, ${houseNumber}` : street;

    setValue("street", street, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue("houseNumber", houseNumber, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue(
      "location",
      { lng, lat, address: formattedAddress },
      {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      }
    );

    setIsLoadingAddress(true);
    try {
      const addressData = await findOrCreateAddress(lat, lng, formattedAddress);
      setValue("street", addressData, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    } catch (error) {
      console.error("Failed to find/create address:", error);
      setValue("street", null);
    } finally {
      setIsLoadingAddress(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Map onSelect={handleSelect} />

      {isLoadingAddress && (
        <p className={styles.loading}>Сохранение адреса...</p>
      )}

      {location && !isLoadingAddress && (
        <p className={styles.coords}>
          Адрес: {location.address ?? "адрес не найден"}
          <br />
          Координаты: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
          {addressId && (
            <span className={styles.success}> ✓ Адрес сохранён</span>
          )}
        </p>
      )}

      {errors.location && (
        <div className={styles.error}>{errors.location.message}</div>
      )}

      <input type="hidden" {...register("street")} />
      <input type="hidden" {...register("street1")} />
      <input type="hidden" {...register("houseNumber")} />
    </div>
  );
}
