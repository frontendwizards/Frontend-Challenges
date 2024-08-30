const debounce = (
  fn: (...args: any[]) => Promise<unknown>,
  delay: number = 600
) => {
  let timerId: NodeJS.Timeout | null = null;

  const debouncedFunction = (...args: any[]) => {
    if (timerId) clearTimeout(timerId);

    timerId = setTimeout(() => fn(...args), delay);
  };

  const clearDebounce = () => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  };

  return [debouncedFunction, clearDebounce];
};

export default debounce;
