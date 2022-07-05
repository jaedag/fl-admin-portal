export const getPercentageChange = (avgStat, avgHigherLevelStat) => {
  const diff = avgStat - avgHigherLevelStat
  if (isNaN(diff)) return '--'
  return Math.round((diff / avgHigherLevelStat) * 100)
}
