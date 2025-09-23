import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Slider.module.css";
import arrow from "../../assets/arrow.svg"

export default function Slider({ slides, interval = 10000, animation = "scale" }) {
  const [index, setIndex] = useState(0);
  const [animClass, setAnimClass] = useState(styles[`${animation}EnterActive`]);
  const timerRef = useRef(null); // хранит id таймера

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setAnimClass(styles[`${animation}ExitActive`]);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % slides.length);
        setAnimClass(styles[`${animation}EnterActive`]);
      }, 300);
    }, interval);
  }, [animation, interval, slides.length]);

  const next = () => {
    setAnimClass(styles[`${animation}ExitActive`]);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
      setAnimClass(styles[`${animation}EnterActive`]);
    }, 300);
    startTimer();
  };

  const prev = () => {
    setAnimClass(styles[`${animation}ExitActive`]);
    setTimeout(() => {
      setIndex((prev) => (prev - 1 + slides.length) % slides.length);
      setAnimClass(styles[`${animation}EnterActive`]);
    }, 300);
    startTimer();
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [interval, slides.length, animation, startTimer]);

  return (
    <div className={styles.slider}>
      <div className={styles.slideWrapper}>
        <div className={`${styles.slide} ${animClass}`}>
          <img
            src={slides[index].image_source}
            alt={slides[index].title}
            className={styles.image}
          />
          <h2>{slides[index].title}</h2>
          <p>{slides[index].content}</p>
        </div>
        <div className={styles.controls}>
          <button onClick={prev}>
            <img src={arrow} alt="arrow left" className={styles.arrowLeft} />
          </button>
          <button onClick={next}>
            <img src={arrow} alt="arrow right" className={styles.arrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
}
