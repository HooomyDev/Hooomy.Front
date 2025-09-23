import React from "react";
import styles from "./Flow.module.css"
import Card from "./Card";

export default function Flow(){
    return (
        <div id="roles" className={styles.container}>
            <div className={styles.textContainer}>
                <p className={styles.name}>
                    ЕДИНАЯ ПЛАТФОРМА ЖКХ
                </p>
                <h1 className={styles.title}>
                    Платежи, заявки, документы и новости — без очередей и лишних звонков
                </h1>

                <p className={styles.subtext}>
                    Минск в порядке — благодаря вам!
                </p>

                <ul className={styles.features}>
                    <li>Доступ к документам онлайн</li>
                    <li>Олата ЖКУ без комиссии</li>
                    <li>Уведомления о работах</li>
                </ul>
            </div>

            <Card/>
        </div>
    );
}