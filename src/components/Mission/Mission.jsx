import React from "react";
import styles from "./Mission.module.css";

export default function Mission({ id }) {
  return (
    <section id={id} className={styles.wrapper}>
      <h2 className={styles.heading}>Наша миссия</h2>

      <div className={styles.textContainer}>
        <p className={styles.text}>
          Мы создаём <strong>единую цифровую платформу ЖКХ,</strong>
          которая делает сферу управления домами прозрачной, удобной и доступной
          для каждого. Наша цель — устранить бюрократию, упростить
          взаимодействие между жильцами и управляющими компаниями, и внедрить
          современные технологии в повседневную жизнь.
          <br />
          <br />
          <blockquote class="quote">
            <p>
              «Комфорт начинается с понятных процессов, честных данных и
              открытого диалога.»
            </p>
            <cite class="author">— Артюшевский Артём</cite>
          </blockquote>
          <br />
          <br />
          Поэтому наша платформа — это не просто инструмент, а шаг к цифровому и
          справедливому будущему города.
        </p>
      </div>
    </section>
  );
}
