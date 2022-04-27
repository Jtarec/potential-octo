export function currying(fn, ...args) {
  const length = fn.length;
  let allArgs = [...args];
  const res = (...newArgs) => {
    allArgs = [...allArgs, ...newArgs];
    if (allArgs.length === length) {
      return fn(...allArgs);
    } else {
      return res;
    }
  };
  return res;
}
