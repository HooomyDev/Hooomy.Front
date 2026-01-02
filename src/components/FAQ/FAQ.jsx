import React from "react";
import styles from "./FAQ.module.css";
import { useAuthStore } from "../../stores/authStore";
import GuestBanner from "../GuestBanner/GuestBanner";
import Block from "../../common/Block/Block";
import {
  ArrowPathIcon,
  ChatBubbleBottomCenterTextIcon,
  QuestionMarkCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import Accordion from "../../common/Accordion/Accordion";
import AccordionItemsRegister from "../AccordionItems/AccordionItemsRegister";
import AccordionItemsHelp from "../AccordionItems/AccordionItemsHelp";
import AccordionItemsCommon from "../AccordionItems/AccordionItemsCommon";

export default function FAQ() {
  const user = useAuthStore((state) => state.user);

  const categories = [
    { id: 1, title: "Регистрация и вход", to: "register", icon: UserGroupIcon },
    {
      id: 2,
      title: "Поддержка и контакты",
      to: "help",
      icon: ChatBubbleBottomCenterTextIcon,
    },
    { id: 3, title: "Частые ситуации", to: "common", icon: ArrowPathIcon },
  ];

  return (
    <div className={styles.wrapper}>
      <GuestBanner user={user} />
      <Block>
        <div className={styles.container}>
          <QuestionMarkCircleIcon className={styles.icon} />
          <div className={styles.title}>FAQ</div>
        </div>
      </Block>

      <div className={styles.categoriesWrapper}>
        <div className={styles.categoriesList}>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <a href={`#${category.to}`} className={styles.category}>
                <Icon className={styles.categoryIcon} /> {category.title}
              </a>
            );
          })}
        </div>
      </div>

      <Block title="Регистрация и вход" Icon={UserGroupIcon} id="register">
        <div className={styles.accordionWrapper}>
          <Accordion>
            <AccordionItemsRegister />
          </Accordion>
        </div>
      </Block>

      <Block
        title="Поддержка и контакты"
        Icon={ChatBubbleBottomCenterTextIcon}
        id="help"
      >
        <div className={styles.accordionWrapper}>
          <Accordion>
            <AccordionItemsHelp />
          </Accordion>
        </div>
      </Block>

      <Block title="Частые ситуации" Icon={ArrowPathIcon} id="common">
        <div className={styles.accordionWrapper}>
          <Accordion>
            <AccordionItemsCommon />
          </Accordion>
        </div>
      </Block>
    </div>
  );
}
