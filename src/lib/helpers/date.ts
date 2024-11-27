import plural from "plural-ru";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ru";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(updateLocale);

export const toDayJs = (date: dayjs.ConfigType): Dayjs => dayjs(date);
export const formatDate = (date: dayjs.ConfigType, locale: string) => {
  return toDayJs(date).locale("ru-RU").format(locale);
};

export const fullDateFormat = "YYYY-MM-DD";
export const fullDateRuFormat = "DD.MM.YYYY";
export const MonthFormat = "D MMMM, dd";
export const ShortMonthFormat = "D MMM, dd";
export const timeFormat = "HH:mm";
export const travelTimeFormat = "H ч. mm";

export function formatTravelTime(minutes: number) {
  const totalHours = Math.floor(minutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  const remainingMinutes = minutes % 60;

  const parts = [];

  if (totalDays > 0) {
    parts.push(`${totalDays} ${plural(totalDays, "день", "дня", "дней")}`);
  }
  if (hours > 0) {
    parts.push(`${hours} ${plural(hours, "час", "часа", "часов")}`);
  }
  if (remainingMinutes > 0) {
    parts.push(
      `${remainingMinutes} ${plural(
        remainingMinutes,
        "минута",
        "минуты",
        "минут"
      )}`
    );
  }

  return parts.length > 0 ? parts.join(" ") : "0 минут";
}
