export function myUniq(arr) {
  const map = {}
  return arr.filter(item => {
    const key = typeof item + JSON.stringify(item)
    return map.hasOwnProperty(key) ? false : (map[key] = true)
  })
}
