CREATE CONSTRAINT con_bacenta_code FOR (n:Bacenta) REQUIRE n.code IS UNIQUE;

MATCH (fellowship:Fellowship)
RETURN fellowship.location.latitude AS lat, fellowship.location.longitude AS long;

MATCH (f:Fellowship)
WHERE distance(point({latitude: f.location.latitude, longitude: f.location.longitude}), point({latitude: $lat, longitude: $long})) <= 5000
RETURN f;

MATCH (member:Member) WHERE member.location.x = 0
SET member.location = point({latitude: toFloat(0), longitude: toFloat(0), crs:'WGS-84'})
RETURN member;


CREATE CONSTRAINT con_outreach_venue_needsLocation IF NOT EXISTS FOR (n:OutreachVenue) REQUIRE (n.location) IS NOT NULL;
CREATE CONSTRAINT con_outreach_venue_needsCapacity IF NOT EXISTS FOR (n:OutreachVenue) REQUIRE (n.capacity) IS NOT NULL;
CREATE CONSTRAINT con_outreach_venue_nodeKey IF NOT EXISTS FOR (n:OutreachVenue) REQUIRE (n.id) IS NODE KEY;
CREATE CONSTRAINT con_uni_outreach_venue IF NOT EXISTS FOR (n:UniversityVenue) REQUIRE (n.university) IS NOT NULL;


LOAD CSV WITH HEADERS FROM "https://docs.google.com/spreadsheets/d/e/2PACX-1vQPmVcSMtfG49brBoOPkTJKHoGH6wDNhQ8lMY7amPmScg5ZP9U07WRf_9f9t_yCRLGYrgyQXtl7N4E0/pub?gid=0&single=true&output=csv" AS line
MATCH (venue:UniversityVenue:OutreachVenue {name: line.venue})
    SET venue.id = apoc.create.uuid(),
                  venue.location = point({latitude: toFloat(line.latitude), longitude: toFloat(line.longitude)}),
                  venue.description = line.comment,
                  venue.capacity = toInteger(line.capacity),
                  venue.elevation = toInteger(line.elevation),
                  venue.university = line.university,
                  venue.hall = line.hall,
                  venue.created = timestamp() 
RETURN venue LIMIT 5;

MATCH (venue:OutreachVenue)
REMOVE venue.longitude, venue.latitude
RETURN venue LIMIT 5;

