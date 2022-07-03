export const initialise = (initialValue, searchString) => {
  const showingSame = initialValue === searchString

  if (!initialValue) {
    return ''
  }

  if (!showingSame) {
    return initialValue
  }

  return searchString
}
