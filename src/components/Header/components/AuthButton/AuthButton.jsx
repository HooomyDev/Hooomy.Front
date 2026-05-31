import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../../stores/authStore";
import { ReactComponent as UserLogo } from "../../../../assets/user.svg";
import { ReactComponent as ProfileIcon } from "../../../../assets/user.svg";
import { ReactComponent as SettingsIcon } from "../../../../assets/settings.svg";
import { ReactComponent as LogoutIcon } from "../../../../assets/logout.svg";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";
import Dropdown from "../../../../common/Dropdown/Dropdown";
import styles from "./AuthButton.module.css";
import { useT } from "../../../../utils/useT";
import routes from "../../../../stores/routes.json";
import { authClient as client } from "../../../../api/client";

export default function AuthButton() {
  const t = useT();
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
      navigate(routes.login);
    } else {
      setOpen((prev) => !prev);
    }
  };

  const isAdminOrEmployee = user?.role === "Admin" || user?.role === "Employee";

  const items = [
    ...(!isAdminOrEmployee
      ? [
          {
            label: t("userdrop.profile"),
            icon: ProfileIcon,
            onClick: () => {
              setOpen(false);
              navigate(routes.profile);
            },
          },
          {
            label: t("nav.messages"),
            icon: ChatBubbleBottomCenterTextIcon,
            onClick: () => {
              setOpen(false);
              navigate(routes.chat);
            },
          },
        ]
      : []),
    {
      label: t("settings.title"),
      icon: SettingsIcon,
      onClick: () => {
        setOpen(false);
        navigate(routes.settings);
      },
    },
    {
      label: t("userdrop.logout"),
      icon: LogoutIcon,
      onClick: async () => {
        try {
          await client.post("auth/logout", null, { withCredentials: true });
          logout();
          navigate(routes.home);
        } catch (error) {
          console.error("Logout failed:", error);
        } finally {
          setOpen(false);
        }
      },
    },
  ];
  return (
    <div className={styles.wrapper} ref={ref}>
      <button className={styles.authButton} onClick={handleClick}>
        <UserLogo className={styles.userLogo} />
        <span className={styles.authText}>
          {user ? user.email?.slice(0, 7) + "..." : t("userdrop.login")}
        </span>
      </button>
      {user && <Dropdown items={items} visible={open} />}
    </div>
  );
}
