import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { ReactComponent as UserLogo } from "../../assets/user.svg";
import { ReactComponent as ProfileIcon } from "../../assets/user.svg";
import { ReactComponent as SettingsIcon } from "../../assets/settings.svg";
import { ReactComponent as LogoutIcon } from "../../assets/logout.svg";
import Dropdown from "../../common/Dropdown/Dropdown";
import styles from "./AuthButton.module.css";

export default function AuthButton() {
  const user = useAuthStore((store) => store.user);
  const logout = useAuthStore((store) => store.logout);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

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
    {
      label: "Профиль",
      icon: ProfileIcon,
      onClick: () => {
        setOpen(false);
        navigate("/profile");
      },
    },
    {
      label: "Настройки",
      icon: SettingsIcon,
      onClick: () => {
        setOpen(false);
        navigate("/settings");
      },
    },
    {
      label: "Выйти",
      icon: LogoutIcon,
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
        {user ? (
          user.email?.slice(0, 7) + "..."
        ) : (
          <span className={styles.authText}>Войти</span>
        )}
      </button>

      {user && <Dropdown items={items} visible={open} />}
    </div>
  );
}
