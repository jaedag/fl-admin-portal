export const getBacentaLastFourBussing = `
MATCH (bacenta:Bacenta  {id:$bacentaId})
`

export const setBacentaIC = `
MATCH (bacenta:Bacenta {id: $bacentaId})
REMOVE bacenta:Graduated
SET bacenta:IC

RETURN bacenta
`

export const setBacentaGraduated = `
MATCH (bacenta:Bacenta {id:  $bacentaId})
REMOVE bacenta:IC
SET bacenta:Graduated


RETURN bacenta
`
