import React from "react";
import Slider from "../../../Slider/Slider";
import styles from "./HowItWork.module.css"
import { slides } from "./slides";

export default function HowItWork(){
    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h2 className={styles.heading} id="work">Возможности</h2>
                <div className={styles.sliderContainer}>
                    <Slider slides={slides} />
                </div>
            </div>
        </div>
    )
}