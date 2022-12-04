export const promiseResolve = (timer: number) => {
  new Promise((resolve) => setTimeout(resolve, timer));
};
