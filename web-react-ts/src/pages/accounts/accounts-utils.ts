export const isAccountOpen = () => {
  const currentDate = new Date()
  const currentDay = currentDate.getDay()
  const currentHour = currentDate.getHours()

  // From Sunday (0) to Wednesday (3), always return true
  if (currentDay >= 0 && currentDay <= 3) {
    return true
  }

  // For Thursday (4), return true only before 6am
  if (currentDay === 4 && currentHour < 6) {
    return true
  }

  // For Thursday after 6am, all of Friday (5), and Saturday (6), return false
  return false
}
