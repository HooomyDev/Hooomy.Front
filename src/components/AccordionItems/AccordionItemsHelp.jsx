import React from "react";
import styles from "./AccordionItems.module.css";
import AccordionItem from "../../common/Accordion/AccordionItem";
import { useT } from "../../utils/useT";

export default function AccordionItemsHelp() {
  const t = useT();

  const list = (key) => t(key, { returnObjects: true }) || [];

  return (
    <>
      <AccordionItem index={0} title={t("faq.items.help.0.title")}>
        <div className={styles.faqAnswerContent}>
          <p className={styles.faqParagraph}>
            {t("faq.items.help.0.paragraph")}
          </p>

          <h4 className={styles.faqHeading}>
            {t("faq.items.help.0.channels")}
          </h4>
          <ul className={styles.faqList}>
            <li>
              <strong>{t("faq.items.help.0.email")}</strong>
              <ul className={styles.faqSubList}>
                {list("faq.items.help.0.emailDetails").map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </li>
            <li>
              <strong>{t("faq.items.help.0.chat")}</strong>
              <ul className={styles.faqSubList}>
                {list("faq.items.help.0.chatDetails").map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </li>
          </ul>

          <h4 className={styles.faqHeading}>
            {t("faq.items.help.0.whatToSpecify")}
          </h4>
          <ul className={styles.faqList}>
            {list("faq.items.help.0.specifyDetails").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <p className={styles.faqParagraph}>{t("faq.items.help.0.tip")}</p>
        </div>
      </AccordionItem>

      <AccordionItem index={1} title={t("faq.items.help.1.title")}>
        <div className={styles.faqAnswerContent}>
          <p className={styles.faqParagraph}>
            {t("faq.items.help.1.paragraph")}
          </p>

          <h4 className={styles.faqHeading}>{t("faq.items.help.1.portal")}</h4>
          <ol className={styles.faqList}>
            {list("faq.items.help.1.steps").map((step, i) => (
              <li key={i}>{step}</li>
            ))}
            <li>
              <ul className={styles.faqSubList}>
                {list("faq.items.help.1.systemShows").map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </li>
          </ol>

          <p className={styles.faqParagraph}>{t("faq.items.help.1.tip")}</p>
        </div>
      </AccordionItem>

      <AccordionItem index={2} title={t("faq.items.help.2.title")}>
        <div className={styles.faqAnswerContent}>
          <p className={styles.faqParagraph}>
            {t("faq.items.help.2.paragraph")}
          </p>

          <h4 className={styles.faqHeading}>{t("faq.items.help.2.ways")}</h4>
          <ol className={styles.faqList}>
            {list("faq.items.help.2.formSteps").map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>

          <h4 className={styles.faqHeading}>
            {t("faq.items.help.2.mustSpecify")}
          </h4>
          <ul className={styles.faqList}>
            {list("faq.items.help.2.specifyDetails").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h4 className={styles.faqHeading}>{t("faq.items.help.2.terms")}</h4>
          <ul className={styles.faqList}>
            {list("faq.items.help.2.termsDetails").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <p className={styles.faqParagraph}>
            {t("faq.items.help.2.confidentiality")}
          </p>
        </div>
      </AccordionItem>

      <AccordionItem index={3} title={t("faq.items.help.3.title")}>
        <div className={styles.faqAnswerContent}>
          <p className={styles.faqParagraph}>
            {t("faq.items.help.3.paragraph")}
          </p>

          <h4 className={styles.faqHeading}>
            {t("faq.items.help.3.emergency")}
          </h4>
          <ul className={styles.faqList}>
            <li>
              <strong>{t("faq.items.help.3.dispatcher")}</strong>
              <ul className={styles.faqSubList}>
                {list("faq.items.help.3.dispatcherDetails").map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </li>
            <li>
              <strong>{t("faq.items.help.3.cityServices")}</strong>
              <ul className={styles.faqSubList}>
                {list("faq.items.help.3.cityServicesDetails").map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </li>
          </ul>

          <h4 className={styles.faqHeading}>
            {t("faq.items.help.3.supportNumber")}
          </h4>
          <ul className={styles.faqList}>
            <li>
              <strong>{t("faq.items.help.3.autoAnswer")}</strong>
              <ul className={styles.faqSubList}>
                {list("faq.items.help.3.autoAnswerDetails").map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </li>
            <li>
              <strong>{t("faq.items.help.3.chatBot")}</strong>
              <ul className={styles.faqSubList}>
                {list("faq.items.help.3.chatBotDetails").map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </li>
          </ul>

          <p className={styles.faqParagraph}>{t("faq.items.help.3.tip")}</p>
        </div>
      </AccordionItem>

      <AccordionItem index={4} title={t("faq.items.help.4.title")}>
        <div className={styles.faqAnswerContent}>
          <p className={styles.faqParagraph}>
            {t("faq.items.help.4.paragraph")}
          </p>

          <h4 className={styles.faqHeading}>{t("faq.items.help.4.ways")}</h4>
          <ul className={styles.faqList}>
            {list("faq.items.help.4.waysDetails").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h4 className={styles.faqHeading}>
            {t("faq.items.help.4.accepted")}
          </h4>
          <ul className={styles.faqList}>
            {list("faq.items.help.4.acceptedDetails").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </AccordionItem>
    </>
  );
}
