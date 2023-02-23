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
  const handleSelect = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    year: number
  ) => {
    e.stopPropagation();
    handleYearSelect(year);
  };

  return (
    <motion.ul className={styles.yearList}>
      {[...Array(20).keys()].map((i) => {
        console.log(Math.floor(calendarDate.get("year") / 20) * 20)
        const currentYear = Math.floor(calendarDate.get("year") / 20) * 20 + i;
        return (
          <li key={i}>
            <motion.button
              type="button"
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
              onClick={(e) => handleSelect(e, currentYear)}
            >
              {currentYear}
            </motion.button>
          </li>
        );
      })}
    </motion.ul>
  );
};
