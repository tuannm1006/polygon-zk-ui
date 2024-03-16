export const pushToEventQueue = (func: () => void) => setTimeout(() => {
  func()
}, 0);