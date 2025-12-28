import React, { useEffect, useState } from "react";
import Block from "../../common/Block/Block";
import {
  ChevronUpIcon,
  DocumentArrowDownIcon,
  DocumentTextIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import styles from "./UserTerms.module.css";

export default function UserTerms() {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/files/privacy-policy.pdf";
    link.download = "privacy-policy.pdf";
    link.click();
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  const handleScrollToAnchor = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Block>
          <div className={styles.title}>
            <DocumentTextIcon className={styles.icon} />
            Пользовательское соглашение
          </div>
        </Block>

        <div className={styles.download} onClick={handleDownload}>
          <DocumentArrowDownIcon className={styles.icon} />
        </div>
      </div>

      <Block title="Содержание" Icon={DocumentTextIcon}>
        <div className={styles.chapter}>
          <ul>
            <li>
              <a href="#general">1. Общие положения</a>
            </li>
            <li>
              <a href="#account">2. Регистрация и учетная запись</a>
            </li>
            <li>
              <a href="#usage">3. Правила использования сервиса</a>
            </li>
            <li>
              <a href="#intellectual-property">
                4. Права на материалы и контент
              </a>
            </li>
            <li>
              <a href="#privacy">5. Персональные данные и конфиденциальность</a>
            </li>
            <li>
              <a href="#liability">6. Ограничение ответственности</a>
            </li>
            <li>
              <a href="#payments">7. Оплата услуг и тарифы</a>
            </li>
            <li>
              <a href="#termination">8. Прекращение использования сервиса</a>
            </li>
            <li>
              <a href="#disputes">9. Порядок разрешения споров</a>
            </li>
            <li>
              <a href="#final">10. Заключительные положения</a>
            </li>
          </ul>
        </div>
      </Block>

      <Block title="Общие положения" Icon={InformationCircleIcon} id="general">
        <div className={styles.chapter}>
          <p>
            <strong>1.1.</strong> Настоящее Пользовательское соглашение (далее —
            «Соглашение») регулирует отношения между владельцем «Hooome;)»
            (далее — «Сервис» или «Администрация») и пользователем (далее —
            «Пользователь») при использовании Сервиса.
          </p>
          <p>
            <strong>1.2.</strong> Используя Сервис, Пользователь выражает свое
            полное и безоговорочное согласие с условиями настоящего Соглашения.
          </p>
          <p>
            <strong>1.3.</strong> Администрация оставляет за собой право вносить
            изменения в настоящее Соглашение. Продолжение использования Сервиса
            после внесения изменений означает согласие Пользователя с новой
            редакцией Соглашения.
          </p>
        </div>
      </Block>

      <Block
        title="Регистрация и учётная запись"
        Icon={InformationCircleIcon}
        id="account"
      >
        <div className={styles.chapter}>
          <p>
            <strong>2.1.</strong> Для доступа к определенным функциям Сервиса
            Пользователю может потребоваться создать учетную запись.
          </p>
          <p>
            <strong>2.2.</strong> Пользователь обязуется:
          </p>
          <ul>
            <li>
              Предоставлять точную и актуальную информацию при регистрации
            </li>
            <li>
              Обеспечивать конфиденциальность данных для входа в учетную запись
            </li>
            <li>
              Незамедлительно уведомлять Администрацию о любом
              несанкционированном доступе к учетной записи
            </li>
          </ul>
          <p>
            <strong>2.3.</strong> Администрация оставляет за собой право
            приостановить или удалить учетную запись Пользователя при нарушении
            условий Соглашения.
          </p>
        </div>
      </Block>

      <Block
        title="Условия использования Сервиса"
        Icon={InformationCircleIcon}
        id="usage"
      >
        <div className={styles.chapter}>
          <p>
            <strong>3.1.</strong> Пользователь соглашается использовать Сервис
            только в законных целях и способом, который не нарушает права
            третьих лиц.
          </p>

          <p>
            <strong>3.2.</strong> Запрещается:
          </p>
          <ul>
            <li>
              Размещать незаконный, вредоносный, угрожающий, оскорбительный
              контент
            </li>
            <li>Нарушать права интеллектуальной собственности</li>
            <li>Распространять вирусы или вредоносный код</li>
            <li>
              Собирать или хранить персональные данные других пользователей без
              их согласия
            </li>
            <li>
              Предпринимать действия, которые могут нарушить работу Сервиса
            </li>
          </ul>
        </div>
      </Block>

      <Block
        title="Интелектуальная собственность"
        Icon={InformationCircleIcon}
        id="intellectual-property"
      >
        <div className={styles.chapter}>
          <p>
            <strong>4.1.</strong> Все материалы, размещенные на Сервисе (тексты,
            изображения и др.), являются объектами интеллектуальной
            собственности Администрации или правообладателей.
          </p>

          <p>
            <strong>4.2.</strong> Пользователю предоставляется ограниченная,
            неисключительная, непередаваемая лицензия на использование Сервиса в
            соответствии с условиями настоящего Соглашения.
          </p>
        </div>
      </Block>

      <Block
        title="Конфиденциальность и защита данных"
        Icon={InformationCircleIcon}
        id="privacy"
      >
        <div className={styles.chapter}>
          <p>
            <strong>5.1.</strong> Обработка персональных данных Пользователя
            регулируется Политикой конфиденциальности, которая является
            неотъемлемой частью настоящего Соглашения.
          </p>

          <p>
            <strong>5.2.</strong> Используя Сервис, Пользователь дает согласие
            на обработку своих персональных данных в соответствии с действующим
            законодательством Республики Беларусь.
          </p>
        </div>
      </Block>

      <Block
        title="Ограничение ответственности"
        Icon={InformationCircleIcon}
        id="liability"
      >
        <div className={styles.chapter}>
          <p>
            <strong>6.1.</strong> Сервис предоставляется «как есть».
            Администрация не гарантирует бесперебойную работу Сервиса и
            соответствие его ожиданиям Пользователя.
          </p>

          <p>
            <strong>6.2.</strong> Администрация не несет ответственности за:
          </p>
          <ul>
            <li>
              Прямой или косвенный ущерб, возникший в результате использования
              Сервиса
            </li>
            <li>Действия Пользователей, нарушающие условия Соглашения</li>
            <li>
              Работу сторонних ресурсов, ссылки на которые могут размещаться на
              Сервисе
            </li>
          </ul>
        </div>
      </Block>

      <Block
        title="Платежи и тарифы"
        Icon={InformationCircleIcon}
        id="payments"
      >
        <div className={styles.chapter}>
          <p>
            <strong>7.1.</strong> Некоторые функции Сервиса могут быть
            предоставлены на платной основе. Условия оплаты описываются в
            соответствующих разделах Сервиса.
          </p>

          <p>
            <strong>7.2.</strong> Все цены указаны с учетом НДС, если применимо.
            Администрация оставляет за собой право изменять тарифы, уведомив
            Пользователей.
          </p>
        </div>
      </Block>

      <Block
        title="Прекращение действия"
        Icon={InformationCircleIcon}
        id="termination"
      >
        <div className={styles.chapter}>
          <p>
            <strong>8.1.</strong> Пользователь может прекратить использование
            Сервиса в любое время.
          </p>

          <p>
            <strong>8.2.</strong> Администрация имеет право приостановить или
            прекратить доступ Пользователя к Сервису при нарушении условий
            настоящего Соглашения.
          </p>
        </div>
      </Block>

      <Block
        title="Разрешение споров"
        Icon={InformationCircleIcon}
        id="disputes"
      >
        <div className={styles.chapter}>
          <p>
            <strong>9.1.</strong> Все споры решаются путем переговоров. В случае
            недостижения согласия спор передается на рассмотрение в соответствии
            с действующим законодательством Республики Беларусь.
          </p>
        </div>
      </Block>

      <Block
        title="Заключительные положения"
        Icon={InformationCircleIcon}
        id="final"
      >
        <div className={styles.chapter}>
          <p>
            <strong>10.1.</strong> Настоящее Соглашение вступает в силу с
            момента начала использования Сервиса Пользователем.
          </p>

          <p>
            <strong>10.2.</strong> Если какое-либо положение Соглашения будет
            признано недействительным, остальные положения сохранят свою силу.
          </p>

          <p>
            <strong>10.3.</strong> Связь с Администрацией осуществляется по
            электронной почте:{" "}
            <a href="mailto:artem.artusevskij01@gmail.com">
              artem.artusevskij01@gmail.com
            </a>{" "}
            или через форму обратной связи на Сайте.
          </p>
        </div>
      </Block>

      <button
        onClick={() =>
          !isAtTop ? handleScrollToTop() : handleScrollToAnchor("general")
        }
        className={styles.toTopButton}
      >
        <ChevronUpIcon
          className={`${styles.icon} ${!isAtTop ? styles.down : styles.up}`}
        />
      </button>
    </div>
  );
}
