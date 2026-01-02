import React from "react";
import styles from "./AccordionItems.module.css";
import AccordionItem from "../../common/Accordion/AccordionItem";

export default function AccordionItemsRegister() {
  return (
    <>
      <AccordionItem index={0} title="Как зарегистрироваться на портале?">
        <div className={styles.faqContent}>
          <p className={styles.faqHeading}>
            Для регистрации выполните следующие шаги:
          </p>
          <ol className={styles.faqList}>
            <li>
              Нажмите кнопку "Войти" в правом верхнем углу страницы и перейдите
              на страницу регистрации.
            </li>
            <li>
              Заполните обязательные поля:
              <ul className={styles.faqSubList}>
                <li>Фамилия, Имя, Отчество</li>
                <li>Электронная почта (будет использоваться для входа)</li>
                <li>Придумайте надежный пароль</li>
              </ul>
            </li>
            <li>
              Подтвердите email, перейдя по ссылке в письме, которое придет в
              течение 5 минут
            </li>
          </ol>
        </div>
      </AccordionItem>

      <AccordionItem index={1} title="Какие данные нужны для регистрации?">
        <div className={styles.faqContent}>
          <p className={styles.faqHeading}>
            Для успешной регистрации вам потребуется предоставить:
          </p>
          <h4 className={styles.faqHeading}>Обязательные данные:</h4>
          <ul className={styles.faqList}>
            <li>
              <strong>ФИО полностью</strong>
            </li>
            <li>
              <strong>Действующий email</strong> (для входа и уведомлений)
            </li>
            <li>
              <strong>Надежный пароль</strong> (рекомендуем использовать
              комбинацию букв, цифр и спецсимволов)
            </li>
          </ul>
          <h4 className={styles.faqHeading}>
            Дополнительные данные (можно заполнить позже):
          </h4>
          <ul className={styles.faqList}>
            <li>Адрес проживания (улица, дом, квартира)</li>
          </ul>
          <p className={styles.faqParagraph}>
            <strong>Безопасность данных:</strong> Все ваши персональные данные
            защищены
          </p>
        </div>
      </AccordionItem>

      <AccordionItem index={3} title="Как войти в личный кабинет?">
        <div className={styles.faqContent}>
          <p className={styles.faqHeading}>
            Для входа в личный кабинет необходимо:
          </p>
          <ol className={styles.faqList}>
            <li>Нажмите кнопку «Войти» в правом верхнем углу сайта</li>
            <li>Введите email, указанный при регистрации</li>
            <li>Введите пароль</li>
            <li>Нажмите «Войти»</li>
          </ol>
          <h4 className={styles.faqHeading}>Если не получается войти:</h4>
          <ul className={styles.faqList}>
            <li>
              Проверьте правильность ввода email и пароля (учитывайте регистр
              букв)
            </li>
            <li>Убедитесь, что Caps Lock отключен</li>
            <li>Если забыли пароль — воспользуйтесь функцией восстановления</li>
            <li>
              Если email не подтвержден — проверьте папку «Спам» или запросите
              новое письмо подтверждения
            </li>
          </ul>
        </div>
      </AccordionItem>

      <AccordionItem index={4} title="Как восстановить забытый пароль?">
        <div className={styles.faqContent}>
          <p className={styles.faqParagraph}>
            Если вы забыли пароль от личного кабинета, восстановить его можно за
            несколько минут:
          </p>
          <h4 className={styles.faqHeading}>Пошаговая инструкция:</h4>
          <ol className={styles.faqList}>
            <li>На странице входа нажмите ссылку «Забыли пароль?»</li>
            <li>Введите email, который вы указывали при регистрации</li>
            <li>Нажмите «Восстановить пароль»</li>
            <li>
              Проверьте свою почту — вам придет письмо со ссылкой для сброса
              пароля
            </li>
            <li>
              Перейдите по ссылке из письма (действительна в течение 24 часов)
            </li>
            <li>Придумайте и введите новый пароль</li>
            <li>Подтвердите новый пароль, введя его еще раз</li>
            <li>Нажмите «Сохранить новый пароль»</li>
          </ol>
          <h4 className={styles.faqHeading}>Если письмо не приходит:</h4>
          <ul className={styles.faqList}>
            <li>Проверьте папку «Спам» или «Рассылки»</li>
            <li>
              Убедитесь, что вы вводите email, который использовали при
              регистрации
            </li>
            <li>Подождите 5-10 минут (иногда письма задерживаются)</li>
            <li>
              Если письмо так и не пришло, повторите процедуру или обратитесь в
              поддержку
            </li>
          </ul>
        </div>
      </AccordionItem>

      <AccordionItem
        index={5}
        title="Как изменить email или телефон в личном кабинете?"
      >
        <div className={styles.faqContent}>
          <p className={styles.faqParagraph}>
            Изменить контактные данные в личном кабинете можно самостоятельно:
          </p>
          <h4 className={styles.faqHeading}>Для изменения email:</h4>
          <ol className={styles.faqList}>
            <li>Войдите в личный кабинет</li>
            <li>Перейдите в раздел «Профиль»</li>
            <li>Введите новый email и текущий пароль для подтверждения</li>
            <li>На новый email придет письмо с подтверждением</li>
            <li>Перейдите по ссылке из письма для завершения смены email</li>
          </ol>
          <h4 className={styles.faqHeading}>
            Для изменения номера телефона повторите действия из прошлого пункта
          </h4>
          <p className={styles.faqParagraph}>
            <strong>Важно:</strong> После смены email все уведомления будут
            приходить на новый адрес. Старый email перестанет быть активным для
            входа в систему.
          </p>
        </div>
      </AccordionItem>

      <AccordionItem
        index={6}
        title="Что делать, если я не получил письмо подтверждения?"
      >
        <div className={styles.faqContent}>
          <p className={styles.faqParagraph}>
            Если письмо с подтверждением не приходит, выполните следующие
            действия:
          </p>
          <h4 className={styles.faqHeading}>Поиск письма:</h4>
          <ul className={styles.faqList}>
            <li>Проверьте папку «Спам», «Рассылки» или «Промоакции»</li>
            <li>
              Используйте поиск по почте с запросами: «ЖКХ Сервис»,
              «подтверждение email», «активация аккаунта»
            </li>
            <li>Убедитесь, что в почтовом ящике достаточно свободного места</li>
          </ul>
          <h4 className={styles.faqHeading}>Повторная отправка письма:</h4>
          <ol className={styles.faqList}>
            <li>Вернитесь на страницу входа</li>
            <li>Введите ваш email и пароль (если вы уже регистрировались)</li>
            <li>
              Если email не подтвержден, система предложит отправить письмо
              повторно
            </li>
            <li>Нажмите «Отправить письмо повторно»</li>
            <li>Подождите до 15 минут и проверьте почту снова</li>
          </ol>
          <h4 className={styles.faqHeading}>Если письмо так и не пришло:</h4>
          <ul className={styles.faqList}>
            <li>Проверьте правильность введенного email при регистрации</li>
            <li>Попробуйте использовать другой email адрес</li>
            <li>
              Обратитесь в поддержку, предоставив email, который вы использовали
              при регистрации
            </li>
            <li>
              Попробуйте зарегистрироваться в другой день (возможны временные
              проблемы с почтовыми сервисами)
            </li>
          </ul>
        </div>
      </AccordionItem>
    </>
  );
}
