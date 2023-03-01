import type { Node, Integer, Point } from 'neo4j-driver'
import { Context } from '../utils/neo4j-types'
import { Member } from '../utils/types'
import { rearrangeCypherObject, throwToSentry } from '../utils/utils'
import { memberFellowshipSearch, memberMemberSearch } from './maps-cypher'

export const mapsResolvers = {
  Member: {
    placesSearch: async (source: Member, args: any, context: Context) => {
      const session = context.executionContext.session()
      const sessionTwo = context.executionContext.session()

      try {
        const res = await Promise.all([
          session.readTransaction((tx: any) =>
            tx.run(memberMemberSearch, {
              id: source.id,
              latitude: args.latitude,
              longitude: args.longitude,
              limit: args.limit,
            })
          ),
          sessionTwo.readTransaction((tx: any) =>
            tx.run(memberFellowshipSearch, {
              id: source.id,

              latitude: args.latitude,
              longitude: args.longitude,
              limit: args.limit,
            })
          ),
        ])

        interface FellowshipResultShape {
          fellowship: Node<
            Integer,
            {
              id: string
              name: string
              location: Point
            }
          >
          distance: number
        }

        interface PeopleResultShape {
          member: Node<
            Integer,
            {
              id: string
              firstName: string
              lastName: string
              location: Point
            }
          >
          distance: number
        }

        // Process Results
        const peopleRes: PeopleResultShape[] = rearrangeCypherObject(
          res[0],
          true
        )
        const fellowshipsRes: FellowshipResultShape[] = rearrangeCypherObject(
          res[1],
          true
        )

        // merge the two arrays and order by distance in ascending order
        const places = [...peopleRes, ...fellowshipsRes].sort(
          (a, b) => a.distance - b.distance
        )

        // return the 30 closest places
        const formattedPlaces = places
          .map((place) => {
            if ('member' in place) {
              return {
                id: place.member.properties.id,
                name: `${place.member.properties.firstName} ${place.member.properties.lastName}`,
                latitude: place.member.properties.location.y,
                longitude: place.member.properties.location.x,
                distance: place.distance,
              }
            }

            if ('fellowship' in place) {
              return {
                id: place.fellowship.properties.id,
                name: place.fellowship.properties.name,
                latitude: place.fellowship.properties.location.y,
                longitude: place.fellowship.properties.location.x,
                distance: place.distance,
              }
            }

            return null
          })
          .slice(0, 30)

        return formattedPlaces
      } catch (e) {
        // Handle Error
        throwToSentry('e', e)
      } finally {
        // Close the session
        await session.close()
        await sessionTwo.close()
      }
      return null
    },
  },
}

export const mapsMutations = {}
