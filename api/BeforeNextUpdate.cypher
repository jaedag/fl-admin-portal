CREATE CONSTRAINT con_bacenta_code FOR (n:Bacenta) REQUIRE n.code IS UNIQUE;

MATCH (fellowship:Fellowship)
RETURN fellowship.location.latitude AS lat, fellowship.location.longitude AS long;

MATCH (f:Fellowship)
WHERE distance(point({latitude: f.location.latitude, longitude: f.location.longitude}), point({latitude: $lat, longitude: $long})) <= 5000
RETURN f
