import React from "react";
import styles from "./AccordionItems.module.css";
import AccordionItem from "../../common/Accordion/AccordionItem";
import { useT } from "../../utils/useT";

export default function AccordionItemsRegister() {
  const t = useT();
  const list = (key) => t(key) || [];

  return (
    <>
      <AccordionItem index={0} title={t("faq.items.register.0.title")}>
        <div className={styles.faqContent}>
          <p className={styles.faqHeading}>
            {t("faq.items.register.0.paragraph")}
          </p>
          <ol className={styles.faqList}>
            {list("faq.items.register.0.steps").map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      </AccordionItem>

      <AccordionItem index={1} title={t("faq.items.register.1.title")}>
        <div className={styles.faqContent}>
          <p className={styles.faqHeading}>
            {t("faq.items.register.1.paragraph")}
          </p>

          <h4 className={styles.faqHeading}>
            {t("faq.items.register.1.requiredTitle")}
          </h4>
          <ul className={styles.faqList}>
            {list("faq.items.register.1.required").map((item, i) => (
              <li key={i}>
                <strong>{item}</strong>
              </li>
            ))}
          </ul>

          <h4 className={styles.faqHeading}>
            {t("faq.items.register.1.optionalTitle")}
          </h4>
          <ul className={styles.faqList}>
            {list("faq.items.register.1.optional").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <p className={styles.faqParagraph}>
            {t("faq.items.register.1.securityNote")}
          </p>
        </div>
      </AccordionItem>

      <AccordionItem index={3} title={t("faq.items.register.2.title")}>
        <div className={styles.faqContent}>
          <p className={styles.faqHeading}>
            {t("faq.items.register.2.paragraph")}
          </p>
          <ol className={styles.faqList}>
            {list("faq.items.register.2.steps").map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>

          <h4 className={styles.faqHeading}>
            {t("faq.items.register.2.ifCannotTitle")}
          </h4>
          <ul className={styles.faqList}>
            {list("faq.items.register.2.ifCannot").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </AccordionItem>

      <AccordionItem index={4} title={t("faq.items.register.3.title")}>
        <div className={styles.faqContent}>
          <p className={styles.faqParagraph}>
            {t("faq.items.register.3.paragraph")}
          </p>

          <h4 className={styles.faqHeading}>
            {t("faq.items.register.3.stepsTitle")}
          </h4>
          <ol className={styles.faqList}>
            {list("faq.items.register.3.steps").map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>

          <h4 className={styles.faqHeading}>
            {t("faq.items.register.3.ifNoMailTitle")}
          </h4>
          <ul className={styles.faqList}>
            {list("faq.items.register.3.ifNoMail").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </AccordionItem>

      <AccordionItem index={5} title={t("faq.items.register.4.title")}>
        <div className={styles.faqContent}>
          <p className={styles.faqParagraph}>
            {t("faq.items.register.4.paragraph")}
          </p>

          <h4 className={styles.faqHeading}>
            {t("faq.items.register.4.changeEmailTitle")}
          </h4>
          <ol className={styles.faqList}>
            {list("faq.items.register.4.changeEmailSteps").map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>

          <h4 className={styles.faqHeading}>
            {t("faq.items.register.4.changePhoneNote")}
          </h4>
          <p className={styles.faqParagraph}>
            {t("faq.items.register.4.importantNote")}
          </p>
        </div>
      </AccordionItem>

      <AccordionItem index={6} title={t("faq.items.register.5.title")}>
        <div className={styles.faqContent}>
          <p className={styles.faqParagraph}>
            {t("faq.items.register.5.paragraph")}
          </p>

          <h4 className={styles.faqHeading}>
            {t("faq.items.register.5.searchTitle")}
          </h4>
          <ul className={styles.faqList}>
            {list("faq.items.register.5.searchSteps").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h4 className={styles.faqHeading}>
            {t("faq.items.register.5.resendTitle")}
          </h4>
          <ol className={styles.faqList}>
            {list("faq.items.register.5.resendSteps").map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>

          <h4 className={styles.faqHeading}>
            {t("faq.items.register.5.ifStillNoMailTitle")}
          </h4>
          <ul className={styles.faqList}>
            {list("faq.items.register.5.ifStillNoMail").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </AccordionItem>
    </>
  );
}
