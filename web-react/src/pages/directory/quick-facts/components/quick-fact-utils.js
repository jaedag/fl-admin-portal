export const getPercentageChange = (avgStat, avgHigherLevelStat) => {
  var diff = avgStat - avgHigherLevelStat
  if (isNaN(diff)) return '--'
  return Math.round((diff / avgHigherLevelStat) * 100)
}
