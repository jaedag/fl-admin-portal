MATCH (trans:CreditTransaction {transactionReference: "31ljknrjmjrwvgm"})-[]-(church)
SET trans.credited = false

RETURN SUM(church.downloadCredtis), SUM(church.downloadCredits) + 10
