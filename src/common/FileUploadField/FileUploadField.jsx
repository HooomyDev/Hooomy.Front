import React, { useRef, useState, useEffect, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./FileUploadField.module.css";
import { useT } from "../../utils/useT";

export default function FileUploadField({
  name = "photos",
  label = "Фото",
  required = false,
  maxFiles = 10,
  multiple = true,
}) {
  const t = useT();
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const files = watch(name);
  const [previewUrls, setPreviewUrls] = useState([]);

  // Используем ref для отслеживания предыдущего значения files
  const prevFilesRef = useRef();

  useEffect(() => {
    // Сравниваем текущие файлы с предыдущими
    const filesChanged =
      JSON.stringify(prevFilesRef.current) !== JSON.stringify(files);

    if (!filesChanged) {
      prevFilesRef.current = files;
      return;
    }

    prevFilesRef.current = files;

    if (files && Array.isArray(files) && files.length > 0) {
      const urls = files.map((file) => URL.createObjectURL(file));
      setPreviewUrls(urls);

      return () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
      };
    } else {
      setPreviewUrls([]);
    }
  }, [files]);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith("image/")
      );

      if (droppedFiles.length > 0) {
        const currentFiles = Array.isArray(files) ? files : [];
        const newFiles = [...currentFiles, ...droppedFiles].slice(0, maxFiles);
        setValue(name, newFiles, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });
      }
    },
    [files, maxFiles, name, setValue]
  );

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleChange = useCallback(
    (e) => {
      const selectedFiles = Array.from(e.target.files).filter((file) =>
        file.type.startsWith("image/")
      );

      if (selectedFiles.length > 0) {
        const currentFiles = Array.isArray(files) ? files : [];
        const newFiles = [...currentFiles, ...selectedFiles].slice(0, maxFiles);
        setValue(name, newFiles, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });
      }

      // Очищаем input, чтобы можно было выбрать те же файлы снова
      e.target.value = "";
    },
    [files, maxFiles, name, setValue]
  );

  const removeFile = useCallback(
    (index) => {
      const currentFiles = Array.isArray(files) ? [...files] : [];
      currentFiles.splice(index, 1);
      setValue(name, currentFiles, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    [files, name, setValue]
  );

  const getErrorMessage = useCallback(() => {
    if (errors[name]) {
      if (typeof errors[name].message === "string") {
        return errors[name].message;
      }
      if (errors[name]?.type === "required") {
        return "Загрузите фото";
      }
    }
    return null;
  }, [errors, name]);

  const errorMessage = getErrorMessage();

  return (
    <div className={styles.fileUpload}>
      <label className={styles.label} htmlFor={name}>
        <span>
          {label}
          {required && <span className={styles.required}> *</span>}
        </span>
        {multiple && (
          <span className={styles.fileCount}>
            {Array.isArray(files) ? files.length : 0}/{maxFiles}
          </span>
        )}
      </label>

      <div
        className={`${styles.dropZone} 
          ${dragActive ? styles.active : ""} 
          ${errorMessage ? styles.dropZoneError : ""}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {previewUrls.length > 0 ? (
          <div className={styles.previewGrid}>
            {previewUrls.map((url, index) => (
              <div key={index} className={styles.previewItem}>
                <img
                  src={url}
                  alt={`Предпросмотр ${index + 1}`}
                  className={styles.previewImage}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  className={styles.removeButton}
                  aria-label="Удалить фото"
                >
                  ×
                </button>
              </div>
            ))}
            {Array.isArray(files) && files.length < maxFiles && (
              <div className={styles.addMoreButton}>
                <span>+</span>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.placeholder}>
            <span>
              {t("user.photoPlaceholder") ||
                "Перетащите фото сюда или нажмите для выбора"}
            </span>
          </div>
        )}
      </div>

      <input
        id={name}
        type="file"
        accept="image/*"
        multiple={multiple}
        {...register(name, {
          required: required && "Загрузите фото",
          validate: {
            maxFiles: (value) => {
              if (!multiple) return true;
              const filesArray = Array.isArray(value) ? value : [];
              return filesArray.length <= maxFiles;
            },
          },
        })}
        ref={fileInputRef}
        onChange={handleChange}
        className={styles.hiddenInput}
      />

      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
    </div>
  );
}
