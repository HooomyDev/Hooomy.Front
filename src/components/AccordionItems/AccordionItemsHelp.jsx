import React from "react";
import styles from "./AccordionItems.module.css";
import AccordionItem from "../../common/Accordion/AccordionItem";

export default function AccordionItemsHelp() {
  return (
    <>
      <AccordionItem
        index={0}
        title="Как связаться с технической поддержкой портала?"
      >
        <div className={styles.faqAnswerContent}>
          <p className={styles.faqParagraph}>
            Обратиться в техническую поддержку портала ЖКХ Сервис можно
            несколькими способами:
          </p>

          <h4 className={styles.faqHeading}>Основные каналы связи:</h4>
          <ul className={styles.faqList}>
            <li>
              <strong>Электронная почта:</strong> hooomy.help.by@gmail.com
              <ul className={styles.faqSubList}>
                <li>Отвечаем в течение 1 рабочего дня</li>
                <li>В теме письма укажите суть проблемы</li>
                <li>Приложите скриншоты при необходимости</li>
              </ul>
            </li>
            <li>
              <strong>Онлайн-чат на сайте:</strong> Иконка в правом нижнем углу
              <ul className={styles.faqSubList}>
                <li>Живые операторы: Пн-Пт 9:00-21:00, Сб 10:00-18:00</li>
              </ul>
            </li>
          </ul>

          <h4 className={styles.faqHeading}>Что указать при обращении:</h4>
          <ul className={styles.faqList}>
            <li>Email, к которому привязан ваш аккаунт</li>
            <li>Описание проблемы с указанием раздела сайта</li>
            <li>Дату и время возникновения проблемы</li>
            <li>Номер вашего браузера и операционной системы</li>
            <li>Скриншоты ошибок (если есть)</li>
          </ul>

          <p className={styles.faqParagraph}>
            <strong>Совет:</strong> Перед обращением проверьте, нет ли ответа на
            ваш вопрос в этом разделе FAQ.
          </p>
        </div>
      </AccordionItem>

      <AccordionItem
        index={1}
        title="Как найти контакты своего ЖЭУ/управляющей компании?"
      >
        <div className={styles.faqAnswerContent}>
          <p className={styles.faqParagraph}>
            Найти контакты обслуживающей организации можно несколькими
            способами:
          </p>

          <h4 className={styles.faqHeading}>Через портал:</h4>
          <ol className={styles.faqList}>
            <li>Войдите в личный кабинет</li>
            <li>Перейдите в раздел «Мои адреса»</li>
            <li>Выберите нужный адрес</li>
            <li>Нажмите «Информация об обслуживающей организации»</li>
            <li>
              Система покажет:
              <ul className={styles.faqSubList}>
                <li>Название и реквизиты ЖЭУ</li>
                <li>Адрес офиса</li>
                <li>Телефоны диспетчерской, аварийной службы, бухгалтерии</li>
                <li>График работы</li>
                <li>ФИО руководителя подразделения</li>
              </ul>
            </li>
          </ol>

          <p className={styles.faqParagraph}>
            <strong>Если данные устарели:</strong> Сообщите об этом через форму
            обратной связи, и мы обновим информацию в базе.
          </p>
        </div>
      </AccordionItem>

      <AccordionItem
        index={2}
        title="Как подать жалобу на работу портала или сотрудников?"
      >
        <div className={styles.faqAnswerContent}>
          <p className={styles.faqParagraph}>
            Если вы столкнулись с проблемами в работе портала или некорректным
            поведением сотрудников, вы можете подать жалобу:
          </p>

          <h4 className={styles.faqHeading}>Способы подачи жалобы:</h4>
          <ul className={styles.faqList}>
            <li>
              <strong>Через форму обратной связи:</strong>
              <ol className={styles.faqList}>
                <li>Перейдите в раздел «Обратная связь»</li>
                <li>Выберите тип обращения «Жалоба»</li>
                <li>Заполните обязательные поля</li>
                <li>Подробно опишите ситуацию</li>
                <li>Прикрепите доказательства (скриншоты, фото, документы)</li>
                <li>Отправьте форму</li>
              </ol>
            </li>
          </ul>

          <h4 className={styles.faqHeading}>
            Что обязательно указать в жалобе:
          </h4>
          <ul className={styles.faqList}>
            <li>ФИО и контактные данные заявителя</li>
            <li>Дата и время инцидента</li>
            <li>ФИО сотрудника (если известно)</li>
            <li>Подробное описание ситуации</li>
            <li>Ваши требования (что хотите получить в результате)</li>
            <li>Доказательства (скриншоты, переписка, аудиозаписи)</li>
          </ul>

          <h4 className={styles.faqHeading}>Сроки рассмотрения:</h4>
          <ul className={styles.faqList}>
            <li>Предварительный ответ — в течение 3 рабочих дней</li>
            <li>Полное расследование и ответ — до 30 календарных дней</li>
            <li>
              В особо сложных случаях срок может быть продлен с уведомлением
              заявителя
            </li>
          </ul>

          <p className={styles.faqParagraph}>
            <strong>Конфиденциальность:</strong> Все жалобы рассматриваются
            конфиденциально. Ваши данные не передаются третьим лицам.
          </p>
        </div>
      </AccordionItem>

      <AccordionItem
        index={3}
        title="Куда обращаться в нерабочее время или в экстренных случаях?"
      >
        <div className={styles.faqAnswerContent}>
          <p className={styles.faqParagraph}>
            В нерабочее время и при экстренных ситуациях используйте следующие
            контакты:
          </p>

          <h4 className={styles.faqHeading}>
            Экстренные контакты (работают 24/7):
          </h4>
          <ul className={styles.faqList}>
            <li>
              <strong>Единая диспетчерская служба города:</strong> 112 или 115
              (с мобильного)
              <ul className={styles.faqSubList}>
                <li>Координация всех экстренных служб</li>
                <li>Перевод на нужную службу при необходимости</li>
              </ul>
            </li>
            <li>
              <strong>Экстренные городские службы:</strong>
              <ul className={styles.faqSubList}>
                <li>Пожарная охрана и МЧС: 101</li>
                <li>Полиция: 102</li>
                <li>Скорая помощь: 103</li>
                <li>Газовая служба: 104</li>
              </ul>
            </li>
          </ul>

          <h4 className={styles.faqHeading}>
            Номер техподдержки портала в нерабочее время:
          </h4>
          <ul className={styles.faqList}>
            <li>
              <strong>Автоответчик:</strong> +375(44)569-10-58
              <ul className={styles.faqSubList}>
                <li>Принимает сообщения о проблемах</li>
                <li>Отправляет уведомление ответственным сотрудникам</li>
                <li>
                  В экстренных случаях перенаправляет на мобильный
                  ответственного
                </li>
              </ul>
            </li>
            <li>
              <strong>Чат-бот:</strong> Доступен круглосуточно в онлайн-чате
              <ul className={styles.faqSubList}>
                <li>Помогает с распространенными проблемами</li>
                <li>Принимает заявки для обработки в рабочее время</li>
              </ul>
            </li>
          </ul>

          <p className={styles.faqParagraph}>
            <strong>Важно:</strong> При обращении в экстренные службы четко
            называйте адрес, этаж, характер проблемы и свои контактные данные.
          </p>
        </div>
      </AccordionItem>

      <AccordionItem
        index={4}
        title="Как оставить отзыв о работе портала или предложить улучшение?"
      >
        <div className={styles.faqAnswerContent}>
          <p className={styles.faqParagraph}>
            Ваши отзывы и предложения помогают нам улучшать сервис. Оставить их
            можно несколькими способами:
          </p>

          <h4 className={styles.faqHeading}>Способы оставить отзыв:</h4>
          <ul className={styles.faqList}>
            <li>
              <strong>Форма обратной связи:</strong> В разделе «Обратная связь»
              → «Отзыв/предложение»
            </li>
            <li>
              <strong>Оценка в конце диалога с поддержкой:</strong> После
              решения вопроса вам предложат оценить работу
            </li>
            <li>
              <strong>Специальная форма в личном кабинете:</strong> «Настройки»
              → «Оставить отзыв»
            </li>
            <li>
              <strong>Электронная почта:</strong> feedback@zhkh-service.ru
            </li>
            <li>
              <strong>Соцсети:</strong> Группы портала в ВКонтакте, Telegram,
              Одноклассниках
            </li>
          </ul>

          <h4 className={styles.faqHeading}>Какие предложения принимаются:</h4>
          <ul className={styles.faqList}>
            <li>Идеи по улучшению интерфейса</li>
            <li>Предложения по новым функциям</li>
            <li>Замечания по удобству использования</li>
            <li>Предложения по интеграциям с другими сервисами</li>
            <li>Идеи по мобильному приложению</li>
          </ul>
        </div>
      </AccordionItem>
    </>
  );
}
