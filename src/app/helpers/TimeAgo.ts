import Formatter from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
Formatter.addLocale(en);
const formatter = new Formatter();
export const TimeAgo = (date: Date): string => formatter.format(date);
