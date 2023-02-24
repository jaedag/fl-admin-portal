import { Context } from '../utils/neo4j-types'
import { Member } from '../utils/types'
import { rearrangeCypherObject } from '../utils/utils'
import { memberMemberSearch } from './maps-cypher'

export const mapsResolvers = {
  Member: {
    placesSearch: async (source: Member, args: any, context: Context) => {
      const session = context.executionContext.session()

      try {
        const res = await session.executeRead((tx: any) =>
          tx.run(memberMemberSearch, {
            id: source.id,
            latitude: args.latitude,
            longitude: args.longitude,
            limit: args.limit,
          })
        )

        // Process Results
        const people = rearrangeCypherObject(res)

        console.log(people)
      } catch (e) {
        // Handle Error
      } finally {
        // Close the session
        await session.close()
      }
    },
  },
}

export const mapsMutations = {}
