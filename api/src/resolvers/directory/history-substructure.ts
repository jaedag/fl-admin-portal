/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Church, ChurchLevel, ServantType } from 'utils/types'
import { rearrangeCypherObject, throwErrorMsg } from 'utils/utils'
import servantCypher from './servant-cypher'

const CreateChurchHistorySubstructure = async ({
  churchType,
  servantType,
  church,
  session,
}: {
  churchType: ChurchLevel
  servantType: ServantType
  church: Church
  session: any
}) => {
  // Run Cypher to Connect the History
  const logResponse: {
    bacentas: string[]
    constituencies: string[]
    councils: string[]
    streams: string[]
    gatheringServices: string[]
  } = {
    bacentas: [],
    constituencies: [],
    councils: [],
    streams: [],
    gatheringServices: [],
  }
  try {
    switch (churchType + servantType) {
      case 'GatheringServiceLeader':
        logResponse.gatheringServices = [church.id]
        break
      case 'StreamLeader':
        logResponse.streams = [church.id]
        break
      case 'CouncilLeader':
        logResponse.councils = [church.id]
        break
      case 'ConstituencyLeader':
        logResponse.constituencies = [church.id]
        break
      case 'BacentaLeader':
        logResponse.bacentas = [church.id]
        break
      default:
        break
    }

    if (logResponse.gatheringServices.length > 0) {
      const responseArray = []
      for (const gatheringService of logResponse.gatheringServices) {
        const response = rearrangeCypherObject(
          await session
            .run(servantCypher.connectGatheringServiceLogSubstructure, {
              churchId: gatheringService,
            })
            .catch((error: any) =>
              throwErrorMsg(
                `Error Creating Gathering Service Substructure`,
                error
              )
            )
        )

        responseArray.push(...response.streams)
      }

      logResponse.streams = responseArray
    }

    if (logResponse.streams.length > 0) {
      const responseArray = []
      for (const stream of logResponse.streams) {
        const response = rearrangeCypherObject(
          await session
            .run(servantCypher.connectStreamLogSubstructure, {
              churchId: stream,
            })
            .catch((error: any) =>
              throwErrorMsg(`Error Creating Stream Substructure`, error)
            )
        )

        responseArray.push(...response.councils)
      }

      logResponse.councils = responseArray
    }

    if (logResponse.councils.length > 0) {
      const responseArray = []
      for (const council of logResponse.councils) {
        const response = rearrangeCypherObject(
          await session
            .run(servantCypher.connectCouncilLogSubstructure, {
              churchId: council,
            })
            .catch((error: any) =>
              throwErrorMsg(`Error Creating Council Substructure`, error)
            )
        )
        responseArray.push(...response.constituencies)
      }

      logResponse.constituencies = responseArray
    }
    if (logResponse.constituencies.length > 0) {
      const responseArray = []
      for (const constituency of logResponse.constituencies) {
        const response = rearrangeCypherObject(
          await session
            .run(servantCypher.connectConstituencyLogSubstructure, {
              churchId: constituency,
            })
            .catch((error: any) =>
              throwErrorMsg(`Error Creating Constituency Substructure`, error)
            )
        )
        responseArray.push(...response.bacentas)
      }

      logResponse.bacentas = responseArray
    }
    if (logResponse.bacentas.length > 0) {
      const responseArray = []
      for (const bacenta of logResponse.bacentas) {
        const response = rearrangeCypherObject(
          await session
            .run(servantCypher.connectBacentaLogSubstructure, {
              churchId: bacenta,
            })
            .catch((error: any) =>
              throwErrorMsg(`Error Creating Bacenta Substructure`, error)
            )
        )

        responseArray.push(...response.fellowships)
      }
    }
  } catch (error: any) {
    throwErrorMsg(error)
  }
}

export default CreateChurchHistorySubstructure
