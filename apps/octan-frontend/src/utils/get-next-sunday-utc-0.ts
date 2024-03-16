export function getNextSundayUTC0(date: Date) {
  // Get the UTC timestamp of the input date
  const utcTimestamp = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 
                                 date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());

  // Calculate the number of milliseconds until the next Sunday
  const millisecondsInADay = 24 * 60 * 60 * 1000;
  const dayOfWeek = new Date(utcTimestamp).getUTCDay();
  const millisecondsUntilNextSunday = (7 - dayOfWeek) % 7 * millisecondsInADay;

  // Calculate the UTC timestamp of the next Sunday and return it as a Date object
  const nextSundayTimestamp = utcTimestamp + millisecondsUntilNextSunday;
  return new Date(nextSundayTimestamp);
}