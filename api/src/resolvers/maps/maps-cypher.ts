export const memberFellowshipSearch = `
  MATCH (this:Member {id: $id})-[:LEADS|HAS|DOES_ARRIVALS_FOR|IS_ADMIN_FOR*1..6]->(fellowship:Fellowship)
  WITH fellowship, point.distance(point({latitude: fellowship.location.latitude, longitude: fellowship.location.longitude}), point({latitude: $latitude, longitude: $longitude})) AS distance
  WHERE distance <= 5000
  RETURN fellowship, distance ORDER BY distance, fellowship.name ASC LIMIT 30
`

export const memberMemberSearch = `
  MATCH (this:Member {id: $id})-[:LEADS|HAS|DOES_ARRIVALS_FOR|IS_ADMIN_FOR*1..6]->(:Fellowship)<-[:BELONGS_TO]-(member:Active:Member)
  WITH member, point.distance(point({latitude: member.location.latitude, longitude: member.location.longitude}), point({latitude: $latitude, longitude: $longitude})) AS distance
  WHERE distance <= 5000
  RETURN member, distance ORDER BY distance ASC LIMIT 30
`
