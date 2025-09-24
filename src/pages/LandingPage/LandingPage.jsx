import React from "react";
import LandingHeader from "../../components/LandingHeader/LandingHeader";
import Footer from "../../components/Footer/Footer";
import styles from "./LandingPage.module.css";
import Hero from "../../components/Hero/Hero";
import Features from "../../components/Features/Features";
import Mission from "../../components/Mission/Mission";
import ForOrganizations from "../../components/ForOrganizations/ForOrganizations";
import Contacts from "../../components/Contacts/Contacts";

export default function LandingPage() {
  return (
    <div className={styles.pageWrapper}>
      <LandingHeader />
      <div className={styles.pageContent}>
        <Hero id="hero" />
        <Features id="features" />
        <Mission id="mission" />
        <ForOrganizations id="orgs" />
        <Contacts id="contacts" />
      </div>
      <Footer />
    </div>
  );
}
