import React, { useRef, useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./FileUploadField.module.css";

export default function FileUploadField({
  name = "photo",
  label = "Фото проблемы",
  required = false,
}) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const file = watch(name);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [file]);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setValue(name, droppedFile, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
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
      setValue(name, selectedFile, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  };

  return (
    <div className={styles.fileUpload}>
      <label className={styles.label} htmlFor={name}>
        {label}
        {required && <span className={styles.required}> *</span>}
      </label>

      <div
        className={`${styles.dropZone} 
          ${dragActive ? styles.active : ""} 
          ${errors[name] ? styles.dropZoneError : ""}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {previewUrl ? (
          <div className={styles.preview}>
            <img
              src={previewUrl}
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
        {...register(name, { required: required && "Загрузите фото" })}
        ref={fileInputRef}
        onChange={handleChange}
        className={styles.hiddenInput}
      />
    </div>
  );
}
