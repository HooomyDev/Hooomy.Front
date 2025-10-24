import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AuthButton.module.css";
import { ReactComponent as UserLogo } from "../../assets/user.svg";
import { useAuthStore } from "../../stores/authStore";
import Dropdown from "../Dropdown/Dropdown";

export default function AuthButton() {
  const user = useAuthStore((store) => store.user);
  const logout = useAuthStore((store) => store.logout);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Закрытие при клике вне
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      setOpen((prev) => !prev);
    }
  };

  const items = [
    { label: "Профиль", onClick: () => navigate("/profile") },
    { label: "Настройки", onClick: () => navigate("/settings") },
    {
      label: "Выйти",
      onClick: () => {
        logout();
        navigate("/");
      },
    },
  ];

  return (
    <div className={styles.wrapper} ref={ref}>
      <button className={styles.authButton} onClick={handleClick}>
        <UserLogo className={styles.userLogo} />
        {!user && <span className={styles.authText}>Войти</span>}
      </button>

      {user && open && <Dropdown items={items} />}
    </div>
  );
}
