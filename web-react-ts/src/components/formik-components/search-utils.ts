export const initialise = (initialValue: string, searchString: string) => {
  const showingSame = initialValue === searchString

  if (!initialValue) {
    return ''
  }

  if (!showingSame) {
    return initialValue
  }

  return searchString
}
