import React from "react";
import { useFormContext } from "react-hook-form";
import InputField from "../InputField/InputField";
import SelectField from "../SelectField/SelectField";
import { districts } from "../../stores/districts";
import { streets } from "../../stores/streets";
import styles from "./RequestByAdress.module.css";

export default function RequestByAdress() {
  const { watch } = useFormContext();
  const selectedDistrict = watch("district");

  return (
    <div className={styles.wrapper}>
      <SelectField label="Район" name="district" options={districts} />
      <SelectField
        label="Улица"
        name="street"
        options={streets[selectedDistrict] || []}
      />

      <div className={styles.inputContainer}>
        <InputField label="Дом" name="house" />
        <InputField label="Подъезд" name="entrance" type="number" />
        <InputField label="Этаж" name="floor" type="number" />
        <InputField label="Квартира" name="apartment" />
      </div>

      <InputField label="Описание проблемы" name="description" multiline />
    </div>
  );
}
