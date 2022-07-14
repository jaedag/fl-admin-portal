//Adding CONSTRAINST 
//constraint for service record id
CREATE CONSTRAINT con_oversight_id FOR (n:Oversight) REQUIRE n.id IS UNIQUE;
CREATE INDEX ind_oversight_name FOR (n:Oversight) ON (n.name);

CREATE CONSTRAINT con_gathering_service_id FOR (n:GatheringService) REQUIRE n.id IS UNIQUE;
CREATE INDEX ind_gathering_service_name FOR (n:GatheringService) ON (n.name);


CREATE CONSTRAINT con_stream_id FOR (n:Stream) REQUIRE n.id IS UNIQUE;
CREATE INDEX ind_stream_name FOR (n:Stream) ON (n.name);

CREATE CONSTRAINT con_council_id FOR (n:Council) REQUIRE n.id IS UNIQUE;
CREATE INDEX ind_council_name FOR (n:Council) ON (n.name);

CREATE CONSTRAINT con_constituency_id FOR (n:Constituency) REQUIRE n.id IS UNIQUE;
CREATE INDEX ind_constituency_name FOR (n:Constituency) ON (n.name);

CREATE CONSTRAINT con_bacenta_id FOR (n:Bacenta) REQUIRE n.id IS UNIQUE;
CREATE INDEX ind_bacenta_name FOR (n:Bacenta) ON (n.name);

CREATE CONSTRAINT con_fellowship_id FOR (n:Fellowship) REQUIRE n.id IS UNIQUE;
CREATE INDEX ind_fellowship_name FOR (n:Fellowship) ON (n.name);

CREATE CONSTRAINT con_closedfellowship_id FOR (n:ClosedFellowship) REQUIRE n.id IS UNIQUE;
CREATE INDEX ind_closedfellowship_name FOR (n:ClosedFellowship) ON (n.name);

CREATE CONSTRAINT con_closedbacenta_id FOR (n:ClosedBacenta) REQUIRE n.id IS UNIQUE;
CREATE INDEX ind_closedbacenta_name FOR (n:ClosedBacenta) ON (n.name);

CREATE CONSTRAINT con_closedconstituency_id FOR (n:ClosedConstituency) REQUIRE n.id IS UNIQUE;
CREATE INDEX ind_closedconstituency_name FOR (n:ClosedConstituency) ON (n.name);

CREATE CONSTRAINT con_member_id FOR (n:Member) REQUIRE n.id IS UNIQUE;
CREATE INDEX ind_member_firstname FOR (n:Member) ON (n.firstName);
CREATE INDEX ind_member_lastname FOR (n:Member) ON (n.lastName);
CREATE CONSTRAINT con_member_email FOR (n:Member) REQUIRE n.email IS UNIQUE;
CREATE CONSTRAINT con_member_whatsapp FOR (n:Member) REQUIRE n.whatsappNumber IS UNIQUE;
CREATE CONSTRAINT con_member_auth_id FOR (n:Member) REQUIRE n.auth_id IS UNIQUE;
CREATE CONSTRAINT memberShouldHaveEmails FOR (member:Member) REQUIRE member.email IS NOT NULL;
CREATE CONSTRAINT memberShouldHaveWhatsAppNumber FOR (member:Member) REQUIRE member.whatsappNumber IS NOT NULL;

CREATE CONSTRAINT con_sheep_id FOR (n:Sheep) REQUIRE n.id IS UNIQUE;
CREATE INDEX ind_sheep_firstname FOR (n:Sheep) ON (n.firstName);
CREATE INDEX ind_sheep_lastname FOR (n:Sheep) ON (n.lastName);
CREATE CONSTRAINT con_sheep_email FOR (n:Sheep) REQUIRE n.email IS UNIQUE;
CREATE CONSTRAINT con_sheep_whatsapp FOR (n:Sheep) REQUIRE n.whatsappNumber IS UNIQUE;
CREATE CONSTRAINT con_sheep_auth_id FOR (n:Sheep) REQUIRE n.auth_id IS UNIQUE;
CREATE CONSTRAINT sheepShouldHaveEmails FOR (sheep:Sheep) REQUIRE sheep.email IS NOT NULL;
CREATE CONSTRAINT sheepShouldHaveWhatsAppNumber FOR (sheep:Sheep) REQUIRE sheep.whatsappNumber IS NOT NULL;

CREATE CONSTRAINT con_goat_id FOR (n:Goat) REQUIRE n.id IS UNIQUE;
CREATE INDEX ind_goat_firstname FOR (n:Goat) ON (n.firstName);
CREATE INDEX ind_goat_lastname FOR (n:Goat) ON (n.lastName);
CREATE CONSTRAINT con_goat_email FOR (n:Goat) REQUIRE n.email IS UNIQUE;
CREATE CONSTRAINT con_goat_whatsapp FOR (n:Goat) REQUIRE n.whatsappNumber IS UNIQUE;
CREATE CONSTRAINT con_goat_auth_id FOR (n:Goat) REQUIRE n.auth_id IS UNIQUE;
CREATE CONSTRAINT goatShouldHaveEmails FOR (goat:Goat) REQUIRE goat.email IS NOT NULL;
CREATE CONSTRAINT goatShouldHaveWhatsAppNumber FOR (goat:Goat) REQUIRE goat.whatsappNumber IS NOT NULL;

CREATE CONSTRAINT con_deer_id FOR (n:Deer) REQUIRE n.id IS UNIQUE;
CREATE INDEX ind_deer_firstname FOR (n:Deer) ON (n.firstName);
CREATE INDEX ind_deer_lastname FOR (n:Deer) ON (n.lastName);
CREATE CONSTRAINT con_deer_email FOR (n:Deer) REQUIRE n.email IS UNIQUE;
CREATE CONSTRAINT con_deer_whatsapp FOR (n:Deer) REQUIRE n.whatsappNumber IS UNIQUE;
CREATE CONSTRAINT con_deer_auth_id FOR (n:Deer) REQUIRE n.auth_id IS UNIQUE;
CREATE CONSTRAINT deerShouldHaveEmails FOR (deer:Deer) REQUIRE deer.email IS NOT NULL;
CREATE CONSTRAINT deerShouldHaveWhatsAppNumber FOR (deer:Deer) REQUIRE deer.whatsappNumber IS NOT NULL;


CREATE CONSTRAINT con_timegraph_date FOR (n:TimeGraph) REQUIRE n.date IS UNIQUE;
CREATE CONSTRAINT con_swelldate FOR (n:SwellDate) REQUIRE n.date IS UNIQUE;
CREATE CONSTRAINT con_title FOR (n:Title) REQUIRE n.title IS UNIQUE;

CREATE CONSTRAINT con_service_record_id FOR (n:ServiceRecord) REQUIRE n.id IS UNIQUE;
CREATE CONSTRAINT con_bussing_record_id FOR (n:BussingRecord) REQUIRE n.id IS UNIQUE;
CREATE CONSTRAINT bussingRecordShouldHaveMobilisationPic FOR (n:BussingRecord) REQUIRE n.mobilisationPicture IS NOT NULL;

CREATE CONSTRAINT con_service_log_id FOR (n:ServiceLog) REQUIRE n.id IS UNIQUE;
CREATE CONSTRAINT con_service_day_day FOR (n:ServiceDay) REQUIRE n.day IS UNIQUE;
CREATE CONSTRAINT con_service_day_dayNumber FOR (n:ServiceDay) REQUIRE n.dayNumber IS UNIQUE;

CREATE CONSTRAINT con_registration_log_id FOR (n:RegistrationLog) REQUIRE n.id IS UNIQUE;
CREATE INDEX ind_occupation FOR (n:Occuptation) ON (n.occupation);
CREATE CONSTRAINT con_no_service_id FOR (n:NoService) REQUIRE n.id IS UNIQUE;
CREATE CONSTRAINT con_history_log_id FOR (n:HistoryLog) REQUIRE n.id IS UNIQUE;


