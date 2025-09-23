import React from "react";
import LandingHeader from "../../components/LandingHeader/LandingHeader";
import Footer from "../../components/Footer/Footer";
import styles from "./LandingPage.module.css";
import Flow from "../../components/Flow/Flow";
import HowItWork from "../../components/landing/HowItWork/HowItWork";

export default function LandingPage() {
  return (
    <div className={styles.pageWrapper}>
      <LandingHeader />
      <div className={styles.pageContent}>
        <Flow />
        <HowItWork />
      </div>
      <Footer />
    </div>
  );
}
