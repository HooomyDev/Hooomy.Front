import React from "react";
import Footer from "../../components/Footer/Footer";
import styles from "./LandingPage.module.css";
import Hero from "../../components/Hero/Hero";
import Features from "../../components/Features/Features";
import Mission from "../../components/Mission/Mission";
import ForOrganizations from "../../components/ForOrganizations/ForOrganizations";
import Contacts from "../../components/Contacts/Contacts";
import Header from "../../components/Header/Header";
import LandingNavbar from "../../components/LandingNavbar/LandingNavbar";

export default function LandingPage() {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <LandingNavbar />
      <div className={styles.pageContent}>
        <Hero id="hero" />
        <Features id="features" />
        {/*<ForOrganizations id="orgs" />
        <Mission id="mission" />
  <Contacts id="contacts" />*/}
      </div>
      {/*<Footer />*/}
    </div>
  );
}
