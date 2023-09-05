// if someone says that 
// If someone says he has filled IMCL but is still getting an error,
//it means he filled it out of order and this must be run
MATCH (record:ServiceRecord {id: "6cd1db21-2d9f-4c71-9cf4-233ed70e723e"})
OPTIONAL MATCH (record)<-[:ABSENT_FROM_SERVICE]-(absent:Member)
   WHERE absent.imclChecked = false
SET absent.imclChecked = true

RETURN record.attendance, absent;




