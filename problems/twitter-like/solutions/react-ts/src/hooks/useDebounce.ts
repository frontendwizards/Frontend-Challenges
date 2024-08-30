export const useDebounce = (
  callback: () => Promise<unknown>,
  delay: number = 600
) => setTimeout(callback, delay);