export const setToHappen = (fn: () => void, date: Date) => {
  return setTimeout(fn, date.getTime() - Date.now());
}