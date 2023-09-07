export const memberFellowshipSearchByName = `
MATCH (this:Member {id: $id})-[:LEADS|HAS|IS_ADMIN_FOR*1..6]->(fellowship:Active:Fellowship)<-[:LEADS]-(fellowshipLeader:Member)
MATCH (fellowship)<-[:HAS]-(:Bacenta)<-[:HAS]-(:Constituency)<-[:HAS]-(council:Council)<-[:LEADS]-(councilLeader:Member)
WHERE toLower(fellowship.name) CONTAINS toLower($key) AND fellowship.location IS NOT NULL
RETURN DISTINCT fellowship,
fellowshipLeader {
  .id,
  .firstName,
  .lastName,
  .phoneNumber,
  .whatsappNumber,
  .pictureUrl
},
council {
  .id,
  .name
},
councilLeader {
  .id,
  .firstName,
  .lastName,
  .phoneNumber,
  .whatsappNumber,
  .pictureUrl
}
LIMIT toInteger($limit)
`

export const memberLoadCouncilUnvisitedMembers = `
MATCH (this:Member {id: $id})-[:LEADS|IS_ADMIN_FOR]->(council:Council)-[:HAS]->(:Constituency)-[:HAS]->(:Bacenta)-[:HAS]->(:Fellowship)<-[:BELONGS_TO]-(member:Member)-[:LEADS|IS_ADMIN_FOR]->()
MATCH (cycle:CouncilCycle {half: toInteger(ceil(toFloat(date().month)/toFloat(6))) - 1, year: date().year})
MATCH (author:Member {auth_id: $auth.jwt.sub})-[:CURRENT_HISTORY]->(log:ServiceLog)<-[:CURRENT_HISTORY]-(council)
WHERE NOT EXISTS {
   MATCH (log)-[:PERFORMED_DUTY]->(visitation:VisitationActivity)
   WHERE (visitation)-[:TOWARDS]->(member) AND (visitation)-[:DURING_CYCLE]->(cycle)
}

OPTIONAL MATCH (author)-[:LEADS]->(lowerChurch)-[:HAS*0..2]->(:Fellowship)<-[:BELONGS_TO]-(alreadyMember:Member)
WHERE lowerChurch:Constituency OR lowerChurch:Bacenta OR lowerChurch:Fellowship
WITH member, author, collect(DISTINCT alreadyMember) AS alreadyMembers WHERE NOT member IN alreadyMembers
WITH member, author WHERE member <> author
AND member.location IS NOT NULL

WITH DISTINCT member
MATCH (member)-[:BELONGS_TO]->(fellowship:Fellowship)<-[:HAS*3]-(council:Council)<-[:LEADS]-(pastor:Member)

  RETURN DISTINCT member, 
  fellowship {
    .id,
    .name,
    .location
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
   ORDER BY toLower(member.lastName), toLower(member.firstName)
`

export const memberMemberSearchByName = `
MATCH (this:Member {id: $id})-[:LEADS|HAS|IS_ADMIN_FOR*1..7]->(:Fellowship)<-[:BELONGS_TO]-(member:Active:Member)
WHERE toLower(member.firstName+ ' ' + member.lastName) CONTAINS toLower($key) AND member.location IS NOT NULL
WITH DISTINCT member
MATCH (member)-[:BELONGS_TO]->(fellowship:Fellowship)<-[:HAS*3]-(council:Council)<-[:LEADS]-(pastor:Member)

  RETURN DISTINCT member, 
  fellowship {
    .id,
    .name,
    .location
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
   ORDER BY toLower(member.lastName), toLower(member.firstName) LIMIT toInteger($limit)
`

export const indoorOutreachVenuesSearchByName = `
MATCH (outreachVenue:IndoorVenue)
WHERE toLower(outreachVenue.name) CONTAINS toLower($key) AND outreachVenue.location IS NOT NULL
RETURN DISTINCT outreachVenue LIMIT toInteger($limit)
`

export const outdoorOutreachVenuesSearchByName = `
MATCH (outreachVenue:OutdoorVenue)
WHERE toLower(outreachVenue.name) CONTAINS toLower($key) AND outreachVenue.location IS NOT NULL
RETURN DISTINCT outreachVenue LIMIT toInteger($limit)
`

export const memberFellowshipSearchByLocation = `
  MATCH (this:Member {id: $id})-[:LEADS|HAS|IS_ADMIN_FOR*1..6]->(fellowship:Fellowship)<-[:LEADS]-(fellowshipLeader:Member)
  MATCH (fellowship)<-[:HAS]-(:Bacenta)<-[:HAS]-(:Constituency)<-[:HAS]-(council:Council)<-[:LEADS]-(councilLeader:Member)
  WITH fellowship, fellowshipLeader, council, councilLeader, point.distance(point({latitude: fellowship.location.latitude, longitude: fellowship.location.longitude}), point({latitude: $latitude, longitude: $longitude})) AS distance
  WHERE distance <= 5000
  RETURN DISTINCT fellowship,
  fellowshipLeader {
    .id,
    .firstName,
    .lastName,
    .phoneNumber,
    .whatsappNumber,
    .pictureUrl
  },
  council {
    .id,
    .name
  },
  councilLeader {
    .id,
    .firstName,
    .lastName,
    .phoneNumber,
    .whatsappNumber,
    .pictureUrl
  }, distance ORDER BY distance, fellowship.name ASC LIMIT 30
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
    .name,
    .location
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
