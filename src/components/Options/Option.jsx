import React from "react";
import styles from "./Option.module.css"

export default function Option({number, title, subtitle}){
    return (
        <div className={styles.step}>
            <span className={styles.badge}>{number}</span>
            <div>
                <span className={styles.title}>{title}</span>
                <span className={styles.subtitle}>{subtitle}</span>
            </div>
        </div>
    )
}