import React, { useEffect, useState } from "react";
import styles from "./LandingNavbar.module.css";
import LandingNavList from "../LandingNavList/LandingNavList";
import { navLinks } from "./navLinks";

export default function LandingNavbar() {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    navLinks.forEach((link) => {
      const section = document.getElementById(link.to);
      if (section) observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <nav className={styles.navbar}>
      <LandingNavList items={navLinks} activeId={activeId} />
    </nav>
  );
}
