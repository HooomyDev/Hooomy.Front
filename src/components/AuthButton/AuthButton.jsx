import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AuthButton.module.css";
import { ReactComponent as UserLogo } from "../../assets/user.svg";

export default function AuthButton() {
  const navigate = useNavigate();
  const onClick = () => navigate("/login");

  return (
    <button className={styles.authWrapper} onClick={onClick}>
      <UserLogo className={styles.userLogo} />
      <span className={styles.authText}>Войти</span>
    </button>
  );
}
