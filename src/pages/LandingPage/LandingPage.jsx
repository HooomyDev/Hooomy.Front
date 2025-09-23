import React from "react";
import LandingHeader from "../../components/landing/Header/LandingHeader";
import Footer from "../../components/Footer/Footer"
import styles from "./LandingPage.module.css"
import Flow from "../../components/landing/Main/Flow/Flow";
import HowItWork from "../../components/landing/Main/HowItWork/HowItWork";

export default function LandingPage() {
    return (
      <div className={styles.pageWrapper}>
        <LandingHeader />
        <div className={styles.pageContent}>
          <Flow/>
          <HowItWork/>
        </div>
        <Footer />
      </div>
    );
  }