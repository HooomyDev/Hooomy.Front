import React from "react";
import Slider from "../Slider/Slider";
import styles from "./HowItWork.module.css";
import { slides } from "./slides";

export default function HowItWork() {
  return (
    <div id="advantages" className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.sliderContainer}>
          <Slider slides={slides} />
        </div>
      </div>
    </div>
  );
}
