export const isAccountOpen = () => {
  const isThursday = new Date().getDay() === 4
  const isWednesday = new Date().getDay() === 3 && new Date().getHours() <= 10

  const validDays = [6, 0, 1, 2]
  const currentHour = new Date().getHours()

  if (isThursday && currentHour >= 6 && currentHour < 18) {
    return true
  }

  if (validDays.includes(new Date().getDay()) || isWednesday) {
    return true
  }

  return false
}
