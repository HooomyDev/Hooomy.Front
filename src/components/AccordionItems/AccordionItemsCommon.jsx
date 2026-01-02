import React from "react";
import AccordionItem from "../../common/Accordion/AccordionItem";
import styles from "./AccordionItems.module.css";

export default function AccordionItemsCommon() {
  return (
    <>
      <AccordionItem title="Что делать, если в квартире прорвало трубу?">
        <div className={styles.faqAnswerContent}>
          <p className={styles.faqParagraph}>
            При обнаружении протечки водопроводной трубы в квартире необходимо
            действовать быстро и последовательно:
          </p>

          <h4 className={styles.faqHeading}>Немедленные действия:</h4>
          <ol className={styles.faqList}>
            <li>
              <strong>Перекройте воду:</strong>
              <ul className={styles.faqSubList}>
                <li>Найдите ближайший вентиль холодной или горячей воды</li>
                <li>
                  Если не знаете где вентиль — перекройте общий стояк в подъезде
                </li>
              </ul>
            </li>
            <li>
              <strong>Отключите электричество:</strong> в поврежденном помещении
              на щитке
            </li>
            <li>
              <strong>Предупредите соседей снизу</strong> о возможном затоплении
            </li>
            <li>
              <strong>Соберите воду:</strong> используйте тряпки, ведра, тазы
            </li>
          </ol>

          <h4 className={styles.faqHeading}>Куда звонить:</h4>
          <ul className={styles.faqList}>
            <li>
              <strong>Аварийная служба ЖЭУ:</strong> +7 (495) 123-45-67
              (круглосуточно)
            </li>
            <li>
              <strong>Диспетчер управляющей компании:</strong> номер указан в
              квитанции
            </li>
            <li>
              <strong>Страховая компания:</strong> если у вас есть страховка
              квартиры
            </li>
          </ul>

          <h4 className={styles.faqHeading}>Документальное оформление:</h4>
          <ul className={styles.faqList}>
            <li>Потребуйте от представителя ЖЭУ составить акт о заливе</li>
            <li>Сфотографируйте все повреждения (трубы, мебель, отделку)</li>
            <li>Получите копию акта с подписью и печатью</li>
            <li>Уточните сроки устранения аварии</li>
          </ul>

          <p className={styles.faqParagraph}>
            <strong>Важно:</strong> Не пытайтесь самостоятельно ремонтировать
            магистральные трубы — это опасно и может усугубить ситуацию.
          </p>
        </div>
      </AccordionItem>

      <AccordionItem title="Как поступить, если в подъезде не работает свет?">
        <div className={styles.faqAnswerContent}>
          <p className={styles.faqParagraph}>
            При отключении освещения в подъезде следуйте этому алгоритму:
          </p>

          <h4 className={styles.faqHeading}>Проверка причины:</h4>
          <ul className={styles.faqList}>
            <li>
              <strong>Только ваш подъезд?</strong> — проблема в электроснабжении
              подъезда
            </li>
            <li>
              <strong>Весь дом без света?</strong> — отключение на домовом щите
              или районное
            </li>
            <li>
              <strong>Только некоторые лампочки?</strong> — требуется замена
              перегоревших ламп
            </li>
          </ul>

          <h4 className={styles.faqHeading}>Порядок действий:</h4>
          <ol className={styles.faqList}>
            <li>
              <strong>Подайте заявку через портал</strong> в разделе "Аварийные
              ситуации"
            </li>
            <li>
              <strong>Позвоните в диспетчерскую</strong> управляющей компании
            </li>
            <li>
              <strong>Используйте фонарик</strong> на телефоне при передвижении
              по темному подъезду
            </li>
            <li>
              <strong>Предупредите соседей,</strong> особенно пожилых и с
              маленькими детьми
            </li>
          </ol>

          <h4 className={styles.faqHeading}>Нормативные сроки устранения:</h4>
          <ul className={styles.faqList}>
            <li>
              <strong>Аварийное отключение:</strong> до 24 часов
            </li>
            <li>
              <strong>Замена перегоревших ламп:</strong> до 7 дней
            </li>
            <li>
              <strong>Ремонт электрощитовой:</strong> до 3 дней
            </li>
          </ul>

          <p className={styles.faqParagraph}>
            <strong>Безопасность:</strong> Не пытайтесь самостоятельно
            ремонтировать электропроводку в подъезде — это опасно для жизни и
            требует специальных допусков.
          </p>
        </div>
      </AccordionItem>

      <AccordionItem title="Что делать при засоре в канализационной системе?">
        <div className={styles.faqAnswerContent}>
          <p className={styles.faqParagraph}>
            Засор в канализации может возникнуть в вашей квартире или в общем
            стояке:
          </p>

          <h4 className={styles.faqHeading}>Определение места засора:</h4>
          <ul className={styles.faqList}>
            <li>
              <strong>Только в вашей квартире:</strong> вода не уходит в ваших
              раковинах/ванной
            </li>
            <li>
              <strong>Общий стояк:</strong> вода поднимается в унитазе, слышен
              шум из труб у соседей
            </li>
            <li>
              <strong>Подвал или двор:</strong> неприятный запах, лужи во дворе
            </li>
          </ul>

          <h4 className={styles.faqHeading}>Действия при засоре в квартире:</h4>
          <ol className={styles.faqList}>
            <li>Прекратите пользоваться водой</li>
            <li>Попробуйте прочистить сифоны под раковинами</li>
            <li>Используйте вантуз или химические средства (осторожно!)</li>
            <li>Если не помогает — вызывайте сантехника</li>
          </ol>

          <h4 className={styles.faqHeading}>
            Действия при засоре общего стояка:
          </h4>
          <ol className={styles.faqList}>
            <li>Немедленно сообщите в аварийную службу ЖЭУ</li>
            <li>Предупредите соседей сверху не пользоваться водой</li>
            <li>При угрозе затопления отключите электричество</li>
            <li>Подготовьте тряпки и емкости для воды</li>
          </ol>

          <h4 className={styles.faqHeading}>Кто оплачивает устранение:</h4>
          <ul className={styles.faqList}>
            <li>
              <strong>Засор в квартире:</strong> оплачивает собственник квартиры
            </li>
            <li>
              <strong>Засор общего стояка:</strong> оплачивает управляющая
              компания
            </li>
            <li>
              <strong>При вине жильцов:</strong> стоимость распределяется между
              виновными
            </li>
          </ul>

          <p className={styles.faqParagraph}>
            <strong>Профилактика:</strong> Не выбрасывайте в канализацию жир,
            волосы, средства гигиены, пищевые отходы.
          </p>
        </div>
      </AccordionItem>

      <AccordionItem title="Как действовать при отключении отопления в холодное время?">
        <div className={styles.faqAnswerContent}>
          <p className={styles.faqParagraph}>
            Отключение отопления зимой требует быстрых действий для
            предотвращения разморозки системы:
          </p>

          <h4 className={styles.faqHeading}>Первоочередные меры:</h4>
          <ol className={styles.faqList}>
            <li>
              <strong>Проверьте батареи во всех комнатах</strong> — возможно
              отключение локальное
            </li>
            <li>
              <strong>Уточните у соседей</strong> — отключено во всем доме или
              только у вас
            </li>
            <li>
              <strong>Включите обогреватели</strong> для поддержания минимальной
              температуры
            </li>
            <li>
              <strong>Приоткройте краны</strong> чтобы вода не замерзла в трубах
            </li>
          </ol>

          <h4 className={styles.faqHeading}>Информирование служб:</h4>
          <ul className={styles.faqList}>
            <li>
              <strong>Аварийная служба ЖЭУ:</strong> +7 (495) 123-45-67 (при
              аварийном отключении)
            </li>
            <li>
              <strong>Единая теплоснабжающая организация:</strong> номер на
              информационном стенде
            </li>
            <li>
              <strong>Горячая линия администрации:</strong> при массовом
              отключении
            </li>
          </ul>

          <h4 className={styles.faqHeading}>Нормативные требования:</h4>
          <ul className={styles.faqList}>
            <li>
              <strong>Минимальная температура в жилых комнатах:</strong> +18°C
            </li>
            <li>
              <strong>В угловых комнатах:</strong> +20°C
            </li>
            <li>
              <strong>Допустимое снижение температуры:</strong> не более 8 часов
              подряд
            </li>
            <li>
              <strong>Максимальный перерыв в отопительном сезоне:</strong> 24
              часа
            </li>
          </ul>

          <h4 className={styles.faqHeading}>Права жильцов:</h4>
          <ul className={styles.faqList}>
            <li>Требовать перерасчет за дни без отопления</li>
            <li>
              Получить компенсацию за использование альтернативных источников
              тепла
            </li>
            <li>Подать коллективную жалобу при длительном отключении</li>
          </ul>

          <p className={styles.faqParagraph}>
            <strong>Важно:</strong> При температуре в квартире ниже +12°C вы
            можете требовать предоставления временного жилья за счет виновной
            организации.
          </p>
        </div>
      </AccordionItem>

      <AccordionItem title="Что делать, если сломался лифт и вы застряли?">
        <div className={styles.faqAnswerContent}>
          <p className={styles.faqParagraph}>
            Если вы оказались заперты в лифте, сохраняйте спокойствие и следуйте
            инструкции:
          </p>

          <h4 className={styles.faqHeading}>
            Правила поведения в застрявшем лифте:
          </h4>
          <ol className={styles.faqList}>
            <li>
              <strong>Не паникуйте</strong> — лифт надежно закреплен
            </li>
            <li>
              <strong>Нажмите кнопку "Вызов"</strong> или позвоните диспетчеру
            </li>
            <li>
              <strong>Сообщите:</strong>
              <ul className={styles.faqSubList}>
                <li>Адрес дома и номер подъезда</li>
                <li>Примерный этаж, на котором застряли</li>
                <li>Количество людей в лифте</li>
                <li>Есть ли среди вас дети, беременные, больные люди</li>
              </ul>
            </li>
            <li>
              <strong>Не пытайтесь самостоятельно открыть двери</strong> — это
              опасно
            </li>
            <li>
              <strong>Экономьте заряд телефона</strong> для связи со спасателями
            </li>
          </ol>

          <h4 className={styles.faqHeading}>Экстренные номера:</h4>
          <ul className={styles.faqList}>
            <li>
              <strong>Диспетчер лифтовой службы:</strong> +7 (495) 987-65-43
            </li>
            <li>
              <strong>Аварийная служба МЧС:</strong> 112 или 101
            </li>
            <li>
              <strong>Скорая помощь:</strong> 103 (при плохом самочувствии)
            </li>
          </ul>

          <h4 className={styles.faqHeading}>Нормативные сроки реагирования:</h4>
          <ul className={styles.faqList}>
            <li>
              <strong>Прием вызова диспетчером:</strong> немедленно
            </li>
            <li>
              <strong>Выезд аварийной бригады:</strong> в течение 30 минут
            </li>
            <li>
              <strong>Освобождение людей:</strong> не более 1 часа
            </li>
          </ul>

          <h4 className={styles.faqHeading}>После освобождения:</h4>
          <ul className={styles.faqList}>
            <li>Потребуйте составить акт о происшествии</li>
            <li>Уточните причину поломки</li>
            <li>
              Подайте заявление о компенсации морального вреда (если применимо)
            </li>
            <li>Требуйте проведения внеплановой проверки лифта</li>
          </ul>

          <p className={styles.faqParagraph}>
            <strong>Профилактика:</strong> Не перегружайте лифт, не прыгайте в
            кабине, не задерживайте двери.
          </p>
        </div>
      </AccordionItem>

      <AccordionItem title="Как поступить при обнаружении трещин в стенах дома?">
        <div className={styles.faqAnswerContent}>
          <p className={styles.faqParagraph}>
            Трещины в конструкциях дома могут свидетельствовать о серьезных
            проблемах:
          </p>

          <h4 className={styles.faqHeading}>Оценка опасности трещин:</h4>
          <ul className={styles.faqList}>
            <li>
              <strong>Неопасные (волосяные):</strong> менее 1 мм, не
              увеличиваются
            </li>
            <li>
              <strong>Требующие наблюдения:</strong> 1-5 мм, стабильные
            </li>
            <li>
              <strong>Опасные:</strong> более 5 мм, увеличивающиеся, сквозные
            </li>
            <li>
              <strong>Аварийные:</strong> с отклонением конструкций, с
              раскрытием
            </li>
          </ul>

          <h4 className={styles.faqHeading}>Порядок действий:</h4>
          <ol className={styles.faqList}>
            <li>
              <strong>Сфотографируйте трещины</strong> с масштабной линейкой
            </li>
            <li>
              <strong>Установите маячки</strong> (бумажные полоски с датой) для
              наблюдения
            </li>
            <li>
              <strong>Опросите соседей</strong> — есть ли у них подобные
              проблемы
            </li>
            <li>
              <strong>Подайте коллективную заявку</strong> через портал или
              письменно
            </li>
            <li>
              <strong>Требуйте проведения экспертизы</strong> строительными
              экспертами
            </li>
          </ol>

          <h4 className={styles.faqHeading}>Куда обращаться:</h4>
          <ul className={styles.faqList}>
            <li>
              <strong>Управляющая компания/ЖЭУ</strong> — для первичного осмотра
            </li>
            <li>
              <strong>Государственная жилищная инспекция</strong> — при
              бездействии УК
            </li>
            <li>
              <strong>Строительная экспертиза</strong> — для профессиональной
              оценки
            </li>
            <li>
              <strong>Прокуратура</strong> — при угрозе жизни и здоровью жильцов
            </li>
          </ul>

          <h4 className={styles.faqHeading}>Возможные причины:</h4>
          <ul className={styles.faqList}>
            <li>Усадка фундамента</li>
            <li>Вибрация от строительства рядом</li>
            <li>Нарушение технологии строительства</li>
            <li>Подтопление грунтовыми водами</li>
            <li>Сейсмическая активность</li>
          </ul>

          <p className={styles.faqParagraph}>
            <strong>Внимание:</strong> При обнаружении быстрорастущих трещин
            (более 1 мм в месяц) немедленно информируйте аварийные службы и
            покиньте помещение.
          </p>
        </div>
      </AccordionItem>

      <AccordionItem title="Что делать при задымлении или запахе гари в подъезде?">
        <div className={styles.faqAnswerContent}>
          <p className={styles.faqParagraph}>
            Задымление или запах гари в подъезде — признаки возможного пожара:
          </p>

          <h4 className={styles.faqHeading}>Немедленные действия:</h4>
          <ol className={styles.faqList}>
            <li>
              <strong>Вызовите пожарных:</strong> 101 или 112
            </li>
            <li>
              <strong>Сообщите диспетчеру:</strong>
              <ul className={styles.faqSubList}>
                <li>Точный адрес и подъезд</li>
                <li>Этаж, откуда идет дым</li>
                <li>Характер запаха (пластик, дерево, электропроводка)</li>
              </ul>
            </li>
            <li>
              <strong>Оповестите соседей,</strong> особенно на верхних этажах
            </li>
            <li>
              <strong>Откройте окна</strong> в подъезде для проветривания (если
              безопасно)
            </li>
            <li>
              <strong>Отключите электричество</strong> на щитке в подъезде
            </li>
          </ol>

          <h4 className={styles.faqHeading}>Эвакуация:</h4>
          <ul className={styles.faqList}>
            <li>
              <strong>Не пользуйтесь лифтом</strong> — только лестницей
            </li>
            <li>
              <strong>Помогите эвакуироваться</strong> пожилым соседям и детям
            </li>
            <li>
              <strong>Дышите через влажную ткань</strong> при сильном задымлении
            </li>
            <li>
              <strong>Передвигайтесь пригнувшись</strong> — внизу меньше дыма
            </li>
          </ul>

          <h4 className={styles.faqHeading}>Возможные источники:</h4>
          <ul className={styles.faqList}>
            <li>Неисправная электропроводка</li>
            <li>Замыкание в щитовой</li>
            <li>Возгорание мусора в мусоропроводе</li>
            <li>Курение в неположенном месте</li>
            <li>Детские шалости с огнем</li>
          </ul>

          <h4 className={styles.faqHeading}>Профилактические меры:</h4>
          <ul className={styles.faqList}>
            <li>Не загромождайте пути эвакуации</li>
            <li>Не храните легковоспламеняющиеся материалы в подъезде</li>
            <li>Следите за состоянием электропроводки</li>
            <li>Установите пожарные извещатели</li>
          </ul>

          <p className={styles.faqParagraph}>
            <strong>Важно:</strong> Даже если дым рассеялся, дождитесь приезда
            пожарных для проверки источника задымления.
          </p>
        </div>
      </AccordionItem>
    </>
  );
}
