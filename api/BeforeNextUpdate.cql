//Return church levels With More Than One Current History Log
// Should be conected to only the person who is the current leader

MATCH (fellowship:Fellowship)-[:CURRENT_HISTORY]->(log:ServiceLog)
WITH COUNT(log) AS log, fellowship
WHERE log> 1
MATCH (fellowship)-[:CURRENT_HISTORY]->(loge)
RETURN fellowship,loge;

//Some service records have multiple HAS_SERVICE relationships which need to be made single

//Connect Service Logs Which Don't Have Upward and Downward Relationships


//There are some Service Logs Which have multiple [:HAS_COMPONENT] relationships.
//Delete the HAS_COMPONENT relationship that is pointing to the wrong nod


// There are some services which have no [:LOGGED_BY] relationship. 
//Connect them to the leader at the time of the service


