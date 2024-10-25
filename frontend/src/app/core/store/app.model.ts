export const global = {
  dateRegex : new RegExp(
    /^(?:(?:31(\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
  ),
  emailRegex : new RegExp(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  ),
  standardTextRegex : new RegExp(
    /^[A-Za-z0-9_öüäÖÜÄ .,?!"§$%&=\\(){}\[\]+/*#´`'°\-]+$/
  ),
  version : "Version 1.3."
}

export function getWeekNumber(day: number, month: number, year: number) {
  const date = new Date(year, month - 1, day);
  // ISO week starts on Monday
  const thursday = new Date(date.getTime());
  thursday.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  const firstJanuary = new Date(thursday.getFullYear(), 0, 1);
  return Math.floor(((thursday.getTime() - firstJanuary.getTime()) / (86400000)) / 7) + 1;
}

export function getWeekday(day: number, month: number, year: number, weekday: string): string {
  const date = new Date(year, month-1, day);
  return date.toLocaleDateString('de-DE', { weekday: "long" });
}
