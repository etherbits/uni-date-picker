import React from "react";
import { motion } from "framer-motion";
import styles from "./YearsView.module.css";
import { Dayjs } from "dayjs";

interface Props {
  selectedDate: Dayjs | null;
  calendarDate: Dayjs;
  handleYearSelect: (arg0: number) => void;
}

export const YearsView: React.FC<Props> = ({
  selectedDate,
  calendarDate,
  handleYearSelect,
}) => {
  return (
    <motion.ul className={styles.yearList}>
      {[...Array(20).keys()].map((i) => {
        const currentYear = Math.floor(calendarDate.get("year") / 20) * 20 + i;
        return (
          <li key={i}>
            <motion.button
              className={styles.itemSelectButton}
              whileHover={
                selectedDate?.get("year") === currentYear
                  ? {}
                  : {
                      backgroundColor: "#f1f1f1",
                    }
              }
              animate={
                selectedDate?.get("year") === currentYear
                  ? { backgroundColor: "#2984ce", color: "#fff" }
                  : {}
              }
              onClick={() => handleYearSelect(currentYear)}
            >
              {currentYear}
            </motion.button>
          </li>
        );
      })}
    </motion.ul>
  );
};
