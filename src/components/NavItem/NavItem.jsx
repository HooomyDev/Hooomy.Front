import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./NavItem.module.css";
import Dropdown from "../../common/Dropdown/Dropdown";
import { PlayIcon } from "@heroicons/react/24/solid";

export default function NavItem({ item, onClick }) {
  const Icon = item.icon;
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (item.type === "link") {
    return (
      <NavLink
        to={item.to}
        className={({ isActive }) =>
          `${styles.navLink} ${isActive ? styles.activeLink : ""}`
        }
        onClick={() => {
          if (onClick) onClick();
        }}
        aria-label={item.label}
      >
        {Icon && <Icon className={styles.icon} />}
        <span className={styles.label}>{item.label}</span>
      </NavLink>
    );
  }

  if (item.type === "drop") {
    const dropdownItems = item.items.map((subItem) => ({
      label: subItem.label,
      icon: subItem.icon,
      onClick: () => {
        navigate(subItem.to);
      },
    }));

    return (
      <div className={styles.dropNavItem}>
        <button
          className={styles.dropNavItemBtn}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <PlayIcon
            className={`${styles.arrow} ${
              isDropdownOpen ? styles.arrowRotated : ""
            }`}
          />
          {item.label}
        </button>
        <Dropdown items={dropdownItems} visible={isDropdownOpen} />
      </div>
    );
  }
}
