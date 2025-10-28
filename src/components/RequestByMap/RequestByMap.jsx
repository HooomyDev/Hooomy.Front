import React from "react";
import { useFormContext } from "react-hook-form";
import Map from "../Map/Map";
import styles from "./RequestByMap.module.css";

export default function RequestByMap() {
  const { setValue, watch } = useFormContext();
  const location = watch("location");

  const handleSelect = ({ lng, lat }) => {
    setValue("location", { lng, lat });
  };

  return (
    <div className={styles.wrapper}>
      <Map onSelect={handleSelect} />
      {location && (
        <p className={styles.coords}>
          Вы выбрали точку: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
        </p>
      )}
    </div>
  );
}
