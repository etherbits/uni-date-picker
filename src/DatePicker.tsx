import React, { useEffect, useState } from "react";
import styles from "./DatePicker.module.css";
import dayjs, { Dayjs } from "dayjs";
import { motion } from "framer-motion";
import { DaysView } from "./components/DaysView";
import { MonthsView } from "./components/MonthsView";
import { YearsView } from "./components/YearsView";
import { ChevronLeft } from "./components/ChevronLeft";
import { ChevronRight } from "./components/ChevronRight";

interface Props {
  locale: string;
  width?: string;
  maxDate?: Dayjs;
  defaultDate: Dayjs;
  submitComponent?: React.ReactElement;
  onSubmit?: (arg0: Dayjs) => void;
}

enum VIEW {
  DAYS,
  MONTHS,
  YEARS,
}
export const DatePicker: React.FC<Props> = ({
  locale,
  width,
  maxDate,
  defaultDate,
  submitComponent,
  onSubmit,
}) => {
  const [calendarDate, setCalendarDate] = useState<Dayjs>(defaultDate);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [viewIndex, setViewIndex] = useState<VIEW>(VIEW.DAYS);
  const changeView = (change: number) => {
    const newViewIndex = viewIndex + change;

    if (newViewIndex > VIEW.YEARS || newViewIndex < 0) return;
    setViewIndex(newViewIndex);
  };

  useEffect(() => {
    setCalendarDate(dayjs(calendarDate).locale(locale));
  }, [locale]);

  const handleDateSelect = (date: Dayjs) => {
    if (maxDate && date.isAfter(maxDate)) {
      return;
    }

    setSelectedDate(date);
  };

  const handleMonthSelect = (i: number) => {
    changeView(-1);
    setCalendarDate(calendarDate.set("month", i));
  };

  const handleYearSelect = (year: number) => {
    changeView(-1);
    setCalendarDate(calendarDate.set("year", year));
  };

  const handleSubmit = () => {
    if (!onSubmit || !selectedDate) return;

    onSubmit(selectedDate);
  };

  const handleArrow = (viewIndex: VIEW, val: -1 | 1) => {
    switch (viewIndex) {
      case VIEW.DAYS:
        setCalendarDate(calendarDate.add(val, "month"));
        break;
      case VIEW.MONTHS:
        setCalendarDate(calendarDate.add(val, "year"));
        break;
      case VIEW.YEARS:
        setCalendarDate(calendarDate.add(val * 20, "year"));
        break;
    }
  };

  const ViewHead = {
    0: calendarDate.format("MMMM, YYYY"),
    1: calendarDate.format("YYYY"),
    2: `${Math.floor(calendarDate.get("year") / 10)}0-${
      Math.floor(calendarDate.get("year") / 10) + 2
    }0`,
  };

  const ViewBody = {
    0: (
      <DaysView
        locale={locale}
        maxDate={maxDate}
        selectedDate={selectedDate}
        calendarDate={calendarDate}
        handleDateSelect={handleDateSelect}
      />
    ),
    1: (
      <MonthsView
        selectedDate={selectedDate}
        calendarDate={calendarDate}
        handleMonthSelect={handleMonthSelect}
      />
    ),
    2: (
      <YearsView
        selectedDate={selectedDate}
        calendarDate={calendarDate}
        handleYearSelect={handleYearSelect}
      />
    ),
  };

  return (
    <motion.div layout className={styles.calendarRoot} style={{ width: width }}>
      <div className={styles.calendarHeader}>
        <button
          title="Get previous"
          className={styles.monthButton}
          onClick={() => {
            handleArrow(viewIndex, -1);
          }}
        >
          <ChevronLeft />
        </button>
        <motion.button
          className={styles.currentMonth}
          disabled={viewIndex >= VIEW.YEARS}
          whileHover={
            viewIndex >= VIEW.YEARS ? {} : { backgroundColor: "#f1f1f1" }
          }
          onClick={() => changeView(+1)}
        >
          {ViewHead[viewIndex]}
        </motion.button>
        <button
          title="Get next"
          className={styles.monthButton}
          onClick={() => {
            handleArrow(viewIndex, 1);
          }}
        >
          <ChevronRight />
        </button>
      </div>
      <div className={styles.calendarBody}>{ViewBody[viewIndex]}</div>
      {submitComponent && (
        <div className={styles.submitButton} onClick={handleSubmit}>
          {submitComponent}
        </div>
      )}
    </motion.div>
  );
};
