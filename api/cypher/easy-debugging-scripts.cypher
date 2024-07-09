
  MATCH (lastCode:LastBankingCode)
DETACH DELETE lastCode; 

MERGE (lastCode:LastBankingCode {number: 38})
RETURN lastCode.number;

MATCH (member:Member) WHERE member.imclChecked = false
SET member.imclChecked = true
RETURN member