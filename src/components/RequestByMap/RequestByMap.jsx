import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import Map from "../../features/map/Map/Map";
import styles from "./RequestByMap.module.css";

export default function RequestByMap() {
  const {
    setValue,
    watch,
    register,
    formState: { errors },
  } = useFormContext();
  const location = watch("location");

  useEffect(() => {
    register("location", {
      required: "Выберите точку на карте",
      validate: (v) => (v && v.lat && v.lng ? true : "Выберите точку на карте"),
    });
    register("street");
  }, [register]);

  const handleSelect = ({ lng, lat, address }) => {
    setValue("street", address, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue(
      "location",
      { lng, lat },
      {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      }
    );
  };

  return (
    <div className={styles.wrapper}>
      <Map onSelect={handleSelect} />
      {location && (
        <p className={styles.coords}>
          Адрес: {location.address}
          <br />
          Координаты: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
        </p>
      )}
      {errors.location && (
        <div className={styles.error}>{errors.location.message}</div>
      )}
    </div>
  );
}
