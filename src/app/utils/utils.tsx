import {DateTime} from "luxon";
import {filter} from "lodash";

export const filteredParamsIfNotNull = (params: unknown) => {
  if (!params) {
    return;
  }
  return Object.fromEntries(
    filter(Object.entries(params),(value) => !!value)
  );
};
export const formatDateToYear = (dataString: string): string => {
  return dataString ? DateTime.fromISO(dataString).year.toString(): "";
};
export const currentYear = (): number => {
  const currentDate = DateTime.local();
  return currentDate.year;
};
