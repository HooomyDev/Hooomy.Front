import React, { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./FileUploadField.module.css";

export default function FileUploadField({
  name = "photo",
  label = "Фото проблемы",
}) {
  const { register, setValue, watch } = useFormContext();
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const file = watch(name);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setValue(name, droppedFile, { shouldValidate: true });
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setValue(name, selectedFile, { shouldValidate: true });
    }
  };

  return (
    <div className={styles.fileUpload}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>

      <div
        className={`${styles.dropZone} ${dragActive ? styles.active : ""}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {file ? (
          <div className={styles.preview}>
            <img
              src={URL.createObjectURL(file)}
              alt="Предпросмотр"
              className={styles.previewImage}
            />
          </div>
        ) : (
          <span className={styles.placeholder}>
            Перетащите изображение сюда или нажмите для выбора
          </span>
        )}
      </div>

      <input
        id={name}
        type="file"
        accept="image/*"
        {...register(name)}
        ref={fileInputRef}
        onChange={handleChange}
        className={styles.hiddenInput}
      />
    </div>
  );
}
