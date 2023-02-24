export const memberFellowshipSearch = `
  MATCH (this:Member {id: $id})-[:LEADS|HAS|DOES_ARRIVALS_FOR|IS_ADMIN_FOR*1..6]->(fellowship:Fellowship)
  RETURN fellowship
  WITH fellowship, point.distance(point({latitude: fellowship.location.latitude, longitude: fellowship.location.longitude}), point({latitude: $latitude, longitude: $longitude})) AS distance
  WHERE distance <= 5000
  RETURN fellowship ORDER BY distance, fellowship.name ASC LIMIT $limit
`

export const memberMemberSearch = `
  MATCH (this:Member {id: $id})-[:LEADS|HAS|DOES_ARRIVALS_FOR|IS_ADMIN_FOR*1..6]->(:Fellowship)<-[:BELONGS_TO]-(members:Active:Member)
  WITH members, point.distance(point({latitude: members.location.latitude, longitude: members.location.longitude}), point({latitude: $latitude, longitude: $longitude})) AS distance
  WHERE distance <= 5000
  RETURN members ORDER BY distance ASC LIMIT $limit
`
