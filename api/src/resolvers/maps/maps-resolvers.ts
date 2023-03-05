import type { Node, Integer, Point } from 'neo4j-driver'
import { Context } from '../utils/neo4j-types'
import { Member } from '../utils/types'
import { rearrangeCypherObject, throwToSentry } from '../utils/utils'
import {
  memberFellowshipSearchByLocation,
  memberFellowshipSearchByName,
  memberMemberSearchByLocation,
  memberMemberSearchByName,
  universityOutreachVenuesSearchByLocation,
  universityOutreachVenuesSearchByName,
} from './maps-cypher'

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

interface OutreachVenueResultShape {
  outreachVenue: Node<
    Integer,
    {
      id: string
      name: string
      location: Point
    }
  >
  distance: number
}

const parseMapData = (
  place: FellowshipResultShape | OutreachVenueResultShape | PeopleResultShape
) => {
  if ('member' in place) {
    return {
      id: place.member.properties.id,
      name: `${place.member.properties.firstName} ${place.member.properties.lastName}`,
      typename: 'Member',
      location: place.member.properties.location,
      latitude: place.member.properties.location.y,
      longitude: place.member.properties.location.x,
      distance: place.distance,
    }
  }

  if ('fellowship' in place) {
    return {
      id: place.fellowship.properties.id,
      name: place.fellowship.properties.name,
      typename: 'Fellowship',
      location: place.fellowship.properties.location,
      latitude: place.fellowship.properties.location.y,
      longitude: place.fellowship.properties.location.x,
      distance: place.distance,
    }
  }

  if ('outreachVenue' in place) {
    return {
      id: place.outreachVenue.properties.id,
      name: place.outreachVenue.properties.name,
      typename:
        place.outreachVenue.labels.find((label) => label !== 'OutreachVenue') ||
        'OutreachVenue',
      location: place.outreachVenue.properties.location,
      latitude: place.outreachVenue.properties.location.y,
      longitude: place.outreachVenue.properties.location.x,
      distance: place.distance,
    }
  }

  return null
}

export const mapsResolvers = {
  Member: {
    placesSearchByName: async (source: Member, args: any, context: Context) => {
      const session = context.executionContext.session()
      const sessionTwo = context.executionContext.session()
      const sessionThree = context.executionContext.session()

      try {
        const res = await Promise.all([
          session.readTransaction((tx: any) =>
            tx.run(memberMemberSearchByName, {
              id: source.id,
              key: args.key,
              limit: args.limit,
            })
          ),
          sessionTwo.readTransaction((tx: any) =>
            tx.run(memberFellowshipSearchByName, {
              id: source.id,
              key: args.key,
              limit: args.limit,
            })
          ),
          sessionThree.readTransaction((tx: any) =>
            tx.run(universityOutreachVenuesSearchByName, {
              id: source.id,
              key: args.key,
              limit: args.limit,
            })
          ),
        ])

        // Process Results
        const peopleRes: PeopleResultShape[] = rearrangeCypherObject(
          res[0],
          true
        )
        const fellowshipsRes: FellowshipResultShape[] = rearrangeCypherObject(
          res[1],
          true
        )
        const uniVenuesRes: OutreachVenueResultShape[] = rearrangeCypherObject(
          res[2],
          true
        )

        // merge the two arrays and order by distance in ascending order
        const places = [...peopleRes, ...fellowshipsRes, ...uniVenuesRes].sort(
          (a, b) => a.distance - b.distance
        )

        // return the 30 closest places
        const formattedPlaces = places
          .map((place) => parseMapData(place))
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

    placesSearchByLocation: async (
      source: Member,
      args: any,
      context: Context
    ) => {
      const session = context.executionContext.session()
      const sessionTwo = context.executionContext.session()
      const sessionThree = context.executionContext.session()

      try {
        const res = await Promise.all([
          session.readTransaction((tx: any) =>
            tx.run(memberMemberSearchByLocation, {
              id: source.id,
              latitude: args.latitude,
              longitude: args.longitude,
              limit: args.limit,
            })
          ),
          sessionTwo.readTransaction((tx: any) =>
            tx.run(memberFellowshipSearchByLocation, {
              id: source.id,

              latitude: args.latitude,
              longitude: args.longitude,
              limit: args.limit,
            })
          ),
          sessionThree.readTransaction((tx: any) =>
            tx.run(universityOutreachVenuesSearchByLocation, {
              id: source.id,
              latitude: args.latitude,
              longitude: args.longitude,
              limit: args.limit,
            })
          ),
        ])

        // Process Results
        const peopleRes: PeopleResultShape[] = rearrangeCypherObject(
          res[0],
          true
        )
        const fellowshipsRes: FellowshipResultShape[] = rearrangeCypherObject(
          res[1],
          true
        )
        const uniVenuesRes: OutreachVenueResultShape[] = rearrangeCypherObject(
          res[2],
          true
        )

        // merge the  arrays and order by distance in ascending order
        const places = [...peopleRes, ...fellowshipsRes, ...uniVenuesRes].sort(
          (a, b) => a.distance - b.distance
        )

        // return the 30 closest places
        const formattedPlaces = places
          .map((place) => parseMapData(place))
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
