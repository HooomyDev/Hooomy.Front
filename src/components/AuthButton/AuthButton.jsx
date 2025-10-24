import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AuthButton.module.css";
import { ReactComponent as UserLogo } from "../../assets/user.svg";
import { useAuthStore } from "../../stores/authStore";

export default function AuthButton() {
  const user = useAuthStore((store) => store.user);
  const navigate = useNavigate();
  const onClick = () => navigate(!user ? "/login" : "/profile");

  return (
    <button className={styles.authButton} onClick={onClick}>
      <UserLogo className={styles.userLogo} />
      {!user && <span className={styles.authText}>Войти</span>}
    </button>
  );
}
