import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import { navLinks } from "./navLinks";
import DropdownNavItem from "../DropdownNavItem/DropdownNavItem";
import NavItem from "../NavItem/NavItem";

export default function Navbar() {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (!isLanding) return;

    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));

    const handleHashChange = () => {
      setActiveId(window.location.hash);
    };
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [isLanding]);

  const filteredLinks = navLinks.filter((link) =>
    isLanding ? link.type === "anchor" : link.type === "route"
  );

  return (
    <div
      className={`${styles.navbar} ${isLanding ? styles.navbarLanding : ""}`}
    >
      {filteredLinks.map((link) => (
        <NavItem
          key={link.to}
          to={link.to}
          label={link.label}
          isActive={
            isLanding
              ? activeId === link.to || activeId === `#${link.to}`
              : location.pathname === link.to
          }
          type={link.type}
        />
      ))}
      {!isLanding && <DropdownNavItem />}
    </div>
  );
}
