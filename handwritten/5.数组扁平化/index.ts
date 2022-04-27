export function flatter(arr) {
    if (!arr.length) return;
    while (arr.some((item) => Array.isArray(item))) {
      arr = [].concat(...arr);
    }
    return arr;
}
