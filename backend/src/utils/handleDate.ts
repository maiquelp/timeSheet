export const formatDate = (date: Date): string => {
  const d = date.getDate();
  const m = date.getMonth() + 1; //Month from 0 to 11
  const y = date.getFullYear();
  return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d); 
}

export const getSunday = (period: number) => {
  const sunday = new Date();
  sunday.setDate(sunday.getDate() - (sunday.getDay() + 7) % period);
  return formatDate(sunday);
}

export const getSaturday = (period: number) => {
  const saturday = new Date();
  period === 7 ?
    saturday.setDate(saturday.getDate() - (saturday.getDay() + 7) % period) :
    saturday.setDate(saturday.getDate() + (saturday.getDay() + 7) % period);
  return formatDate(saturday);
}

export const getFirstDay = (param: number) => {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth() + param;
  return formatDate(new Date(y, m, 1));
}

export const getLastDay = (param: number) => {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth() + param;
  return formatDate(new Date(y, m + 1, 1));
}

export const getNextDay = (param: string): string => {
  const date = new Date(param);
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();
  return formatDate(new Date(y, m, d + 2));
}
