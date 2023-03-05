export const memberFellowshipSearchByName = `
MATCH (this:Member {id: $id})-[:LEADS|HAS|DOES_ARRIVALS_FOR|IS_ADMIN_FOR*1..6]->(fellowship:Active:Fellowship) 
WHERE toLower(fellowship.name) CONTAINS toLower($key)
RETURN DISTINCT fellowship LIMIT toInteger($limit)
`

export const memberMemberSearchByName = `
MATCH (this)-[:LEADS|HAS|DOES_ARRIVALS_FOR|IS_ADMIN_FOR*1..7]->(:Fellowship)<-[:BELONGS_TO]-(member:Active:Member)
WHERE toLower(member.firstName+ ' ' + member.lastName) CONTAINS toLower($key)
RETURN DISTINCT member ORDER BY toLower(member.lastName), toLower(member.firstName) LIMIT toInteger($limit)
`

export const universityOutreachVenuesSearchByName = `
MATCH (outreachVenue:UniversityVenue)
WHERE toLower(outreachVenue.name) CONTAINS toLower($key)
RETURN DISTINCT outreachVenue LIMIT toInteger($limit)
`

export const memberFellowshipSearchByLocation = `
  MATCH (this:Member {id: $id})-[:LEADS|HAS|DOES_ARRIVALS_FOR|IS_ADMIN_FOR*1..6]->(fellowship:Fellowship)
  WITH fellowship, point.distance(point({latitude: fellowship.location.latitude, longitude: fellowship.location.longitude}), point({latitude: $latitude, longitude: $longitude})) AS distance
  WHERE distance <= 5000
  RETURN DISTINCT fellowship, distance ORDER BY distance, fellowship.name ASC LIMIT 30
`

export const memberMemberSearchByLocation = `
  MATCH (this:Member {id: $id})-[:LEADS|HAS|DOES_ARRIVALS_FOR|IS_ADMIN_FOR*1..6]->(:Fellowship)<-[:BELONGS_TO]-(member:Active:Member)
  WITH member, point.distance(point({latitude: member.location.latitude, longitude: member.location.longitude}), point({latitude: $latitude, longitude: $longitude})) AS distance
  WHERE distance <= 5000
  RETURN DISTINCT member, distance ORDER BY distance ASC LIMIT 30
`

export const universityOutreachVenuesSearchByLocation = `
  MATCH (outreachVenue:UniversityVenue)
  WITH outreachVenue, point.distance(point({latitude: outreachVenue.location.latitude, longitude: outreachVenue.location.longitude}), point({latitude: $latitude, longitude: $longitude})) AS distance
  WHERE distance <= 5000
  RETURN DISTINCT outreachVenue, distance ORDER BY distance, outreachVenue.name ASC LIMIT 30
`
