import React, { useState } from "react";
import InputField from "../../InputField/InputField";
import { districts } from "../../../stores/districts";
import { streets } from "../../../stores/streets";
import SelectField from "../../SelectField/SelectField";
import styles from "./CreateRequestModal.module.css";

export default function CreateRequestModal() {
  const [formData, setFormData] = useState({
    district: "",
    street: "",
    house: "",
    entrance: "",
    floor: "",
    apartment: "",
    description: "",
    photo: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] || null });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.title}>Новая заявка</div>

      <div className={styles.tabs}>
        <button type="button" className={styles.button}>
          Заявка по адресу
        </button>
        <button type="button" className={styles.button}>
          Заявка по точке на карте
        </button>
      </div>

      <SelectField
        label="Район"
        value={formData.district}
        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
        options={districts}
      />
      <SelectField
        label="Улица"
        value={formData.street}
        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
        options={streets[formData.district] || []}
      />
      <div className={styles.inputContainer}>
        <InputField
          label="Дом"
          value={formData.house}
          onChange={(e) => setFormData({ ...formData, house: e.target.value })}
        />
        <InputField
          label="Подъезд"
          value={formData.entrance}
          onChange={(e) =>
            setFormData({ ...formData, entrance: e.target.value })
          }
          type="number"
        />
        <InputField
          label="Этаж"
          value={formData.floor}
          onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
          type="number"
        />
        <InputField
          label="Квартира"
          value={formData.apartment}
          onChange={(e) =>
            setFormData({ ...formData, apartment: e.target.value })
          }
        />
      </div>
      <InputField
        label="Описание проблемы"
        name="description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        multiline
      />

      <div className={styles.fileUpload}>
        <label className={styles.label} htmlFor="photo">
          Фото проблемы
        </label>
        <input
          id="photo"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Создать
      </button>
    </form>
  );
}
