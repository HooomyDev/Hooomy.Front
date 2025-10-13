import React, { useRef, useEffect, useState } from "react";
import styles from "./RegistrationWizardWrapper.module.css";

export default function RegistrationWizardWrapper({ children }) {
  const ref = useRef(null);
  const [height, setHeight] = useState("auto");

  useEffect(() => {
    if (ref.current) {
      const el = ref.current;
      const newHeight = el.scrollHeight;
      setHeight(newHeight + "px");
    }
  }, [children]);

  return (
    <div className={styles.wrapper} style={{ height }}>
      <div ref={ref}>{children}</div>
    </div>
  );
}
