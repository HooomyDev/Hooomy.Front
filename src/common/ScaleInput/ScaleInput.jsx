import React, { useState } from "react";
import styles from "./ScaleInput.module.css";

export default function ScaleInput({ min = 0, max = 5, step = 1 }) {
  const [value, setValue] = useState(min);

  return (
    <div className={styles.scaleWrapper}>
      <label className={styles.scaleLabel}>
        <span className={styles.rangeValue}>{value}</span>
      </label>
      <div className={styles.scaleInputWrapper}>
        <input
          type="range"
          className={styles.rangeInput}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          style={{ "--value": value, "--min": min, "--max": max }}
        />
      </div>
      <div className={styles.scaleMarks}>
        {Array.from({ length: max - min + 1 }, (_, i) => (
          <span key={i} className={styles.mark}>
            {i + min}
          </span>
        ))}
      </div>
    </div>
  );
}
