export const initialise = (searchString: string, initialValue?: string) => {
  const showingSame = initialValue === searchString

  if (!initialValue) {
    return ''
  }

  if (!showingSame) {
    return initialValue
  }

  return searchString
}
