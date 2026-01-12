import React, { useState } from "react";
import {
  ExclamationTriangleIcon,
  TrashIcon,
  CheckCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";
import styles from "./AdminComplaints.module.css";
import PageHeader from "../../common/PageHeader/PageHeader";
import Block from "../../common/Block/Block";

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      title: "Шум в подъезде",
      status: "open",
      description:
        "Жители дома жалуются на постоянный шум в подъезде в вечернее и ночное время. По словам жильцов, группа подростков собирается у входа, громко разговаривает, включает музыку и мешает отдыху. Проблема повторяется ежедневно, особенно после 21:00, и вызывает недовольство у большинства жильцов.Жители дома жалуются на постоянный шум в подъезде в вечернее и ночное время. По словам жильцов, группа подростков собирается у входа, громко разговаривает, включает музыку и мешает отдыху. Проблема повторяется ежедневно, особенно после 21:00, и вызывает недовольство у большинства жильцов.Жители дома жалуются на постоянный шум в подъезде в вечернее и ночное время. По словам жильцов, группа подростков собирается у входа, громко разговаривает, включает музыку и мешает отдыху. Проблема повторяется ежедневно, особенно после 21:00, и вызывает недовольство у большинства жильцов.Жители дома жалуются на постоянный шум в подъезде в вечернее и ночное время. По словам жильцов, группа подростков собирается у входа, громко разговаривает, включает музыку и мешает отдыху. Проблема повторяется ежедневно, особенно после 21:00, и вызывает недовольство у большинства жильцов.",
    },
    {
      id: 2,
      title: "Неубранный двор",
      status: "in_progress",
      description:
        "Во дворе дома накопилось большое количество мусора: пластиковые бутылки, пакеты, бумага. Жители отмечают, что дворники не выходили на уборку уже более недели. Особенно заметно загрязнение возле детской площадки и парковки автомобилей. Ситуация ухудшается после выходных, когда мусора становится ещё больше.",
    },
    {
      id: 3,
      title: "Сломанный домофон",
      status: "done",
      description:
        "Домофон на входной двери не работает уже несколько дней. Жители вынуждены открывать дверь вручную, что создаёт неудобства и снижает уровень безопасности. Особенно страдают пожилые люди, которым тяжело открывать тяжелую дверь. Жалоба была передана в обслуживающую компанию, ремонт выполнен.",
    },
    {
      id: 4,
      title: "Протечка крыши",
      status: "open",
      description:
        "На верхних этажах дома жильцы заметили протечки воды с потолка во время дождя. По словам жильцов, проблема существует уже несколько месяцев, но до сих пор не устранена. В квартирах появляются пятна сырости, портится отделка и мебель. Жители требуют срочного ремонта крыши.",
    },
    {
      id: 5,
      title: "Сломанные качели во дворе",
      status: "in_progress",
      description:
        "На детской площадке во дворе сломались качели: одна из цепей оборвана, а сиденье повреждено. Родители жалуются, что дети не могут пользоваться качелями, а конструкция представляет опасность. Жалоба была зарегистрирована, ремонтные работы запланированы на ближайшую неделю.",
    },
  ]);

  const renderStatus = (status) => {
    switch (status) {
      case "open":
        return "Открыта";
      case "in_progress":
        return "В работе";
      case "done":
        return "Завершена";
      default:
        return "Неизвестно";
    }
  };

  const handleDeleteComplaint = (id) => {
    setComplaints((prevComplaints) =>
      prevComplaints.filter((complaint) => complaint.id !== id)
    );
  };

  return (
    <div className={styles.wrapper}>
      <PageHeader title="Жалобы" icon={ExclamationTriangleIcon} />

      <div className={styles.content}>
        <Block title="Список жалоб" Icon={ExclamationTriangleIcon}>
          <div className={styles.list}>
            {complaints.map((item) => (
              <div key={item.id} className={styles.item}>
                <div className={styles.info}>
                  <span className={styles.id}>#{item.id}</span>
                  <span className={styles.title}>{item.title}</span>
                  <span className={styles.description}>{item.description}</span>
                  <span
                    className={`${styles.status} ${
                      item.status === "open"
                        ? styles.statusOpen
                        : item.status === "in_progress"
                        ? styles.statusInProgress
                        : styles.statusDone
                    }`}
                  >
                    {renderStatus(item.status)}
                  </span>
                </div>

                <div className={styles.actions}>
                  <button
                    onClick={() =>
                      setComplaints(
                        complaints.map((c) =>
                          c.id === item.id ? { ...c, status: "done" } : c
                        )
                      )
                    }
                    className={styles.doneButton}
                    title="Закрыто"
                  >
                    <CheckCircleIcon className={styles.buttonIcon} />
                  </button>

                  <button
                    onClick={() =>
                      setComplaints(
                        complaints.map((c) =>
                          c.id === item.id ? { ...c, status: "in_progress" } : c
                        )
                      )
                    }
                    className={styles.inProgressButton}
                    title="В работе"
                  >
                    <ArrowPathIcon className={styles.buttonIcon} />
                  </button>

                  <button
                    onClick={() => handleDeleteComplaint(item.id)}
                    className={styles.deleteButton}
                    title="Удалить"
                  >
                    <TrashIcon className={styles.buttonIcon} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Block>
      </div>
    </div>
  );
}
