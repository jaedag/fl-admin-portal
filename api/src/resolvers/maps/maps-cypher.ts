export const memberFellowshipSearchByName = `
MATCH (this:Member {id: $id})-[:LEADS|HAS|IS_ADMIN_FOR*1..6]->(fellowship:Active:Fellowship) 
WHERE toLower(fellowship.name) CONTAINS toLower($key)
RETURN DISTINCT fellowship LIMIT toInteger($limit)
`

export const memberMemberSearchByName = `
MATCH (this:Member {id: $id})-[:LEADS|HAS|IS_ADMIN_FOR*1..7]->(:Fellowship)<-[:BELONGS_TO]-(member:Active:Member)
WHERE toLower(member.firstName+ ' ' + member.lastName) CONTAINS toLower($key)
WITH DISTINCT member
MATCH (member)-[:BELONGS_TO]->(fellowship:Fellowship)<-[:HAS*3]-(council:Council)<-[:LEADS]-(pastor:Member)

  RETURN DISTINCT member, 
  fellowship {
    .id,
    .name
  },
  council {
    .id,
    .name
  },
    pastor {
      .id,
      .firstName,
      .lastName,
      .phoneNumber,
      .whatsappNumber,
      .pictureUrl
    }
   ORDER BY  toLower(member.lastName), toLower(member.firstName) LIMIT toInteger($limit)
`

export const indoorOutreachVenuesSearchByName = `
MATCH (outreachVenue:IndoorVenue)
WHERE toLower(outreachVenue.name) CONTAINS toLower($key)
RETURN DISTINCT outreachVenue LIMIT toInteger($limit)
`

export const outdoorOutreachVenuesSearchByName = `
MATCH (outreachVenue:OutdoorVenue)
WHERE toLower(outreachVenue.name) CONTAINS toLower($key)
RETURN DISTINCT outreachVenue LIMIT toInteger($limit)
`

export const memberFellowshipSearchByLocation = `
  MATCH (this:Member {id: $id})-[:LEADS|HAS|IS_ADMIN_FOR*1..6]->(fellowship:Fellowship)
  WITH fellowship, point.distance(point({latitude: fellowship.location.latitude, longitude: fellowship.location.longitude}), point({latitude: $latitude, longitude: $longitude})) AS distance
  WHERE distance <= 5000
  RETURN DISTINCT fellowship, distance ORDER BY distance, fellowship.name ASC LIMIT 30
`

export const memberMemberSearchByLocation = `
  MATCH (this:Member {id: $id})-[:LEADS|HAS|IS_ADMIN_FOR*1..6]->(:Fellowship)<-[:BELONGS_TO]-(member:Active:Member)
  WITH member, point.distance(point({latitude: member.location.latitude, longitude: member.location.longitude}), point({latitude: $latitude, longitude: $longitude})) AS distance
  WHERE distance <= 5000

WITH DISTINCT member, distance
MATCH (member)-[:BELONGS_TO]->(fellowship:Fellowship)<-[:HAS*3]-(council:Council)<-[:LEADS]-(pastor:Member)

RETURN DISTINCT member, 
  fellowship {
    .id,
    .name
  },
  council {
    .id,
    .name
  },
  pastor {
    .id,
    .firstName,
    .lastName,
    .phoneNumber,
    .whatsappNumber,
    .pictureUrl
    },
   distance ORDER BY distance, toLower(member.lastName), toLower(member.firstName) LIMIT toInteger($limit)
`

export const indoorOutreachVenuesSearchByLocation = `
  MATCH (outreachVenue:IndoorVenue)
  WITH outreachVenue, point.distance(point({latitude: outreachVenue.location.latitude, longitude: outreachVenue.location.longitude}), point({latitude: $latitude, longitude: $longitude})) AS distance
  WHERE distance <= 5000
  RETURN DISTINCT outreachVenue, distance ORDER BY distance, outreachVenue.name ASC LIMIT 30
`

export const outdoorOutreachVenuesSearchByLocation = `
  MATCH (outreachVenue:OutdoorVenue)
  WITH outreachVenue, point.distance(point({latitude: outreachVenue.location.latitude, longitude: outreachVenue.location.longitude}), point({latitude: $latitude, longitude: $longitude})) AS distance
  WHERE distance <= 5000
  RETURN DISTINCT outreachVenue, distance ORDER BY distance, outreachVenue.name ASC LIMIT 30
`
