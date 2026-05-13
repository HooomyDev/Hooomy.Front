import React, { useState, useRef, useEffect } from "react";
import styles from "./Header.module.css";
import Logo from "../Logo/Logo";
import AuthButton from "../AuthButton/AuthButton";
import { useNavigate } from "react-router-dom";
import { Cog6ToothIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import routes from "../../stores/routes.json";
import NavItem from "../NavItem/NavItem";
import { useLinks } from "../../utils/useLinks";
import Navbar from "../Navbar/Navbar";

export default function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  const links = useLinks();

  // обработка клика вне навбара
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.logoWrapper}>
          <button
            className={styles.burgerButton}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? (
              <XMarkIcon className={styles.icon} />
            ) : (
              <Bars3Icon className={styles.icon} />
            )}
          </button>
          <Logo />
        </div>

        <Navbar items={links} />

        <div className={styles.actions}>
          <button
            className={styles.settingButton}
            onClick={() => navigate(routes.settings)}
          >
            <Cog6ToothIcon className={styles.icon} />
          </button>
          <AuthButton />
        </div>
      </div>

      <div
        ref={navRef}
        className={`${styles.navbar} ${isOpen ? styles.navbarOpen : ""}`}
      >
        {links.map((item) => (
          <NavItem key={item.id} item={item} onClick={() => setIsOpen(false)} />
        ))}
      </div>
    </div>
  );
}
