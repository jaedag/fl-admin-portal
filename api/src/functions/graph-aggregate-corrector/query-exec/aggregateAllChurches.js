import {
  aggregateBussingOnCampusQuery,
  aggregateBussingOnCouncilQuery,
  aggregateBussingOnDenominationQuery,
  aggregateBussingOnGovernorshipQuery,
  aggregateBussingOnOversightQuery,
  aggregateBussingOnStreamQuery,
} from '../bacenta-cypher'
import {
  aggregateBacentaOnGovernorshipQuery,
  aggregateCampusOnOversightQuery,
  aggregateCouncilOnStreamQuery,
  aggregateGovernorshipOnCouncilQuery,
  aggregateOversightOnDenominationQuery,
  aggregateStreamOnCampusQuery,
} from '../sevice-cypher'

export const aggregateBacentaOnGovernorship = async (neoDriver) => {
  const session = neoDriver.session()

  try {
    console.log('Aggregating Bacenta on Governorship')
    const result = await session.executeWrite(async (tx) =>
      tx.run(aggregateBacentaOnGovernorshipQuery)
    )

    const returnValues = [
      ...result.records.map((record) => [
        record.get('governorshipCount').toString(),
      ]),
    ]

    return returnValues
  } catch (error) {
    console.error('Error reading data from the DB', error)
  } finally {
    await session.close()
  }

  return []
}

export const aggregateGovernorshipOnCouncil = async (neoDriver) => {
  const session = neoDriver.session()

  try {
    console.log('Aggregating Governorship on Council')
    const result = await session.executeWrite(async (tx) =>
      tx.run(aggregateGovernorshipOnCouncilQuery)
    )

    const returnValues = [
      ...result.records.map((record) => [
        record.get('councilCount').toString(),
      ]),
    ]

    return returnValues
  } catch (error) {
    console.error('Error reading data from the DB', error)
  } finally {
    await session.close()
  }

  return []
}

export const aggregateCouncilOnStream = async (neoDriver) => {
  const session = neoDriver.session()

  try {
    console.log('Aggregating Council on Stream')
    const result = await session.executeWrite(async (tx) =>
      tx.run(aggregateCouncilOnStreamQuery)
    )

    const returnValues = [
      ...result.records.map((record) => [record.get('streamCount').toString()]),
    ]

    return returnValues
  } catch (error) {
    console.error('Error reading data from the DB', error)
  } finally {
    await session.close()
  }

  return []
}

export const aggregateStreamOnCampus = async (neoDriver) => {
  const session = neoDriver.session()

  try {
    console.log('Aggregating Stream on Campus')
    const result = await session.executeWrite(async (tx) =>
      tx.run(aggregateStreamOnCampusQuery)
    )

    const returnValues = [
      ...result.records.map((record) => [record.get('campusCount').toString()]),
    ]

    return returnValues
  } catch (error) {
    console.error('Error reading data from the DB', error)
  } finally {
    await session.close()
  }

  return []
}

export const aggregateCampusOnOversight = async (neoDriver) => {
  const session = neoDriver.session()

  try {
    console.log('Aggregating Campus on Oversight')
    const result = await session.executeWrite(async (tx) =>
      tx.run(aggregateCampusOnOversightQuery)
    )

    const returnValues = [
      ...result.records.map((record) => [
        record.get('oversightCount').toString(),
      ]),
    ]

    return returnValues
  } catch (error) {
    console.error('Error reading data from the DB', error)
  } finally {
    await session.close()
  }

  return []
}

export const aggregateOversightOnDenomination = async (neoDriver) => {
  const session = neoDriver.session()

  try {
    console.log('Aggregating Oversight on Denomination')
    const result = await session.executeWrite(async (tx) =>
      tx.run(aggregateOversightOnDenominationQuery)
    )

    const returnValues = [
      ...result.records.map((record) => [
        record.get('denominationCount').toString(),
      ]),
    ]

    return returnValues
  } catch (error) {
    console.error('Error reading data from the DB', error)
  } finally {
    await session.close()
  }

  return []
}

export const aggregateBussingOnGovernorship = async (neoDriver) => {
  const session = neoDriver.session()

  try {
    console.log('Aggregating Bussing on Governorship')
    const result = await session.executeWrite(async (tx) =>
      tx.run(aggregateBussingOnGovernorshipQuery)
    )

    const returnValues = [
      ...result.records.map((record) => [
        record.get('governorshipCount').toString(),
      ]),
    ]

    return returnValues
  } catch (error) {
    console.error('Error reading data from the DB', error)
  } finally {
    await session.close()
  }

  return []
}

export const aggregateBussingOnCouncil = async (neoDriver) => {
  const session = neoDriver.session()

  try {
    console.log('Aggregating Bussing on Council')
    const result = await session.executeWrite(async (tx) =>
      tx.run(aggregateBussingOnCouncilQuery)
    )

    const returnValues = [
      ...result.records.map((record) => [
        record.get('councilCount').toString(),
      ]),
    ]

    return returnValues
  } catch (error) {
    console.error('Error reading data from the DB', error)
  } finally {
    await session.close()
  }

  return []
}

export const aggregateBussingOnStream = async (neoDriver) => {
  const session = neoDriver.session()

  try {
    console.log('Aggregating Bussing on Stream')
    const result = await session.executeWrite(async (tx) =>
      tx.run(aggregateBussingOnStreamQuery)
    )

    const returnValues = [
      ...result.records.map((record) => [record.get('streamCount').toString()]),
    ]

    return returnValues
  } catch (error) {
    console.error('Error reading data from the DB', error)
  } finally {
    await session.close()
  }

  return []
}

export const aggregateBussingOnCampus = async (neoDriver) => {
  const session = neoDriver.session()

  try {
    console.log('Aggregating Bussing on Campus')
    const result = await session.executeWrite(async (tx) =>
      tx.run(aggregateBussingOnCampusQuery)
    )

    const returnValues = [
      ...result.records.map((record) => [record.get('campusCount').toString()]),
    ]

    return returnValues
  } catch (error) {
    console.error('Error reading data from the DB', error)
  } finally {
    await session.close()
  }

  return []
}

export const aggregateBussingOnOversight = async (neoDriver) => {
  const session = neoDriver.session()

  try {
    console.log('Aggregating Bussing on Oversight')
    const result = await session.executeWrite(async (tx) =>
      tx.run(aggregateBussingOnOversightQuery)
    )

    const returnValues = [
      ...result.records.map((record) => [
        record.get('oversightCount').toString(),
      ]),
    ]

    return returnValues
  } catch (error) {
    console.error('Error reading data from the DB', error)
  } finally {
    await session.close()
  }

  return []
}

export const aggregateBussingOnDenomination = async (neoDriver) => {
  const session = neoDriver.session()

  try {
    console.log('Aggregating Bussing on Denomination')
    const result = await session.executeWrite(async (tx) =>
      tx.run(aggregateBussingOnDenominationQuery)
    )

    const returnValues = [
      ...result.records.map((record) => [
        record.get('denominationCount').toString(),
      ]),
    ]

    return returnValues
  } catch (error) {
    console.error('Error reading data from the DB', error)
  } finally {
    await session.close()
  }

  return []
}
