import React from "react";
import { useFormContext } from "react-hook-form";
import { districts } from "../../stores/districts";
import { streets } from "../../stores/streets";
import styles from "./RequestByAdress.module.css";
import SelectField from "../../common/SelectField/SelectField";
import InputField from "../../common/InputField/InputField";
import { useT } from "../../utils/useT";

export default function RequestByAdress() {
  const t = useT();
  const { watch } = useFormContext();
  const selectedDistrict = watch("district");

  return (
    <div className={styles.wrapper}>
      <SelectField
        label={t("user.district")}
        name="district"
        options={districts}
        required
      />
      <SelectField
        required
        label={t("user.street")}
        name="street"
        options={streets[selectedDistrict] || []}
      />
      <InputField
        required
        label={t("user.house")}
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
    </div>
  );
}
