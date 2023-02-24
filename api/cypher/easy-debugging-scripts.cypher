MATCH (record:ServiceRecord {id: $service})

RETURN record.transactionReference, record.income, record.transactionStatus;
