import React, { useState, useEffect, useCallback } from "react";
import styles from "./ImageGallery.module.css";
import { PhotoIcon } from "@heroicons/react/24/outline";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import EmptyBlock from "../EmptyBlock/EmptyBlock";

export default function ImageGallery({
  images = [],
  baseUrl,
  onImageClick,
  showThumbnails = true,
  thumbnailSize = 80,
  mainHeight = 400,
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const hasImages = images && images.length > 0;

  // Получить полный URL изображения
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    return `${baseUrl}${
      imagePath.startsWith("/") ? imagePath : `/${imagePath}`
    }`;
  };

  // Переключение на следующее фото
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, [setCurrentImageIndex, images]);

  // Переключение на предыдущее фото
  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [setCurrentImageIndex, images]);

  // Выбор конкретного фото
  const selectImage = (index) => {
    setCurrentImageIndex(index);
    onImageClick?.(images[index], index);
  };

  // Открыть полноэкранный режим
  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isFullscreen) return;

      if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "Escape") {
        closeFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, prevImage, nextImage, images]);

  if (!hasImages) {
    return (
      <div className={styles.empty}>
        <EmptyBlock Icon={PhotoIcon}>Нет фотографий</EmptyBlock>
      </div>
    );
  }

  return (
    <>
      <div className={styles.galleryWrapper}>
        <div
          className={styles.mainPhotoContainer}
          style={{ height: `${mainHeight}px` }}
        >
          <img
            src={getImageUrl(images[currentImageIndex])}
            alt={`Фото ${currentImageIndex + 1}`}
            className={styles.mainPhoto}
            onClick={openFullscreen}
          />

          {images.length > 1 && (
            <>
              <button
                className={`${styles.navButton} ${styles.navLeft}`}
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <ChevronLeftIcon className={styles.navIcon} />
              </button>
              <button
                className={`${styles.navButton} ${styles.navRight}`}
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ChevronRightIcon className={styles.navIcon} />
              </button>
            </>
          )}

          <div className={styles.counter}>
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>

        {/* Миниатюры снизу */}
        {showThumbnails && images.length > 1 && (
          <div className={styles.thumbnailsWrapper}>
            {images.map((image, index) => (
              <div
                key={index}
                className={`${styles.thumbnail} ${
                  index === currentImageIndex ? styles.activeThumbnail : ""
                }`}
                onClick={() => selectImage(index)}
                style={{
                  width: `${thumbnailSize}px`,
                  height: `${thumbnailSize}px`,
                }}
              >
                <img
                  src={getImageUrl(image)}
                  alt={`Миниатюра ${index + 1}`}
                  className={styles.thumbnailImage}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Полноэкранный режим */}
      {isFullscreen && (
        <div className={styles.fullscreenModal}>
          <button className={styles.closeButton} onClick={closeFullscreen}>
            <XMarkIcon className={styles.closeIcon} />
          </button>

          <div className={styles.fullscreenContent}>
            <img
              src={getImageUrl(images[currentImageIndex])}
              alt={`Фото ${currentImageIndex + 1}`}
              className={styles.fullscreenImage}
            />

            {images.length > 1 && (
              <>
                <button
                  className={`${styles.fullscreenNav} ${styles.fullscreenNavLeft}`}
                  onClick={prevImage}
                >
                  <ChevronLeftIcon className={styles.navIcon} />
                </button>
                <button
                  className={`${styles.fullscreenNav} ${styles.fullscreenNavRight}`}
                  onClick={nextImage}
                >
                  <ChevronRightIcon className={styles.navIcon} />
                </button>
                <div className={styles.fullscreenCounter}>
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>

          {showThumbnails && images.length > 1 && (
            <div className={styles.fullscreenThumbnails}>
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`${styles.fullscreenThumbnail} ${
                    index === currentImageIndex
                      ? styles.activeFullscreenThumbnail
                      : ""
                  }`}
                  onClick={() => selectImage(index)}
                >
                  <img
                    src={getImageUrl(image)}
                    alt={`Миниатюра ${index + 1}`}
                    className={styles.fullscreenThumbnailImage}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
