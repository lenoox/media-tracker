import { DateTime } from "luxon";

export const filteredParamsIfNotNull = (params: unknown) => {
  if (!params) {
    return;
  }
  return Object.fromEntries(
    Object.entries(params).filter(([_, value]) => !!value)
  );
};
export const formatDateToYear = (dataString: string): number => {
  return DateTime.fromISO(dataString).year;
};
export const currentYear = (): number => {
  const currentDate = DateTime.local();
  return currentDate.year;
};
