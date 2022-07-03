//Return Fellowships With More Than One Current History Log
MATCH (fellowship:Fellowship)-[:CURRENT_HISTORY]->(log:ServiceLog)
WITH COUNT(log) AS log, fellowship
WHERE log> 1
MATCH (fellowship)-[:CURRENT_HISTORY]->(loge)
RETURN fellowship,loge;

//Connect Service Logs Which Don't Have Upward and Downward Relationships


//There are some Service Logs Which have multiple [:HAS_COMPONENT] relationships.
//Delete the HAS_COMPONENT relationship that is pointing to the wrong node




// There are some services which have no [:LOGGED_BY] relationship. Connect them to the leader at the time of the service