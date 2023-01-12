import React from "react";
import { motion } from "framer-motion";
import styles from "./DAysVIew.module.css";
import dayjs, { Dayjs } from "dayjs";

interface Props {
  locale?: string;
  selectedDate: Dayjs | null;
  calendarDate: Dayjs;
  maxDate: Dayjs | undefined;
  handleDateSelect: (arg0: Dayjs) => void;
}

export const DaysView: React.FC<Props> = ({
  locale,
  selectedDate,
  calendarDate,
  maxDate,
  handleDateSelect,
}) => {
  const firstDay = dayjs(calendarDate).startOf("month").weekday(0);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <span className={styles.selectedDate}>
        {selectedDate
          ? selectedDate.locale(locale ? locale : "en").format("D MMMM, YYYY")
          : locale === "ka"
          ? "აირჩიეთ თარიღი"
          : "select a date"}
      </span>
      <ul className={styles.calendarWeekdays}>
        {dayjs.weekdaysMin(true).map((weekday) => (
          <li key={weekday} className={styles.weekdayBox}>
            {weekday}
          </li>
        ))}
      </ul>
      <ul className={styles.calendarDays}>
        {[
          ...Array(
            calendarDate.endOf("month").weekday(6).diff(firstDay, "day") + 1
          ).keys(),
        ].map((i) => {
          const currentDate = firstDay.add(i, "day");
          return (
            <motion.li
              key={i}
              id={i.toString()}
              className={styles.dayBox}
              animate={
                currentDate.isSame(selectedDate)
                  ? { backgroundColor: "#2984ce", color: "#ffffff" }
                  : currentDate.isSame(calendarDate, "month")
                  ? { color: "#242424" }
                  : { color: "#aaaaaa" }
              }
              whileHover={
                currentDate.isSame(selectedDate) ||
                (maxDate && currentDate.isAfter(maxDate))
                  ? {
                      cursor: "default",
                    }
                  : {
                      cursor: "pointer",
                      backgroundColor: "#f1f1f1",
                      color: "#000000",
                    }
              }
              transition={{ duration: 0.25 }}
              onClick={() => handleDateSelect(currentDate)}
            >
              {currentDate.date()}
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
};
