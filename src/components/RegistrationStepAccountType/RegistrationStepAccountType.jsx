import React from "react";
import styles from "./RegistrationStepAccountType.module.css";
import RadioButton from "../RadioButton/RadioButton";

export default function RegistrationStepAccountType({
  types,
  selectedType,
  onSelectedType,
}) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Выберите вашу роль</h1>

      {types.map((type) => (
        <RadioButton
          key={type.value}
          name="accountType"
          value={type.value}
          label={type.label}
          checked={selectedType === type.value}
          onChange={onSelectedType}
        />
      ))}
    </div>
  );
}
