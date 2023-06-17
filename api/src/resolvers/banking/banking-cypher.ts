export const initiateServiceRecordTransaction = `
MATCH (record:ServiceRecord {id: $serviceRecordId})<-[:HAS_SERVICE]-(:ServiceLog)<-[:HAS_HISTORY]-(church)
WHERE church:Fellowship OR church:Constituency OR church:Council OR church:Stream OR church:Campus


UNWIND labels(church) AS churchLevel 
WITH record, church, churchLevel
WHERE churchLevel = 'Fellowship' OR churchLevel = 'Bacenta' OR churchLevel = 'Constituency' 
OR churchLevel = 'Council' OR churchLevel = 'Stream' OR churchLevel = 'Campus'

MATCH (author:Member {auth_id: $auth.jwt.sub})
MATCH (record)-[:SERVICE_HELD_ON]->(date:TimeGraph)
SET record.sourceNumber = $mobileNumber,
    record.sourceNetwork = $mobileNetwork,
    record.desc = church.name + ' ' + churchLevel + ' '  + date.date,
    record.transactionStatus = 'pending',
    record.transactionTime = datetime()

MERGE (author)<-[:OFFERING_BANKED_BY]-(record)

RETURN record, church.name AS churchName, date.date AS date, churchLevel AS churchLevel,
    author {
        .firstName,
        .lastName,
        .email,
        .phoneNumber
    }
`

export const setRecordTransactionReference = `
    MATCH (record:ServiceRecord {id: $id})
    SET record.transactionReference = $reference,
    record.transactionStatus = 'pending'

    RETURN record {
        .id,
        .transactionReference,
        .transactionStatus
    }
`

export const setRecordTransactionReferenceWithOTP = `
    MATCH (record:ServiceRecord {id: $id})
    SET record.transactionReference = $reference,
    record.transactionStatus = 'send OTP'
    
    RETURN record {
        .id,
        .transactionReference,
        .transactionStatus,
        .cash,
        .desc,
        .sourceNetwork,
        .sourceNumber,
        .transactionTime
        }
    `

export const checkTransactionReference = `
MATCH (record:ServiceRecord {id: $serviceRecordId})<-[:HAS_SERVICE]-(:ServiceLog)<-[:HAS_HISTORY]-(church)<-[:HAS*0..5]-(stream:Stream)
WHERE church:Fellowship OR church:Constituency OR church:Council OR church:Stream
OPTIONAL MATCH (record)-[:OFFERING_BANKED_BY]->(banker)
RETURN record {
    .id,
    .transactionReference,
    .transactionStatus,
    .transactionTime,
    .income
}, banker {
    .id,
    .firstName, 
    .lastName
}, stream {
    .id,
    .bankAccount,
    .name
} 
`

export const setTransactionStatusFailed = `
MATCH (record:ServiceRecord {id: $serviceRecordId})
OPTIONAL MATCH (record)-[r:OFFERING_BANKED_BY]->(banker)
SET record.transactionStatus = 'failed'

DELETE r

RETURN record
`

export const setTransactionStatusSuccess = `
   MATCH (record:ServiceRecord {id: $serviceRecordId})
   SET record.transactionStatus = 'success'
   
   RETURN record
`

export const getLastServiceRecord = `
MATCH (record:ServiceRecord {id: $serviceRecordId})-[:SERVICE_HELD_ON]->(date:TimeGraph)
MATCH (record)<-[:HAS_SERVICE]-(:ServiceLog)<-[:HAS_HISTORY]-(church) WHERE church:Fellowship OR church:Constituency OR church:Council
MATCH (church)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(otherRecords:ServiceRecord)-[:SERVICE_HELD_ON]->(otherDate:TimeGraph)
WHERE NOT (otherRecords:NoService) AND duration.between(otherDate.date, date.date).weeks < 52 AND otherDate.date < date.date

WITH DISTINCT record,otherRecords ORDER BY otherRecords.createdAt DESC LIMIT 2
WITH collect(otherRecords.id) AS recordIds, record.id AS currentServiceId

WITH apoc.coll.indexOf(recordIds,currentServiceId) + 1 AS lastServiceIndex, recordIds WHERE lastServiceIndex >= 0
MATCH (lastService:ServiceRecord {id: recordIds[lastServiceIndex]})-[:SERVICE_HELD_ON]->(lastDate:TimeGraph)

RETURN lastService, lastDate
`

export const submitBankingSlip = `
MATCH (record:ServiceRecord {id: $serviceRecordId})
WHERE record.transactionStatus IS NULL
OR record.transactionStatus = 'failed'
SET record.bankingSlip = $bankingSlip
WITH record
MATCH (banker:Member {auth_id: $auth.jwt.sub})
MERGE (banker)-[:UPLOADED_SLIP_FOR]->(record)
RETURN record
`

export const checkIfServicePending = `
MATCH (record:ServiceRecord {id: $serviceRecordId})
WHERE record.transactionStatus = 'pending' OR record.transactionStatus = 'send OTP'
RETURN record
`
