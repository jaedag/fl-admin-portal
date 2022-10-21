export const initiateServiceRecordTransaction = `
MATCH (record:ServiceRecord {id: $serviceRecordId})<-[:HAS_SERVICE]-(:ServiceLog)<-[:HAS_HISTORY]-(church)
WHERE church:Fellowship OR church:Constituency OR church:Council OR church:Stream OR church:GatheringService


UNWIND labels(church) AS churchLevel 
WITH record, church, churchLevel
WHERE churchLevel = 'Fellowship' OR churchLevel = 'Bacenta' OR churchLevel = 'Constituency' 
OR churchLevel = 'Council' OR churchLevel = 'Stream' OR churchLevel = 'GatheringService'

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
        .transactionStatus
        }
    `

export const checkTransactionReference = `
MATCH (record:ServiceRecord {id: $serviceRecordId})
OPTIONAL MATCH (record)-[:OFFERING_BANKED_BY]->(banker)
RETURN record {
    .id,
    .transactionReference,
    .transactionStatus,
    .income
}, banker {
    .id,
    .firstName, 
    .lastName
} 
`

export const setTransactionStatusFailed = `
MATCH (record:ServiceRecord {id: $serviceRecordId})
MATCH (record)-[r:OFFERING_BANKED_BY]->(banker)
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
MATCH (record)<-[:HAS_SERVICE]-(:ServiceLog)<-[:HAS_HISTORY]-(fellowship:Fellowship)
MATCH (fellowship)-[:HAS_HISTORY]->(:ServiceLog)-[:HAS_SERVICE]->(otherRecords:ServiceRecord)-[:SERVICE_HELD_ON]->(otherDate:TimeGraph)
WHERE NOT (otherRecords:NoService) AND otherDate.date.week < date.date.week

WITH DISTINCT record,otherRecords ORDER BY otherRecords.createdAt DESC LIMIT 2
WITH collect(otherRecords.id) AS recordIds, record.id AS currentServiceId

WITH apoc.coll.indexOf(recordIds,currentServiceId) + 1 AS lastServiceIndex, recordIds WHERE lastServiceIndex >= 0
MATCH (lastService:ServiceRecord {id: recordIds[lastServiceIndex]})

RETURN lastService
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
