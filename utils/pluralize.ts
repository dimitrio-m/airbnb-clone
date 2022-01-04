export default (number: number, singularWord: string) => {
  const text = `${number} ${singularWord}`
  if (number === 1) { return text }
  return text + 's'
}
