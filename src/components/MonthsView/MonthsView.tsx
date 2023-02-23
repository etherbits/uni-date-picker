import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { motion } from "framer-motion";
import styles from "./MonthsView.module.css";

interface Props {
  selectedDate: Dayjs | null;
  calendarDate: Dayjs;
  handleMonthSelect: (arg0: number) => void;
}

export const MonthsView: React.FC<Props> = ({
  selectedDate,
  calendarDate,
  handleMonthSelect,
}) => {
  const handleSelect = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    i: number
  ) => {
    e.stopPropagation();
    handleMonthSelect(i);
  };

  return (
    <motion.ul
      className={styles.monthList}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {dayjs.monthsShort().map((month, i) => (
        <li key={i}>
          <motion.button
          type="button"
            className={styles.itemSelectButton}
            whileHover={
              selectedDate?.get("month") === i &&
              selectedDate?.get("year") === calendarDate.get("year")
                ? {}
                : {
                    backgroundColor: "#f1f1f1",
                  }
            }
            animate={
              selectedDate?.get("month") === i &&
              selectedDate?.get("year") === calendarDate.get("year")
                ? { backgroundColor: "#2984ce", color: "#fff" }
                : {}
            }
            transition={{ duration: 0.25 }}
            onClick={(e) => handleSelect(e, i)}
          >
            {month}
          </motion.button>
        </li>
      ))}
    </motion.ul>
  );
};
