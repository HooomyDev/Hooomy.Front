import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import { navLinks } from "./navLinks";
import DropdownNavItem from "./DropdownNavItem";

export default function Navbar() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  const filteredLinks = navLinks.filter(link =>
    isLanding ? link.type === "anchor" : link.type === "route"
  );

  return (
    <div className={styles.navbar}>
      {filteredLinks.map((link) => {
        if (link.type === "route") {
          return (
            <Link key={link.to} to={link.to} className={styles.navLink}>
              {link.label}
            </Link>
          );
        }
        if (link.type === "anchor") {
          return (
            <a key={link.to} href={link.to} className={styles.navLink}>
              {link.label}
            </a>
          );
        }
        return null;
      })}
      {!isLanding && <DropdownNavItem />}
    </div>
  );
}
