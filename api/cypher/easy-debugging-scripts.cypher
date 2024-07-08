
  MATCH (lastCode:LastBankingCode)
DETACH DELETE lastCode; 

MERGE (lastCode:LastBankingCode {number: 38})
RETURN lastCode.number;