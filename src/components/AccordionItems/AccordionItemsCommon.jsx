import React from "react";
import AccordionItem from "../../common/Accordion/AccordionItem";
import styles from "./AccordionItems.module.css";
import { useT } from "../../utils/useT";

export default function AccordionItemsCommon() {
  const t = useT();
  const list = (key) => t(key) || [];

  return (
    <>
      <AccordionItem index={0} title={t("faq.items.common.0.title")}>
        <div className={styles.faqAnswerContent}>
          <p className={styles.faqParagraph}>
            {t("faq.items.common.0.paragraph")}
          </p>

          <h4 className={styles.faqHeading}>
            {t("faq.items.common.0.headingImmediate")}
          </h4>
          <ol className={styles.faqList}>
            {list("faq.items.common.0.stepsImmediate").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>

          <h4 className={styles.faqHeading}>
            {t("faq.items.common.0.headingCall")}
          </h4>
          <ul className={styles.faqList}>
            {list("faq.items.common.0.contacts").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h4 className={styles.faqHeading}>
            {t("faq.items.common.0.headingDocs")}
          </h4>
          <ul className={styles.faqList}>
            {list("faq.items.common.0.docs").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <p className={styles.faqParagraph}>{t("faq.items.common.0.tip")}</p>
        </div>
      </AccordionItem>

      <AccordionItem index={1} title={t("faq.items.common.1.title")}>
        <div className={styles.faqAnswerContent}>
          <p className={styles.faqParagraph}>
            {t("faq.items.common.1.paragraph")}
          </p>

          <h4 className={styles.faqHeading}>
            {t("faq.items.common.1.headingCheck")}
          </h4>
          <ul className={styles.faqList}>
            {list("faq.items.common.1.checks").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h4 className={styles.faqHeading}>
            {t("faq.items.common.1.headingActions")}
          </h4>
          <ol className={styles.faqList}>
            {list("faq.items.common.1.actions").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>

          <h4 className={styles.faqHeading}>
            {t("faq.items.common.1.headingNorms")}
          </h4>
          <ul className={styles.faqList}>
            {list("faq.items.common.1.norms").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <p className={styles.faqParagraph}>{t("faq.items.common.1.tip")}</p>
        </div>
      </AccordionItem>

      <AccordionItem index={2} title={t("faq.items.common.2.title")}>
        <div className={styles.faqAnswerContent}>
          <p className={styles.faqParagraph}>
            {t("faq.items.common.2.paragraph")}
          </p>

          <h4 className={styles.faqHeading}>
            {t("faq.items.common.2.headingDetect")}
          </h4>
          <ul className={styles.faqList}>
            {list("faq.items.common.2.detect").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h4 className={styles.faqHeading}>
            {t("faq.items.common.2.headingFlat")}
          </h4>
          <ol className={styles.faqList}>
            {list("faq.items.common.2.flatActions").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>

          <h4 className={styles.faqHeading}>
            {t("faq.items.common.2.headingCommon")}
          </h4>
          <ol className={styles.faqList}>
            {list("faq.items.common.2.commonActions").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>

          <h4 className={styles.faqHeading}>
            {t("faq.items.common.2.headingPayment")}
          </h4>
          <ul className={styles.faqList}>
            {list("faq.items.common.2.payment").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <p className={styles.faqParagraph}>{t("faq.items.common.2.tip")}</p>
        </div>
      </AccordionItem>

      <AccordionItem index={3} title={t("faq.items.common.3.title")}>
        <div className={styles.faqAnswerContent}>
          <p className={styles.faqParagraph}>
            {t("faq.items.common.3.paragraph")}
          </p>

          <h4 className={styles.faqHeading}>
            {t("faq.items.common.3.headingMeasures")}
          </h4>
          <ol className={styles.faqList}>
            {list("faq.items.common.3.measures").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>

          <h4 className={styles.faqHeading}>
            {t("faq.items.common.3.headingInform")}
          </h4>
          <ul className={styles.faqList}>
            {list("faq.items.common.3.inform").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h4 className={styles.faqHeading}>
            {t("faq.items.common.3.headingNorms")}
          </h4>
          <ul className={styles.faqList}>
            {list("faq.items.common.3.norms").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h4 className={styles.faqHeading}>
            {t("faq.items.common.3.headingRights")}
          </h4>
          <ul className={styles.faqList}>
            {list("faq.items.common.3.rights").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <p className={styles.faqParagraph}>{t("faq.items.common.3.tip")}</p>
        </div>
      </AccordionItem>

      <AccordionItem index={4} title={t("faq.items.common.4.title")}>
        <div className={styles.faqAnswerContent}>
          <p className={styles.faqParagraph}>
            {t("faq.items.common.4.paragraph")}
          </p>

          <h4 className={styles.faqHeading}>
            {t("faq.items.common.4.headingRules")}
          </h4>
          <ol className={styles.faqList}>
            {list("faq.items.common.4.rules").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>

          <h4 className={styles.faqHeading}>
            {t("faq.items.common.4.headingNumbers")}
          </h4>
          <ul className={styles.faqList}>
            {list("faq.items.common.4.numbers").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h4 className={styles.faqHeading}>
            {t("faq.items.common.4.headingResponse")}
          </h4>
          <ul className={styles.faqList}>
            {list("faq.items.common.4.response").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h4 className={styles.faqHeading}>
            {t("faq.items.common.4.headingAfter")}
          </h4>
          <ul className={styles.faqList}>
            {list("faq.items.common.4.after").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <p className={styles.faqParagraph}>{t("faq.items.common.4.tip")}</p>
        </div>
      </AccordionItem>

      <AccordionItem index={5} title={t("faq.items.common.5.title")}>
        <div className={styles.faqAnswerContent}>
          <p className={styles.faqParagraph}>
            {t("faq.items.common.5.paragraph")}
          </p>

          <h4 className={styles.faqHeading}>
            {t("faq.items.common.5.headingDanger")}
          </h4>
          <ul className={styles.faqList}>
            {list("faq.items.common.5.danger").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h4 className={styles.faqHeading}>
            {t("faq.items.common.5.headingActions")}
          </h4>
          <ol className={styles.faqList}>
            {list("faq.items.common.5.actions").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>

          <h4 className={styles.faqHeading}>
            {t("faq.items.common.5.headingWhere")}
          </h4>
          <ul className={styles.faqList}>
            {list("faq.items.common.5.where").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h4 className={styles.faqHeading}>
            {t("faq.items.common.5.headingCauses")}
          </h4>
          <ul className={styles.faqList}>
            {list("faq.items.common.5.causes").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <p className={styles.faqParagraph}>{t("faq.items.common.5.tip")}</p>
        </div>
      </AccordionItem>

      <AccordionItem index={6} title={t("faq.items.common.6.title")}>
        <div className={styles.faqAnswerContent}>
          <p className={styles.faqParagraph}>
            {t("faq.items.common.6.paragraph")}
          </p>

          <h4 className={styles.faqHeading}>
            {t("faq.items.common.6.headingImmediate")}
          </h4>
          <ol className={styles.faqList}>
            {list("faq.items.common.6.stepsImmediate").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>

          <h4 className={styles.faqHeading}>
            {t("faq.items.common.6.headingEvacuation")}
          </h4>
          <ul className={styles.faqList}>
            {list("faq.items.common.6.evacuation").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h4 className={styles.faqHeading}>
            {t("faq.items.common.6.headingSources")}
          </h4>
          <ul className={styles.faqList}>
            {list("faq.items.common.6.sources").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h4 className={styles.faqHeading}>
            {t("faq.items.common.6.headingPrevention")}
          </h4>
          <ul className={styles.faqList}>
            {list("faq.items.common.6.prevention").map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <p className={styles.faqParagraph}>{t("faq.items.common.6.tip")}</p>
        </div>
      </AccordionItem>
    </>
  );
}
