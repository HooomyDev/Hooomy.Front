import React from "react";
import LandingHeader from "../../components/LandingHeader/LandingHeader";
import Footer from "../../components/Footer/Footer";
import styles from "./LandingPage.module.css";
import Hero from "../../components/Hero/Hero";
import Features from "../../components/Features/Features";
import Mission from "../../components/Mission/Mission";
import ForOrganizations from "../../components/ForOrganizations/ForOrganizations";
import { items } from "../../components/Features/items";

export default function LandingPage() {
  return (
    <div className={styles.pageWrapper}>
      <LandingHeader />
      <div className={styles.pageContent}>
        <Hero />
        <Features items={items} />
        <Mission />
        <ForOrganizations />
      </div>
      <Footer />
    </div>
  );
}
