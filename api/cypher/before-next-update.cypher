MATCH (stream:Stream)
SET stream:Active
RETURN COUNT(stream);

