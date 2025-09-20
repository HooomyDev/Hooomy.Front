import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css"

export default function NavItem({to, label}){
    return (
        <div className={styles.navItem}>
            <NavLink 
                to={to}
                className={({ isActive }) => 
                    isActive? `${styles.navLink} ${styles.activeLink}` : styles.navLink }
                aria-label={label}
            >
                {label}
            </NavLink>
        </div>
    );
}