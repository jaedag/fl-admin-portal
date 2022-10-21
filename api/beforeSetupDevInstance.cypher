

/// DB CLEANUPS
match (n:ServiceRecord)
detach delete n;

match (b:BussingRecord)
detach delete b;

match (v:VehicleRecord)
detach delete v;

match (f:ClosedFellowship)
detach delete f;

match (b:ClosedBacenta)
detach delete b;

match (c:ClosedConstituency)
detach delete c;

match (record:EquipmentRecord)
detach delete record;

match (n)
where not exists {
    match (n)-[]-()
}
detach delete n;

match (n:Member) where n.email in ['jaedagy@gmail.com', 'dabick14@gmail.com', 'ahadzi.airdem@gmail.com']

with collect(n) as remainder

MATCH (member:Member) WHERE NOT member  IN remainder
detach delete member;