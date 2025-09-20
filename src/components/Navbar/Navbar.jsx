import React from "react";
import styles from "./Navbar.module.css"
import NavItem from "./NavItem";
import DropdownNavItem from "./DropdownNavItem";

export default function Navbar(){
    return(
        <div className={styles.navbar}>
            <NavItem to="/" label="Главная"/>
            <NavItem to="/requests" label="Заявки"/>
            <NavItem to="/news" label="Объявления"/>
            <NavItem to="/bills" label="Счета"/>
            <NavItem to="/feedback" label="Обратная связь"/>
            <DropdownNavItem/>
        </div>
    );
}