import React from "react";
import { useFormContext } from "react-hook-form";
import { districts } from "../../stores/districts";
import { streets } from "../../stores/streets";
import styles from "./RequestByAdress.module.css";
import InputField from "../common/InputField/InputField";
import SelectField from "../../common/SelectField/SelectField";

export default function RequestByAdress() {
  const { watch } = useFormContext();
  const selectedDistrict = watch("district");

  return (
    <div className={styles.wrapper}>
      <SelectField label="Район" name="district" options={districts} required />
      <SelectField
        required
        label="Улица"
        name="street"
        options={streets[selectedDistrict] || []}
      />

      <div className={styles.inputContainer}>
        <InputField
          required
          label="Дом"
          name="house"
          rules={{
            max: {
              value: 100,
            },
            min: {
              value: 1,
            },
          }}
        />
        <InputField
          label="Подъезд"
          name="entrance"
          type="number"
          rules={{
            min: {
              value: 1,
            },
            max: {
              value: 100,
            },
            validate: (v) => v === "" || /^\d+$/.test(v),
          }}
        />
        <InputField
          label="Этаж"
          name="floor"
          type="number"
          rules={{
            max: {
              value: 100,
            },
            min: {
              value: 1,
            },
            validate: (v) => v === "" || /^\d+$/.test(v),
          }}
        />
        <InputField label="Квартира" name="apartment" />
      </div>
    </div>
  );
}
