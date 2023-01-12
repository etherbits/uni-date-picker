
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(localeData);
dayjs.extend(weekday);

import { DatePicker } from "./DatePicker";
export default DatePicker;
