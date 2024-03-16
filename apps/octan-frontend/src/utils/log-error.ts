export const logError = (message = 'error') => (error: any) => {
  console.error(message, error);
  throw error
}