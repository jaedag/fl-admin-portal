export const arrayError = (
  array: string | string[] | number[] | undefined,
  index: number
) => {
  if (array?.length) return array[index]

  return array
}
