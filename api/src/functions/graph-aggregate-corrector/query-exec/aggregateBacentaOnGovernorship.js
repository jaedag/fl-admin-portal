import {
  aggregateBacentaOnGovernorshipQuery,
  aggregateCampusOnOversightQuery,
  aggregateCouncilOnStreamQuery,
  aggregateGovernorshipOnCouncilQuery,
  aggregateOversightOnDenominationQuery,
  aggregateStreamOnCampusQuery,
} from '../cypher'

export const aggregateBacentaOnGovernorship = async (neoDriver) => {
  const session = neoDriver.session()

  try {
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
