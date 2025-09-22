import React from "react";
import LandingHeader from "../../components/landing/Header/LandingHeader";
import Footer from "../../components/Footer/Footer"
import styles from "./LandingPage.module.css"

export default function LandingPage() {
    return (
      <div className={styles.pageWrapper}>
        <LandingHeader />
        <div className={styles.pageContent}>
        <section id="roles" style={{ height: "100vh", padding: "40px" }}>
        <h2>Роли</h2>
        <p>Описание ролей...</p>
      </section>

      <section id="flow" style={{ height: "100vh", padding: "40px" }}>
        <h2>Как это работает</h2>
        <p>Описание процесса...</p>
      </section>

      <section id="residents" style={{ height: "100vh", padding: "40px" }}>
        <h2>Жильцам</h2>
        <p>Информация для жильцов...</p>
      </section>

      <section id="orgs" style={{ height: "100vh", padding: "40px", background: "#f5f5f5" }}>
        <h2>Организациям</h2>
        <p>Здесь будет информация для организаций, партнёров или управляющих компаний.</p>
      </section>

      <section id="contacts" style={{ height: "100vh", padding: "40px" }}>
        <h2>Контакты</h2>
        <p>Как с нами связаться...</p>
      </section>
        </div>
        <Footer />
      </div>
    );
  }