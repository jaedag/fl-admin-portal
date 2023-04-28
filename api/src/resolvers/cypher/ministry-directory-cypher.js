export const matchMemberFederalMinistryQuery = `
  WITH apoc.cypher.runFirstColumn(  
    "MATCH (member:Member {id:$id})
    RETURN member", {offset:0, first:5, id: $id}, True) AS x UNWIND x AS member
    RETURN member { .id,.auth_id, .firstName,.lastName,.email,.phoneNumber,.whatsappNumber,.pictureUrl,
    leadsFederalMinistry: [ member_ministry IN apoc.cypher.runFirstColumn("MATCH (this)-[:LEADS]->(federalMinistry:Federalministry)
    RETURN federalMinistry", {this:member}, true) | member_federalMinistry {.id, .name}]} AS member
  `;
export const matchMemberMinistryQuery = `
    WITH apoc.cypher.runFirstColumn(
        "MATCH (member:Member {id:$id})
        RETURN member", {offset:0, first:5, id: $id}, True) AS x UNWIND x AS member
        RETURN member { .id,.auth_id, .firstName,.lastName,.email,.phoneNumber,.whatsappNumber,.pictureUrl,
        leadsMinistry: [ member_ministry IN apoc.cypher.runFirstColumn("MATCH (this)-[:LEADS]->(ministry:Ministry)
        RETURN ministry", {this:member}, true) | member_ministry {.id, .name}]} AS member
    `;
export const matchMemberHubQuery = `
    WITH apoc.cypher.runFirstColumn(
        "MATCH (member:Member {id:$id})
        RETURN member", {offset:0, first:5, id: $id}, True) AS x UNWIND x AS member
        RETURN member { .id,.auth_id, .firstName,.lastName,.email,.phoneNumber,.whatsappNumber,.pictureUrl,
        leadsHub: [ member_hub IN apoc.cypher.runFirstColumn("MATCH (this)-[:LEADS]->(hub:Hub)
        RETURN hub", {this:member}, true) | member_hub {.id, .name}]} AS member
    `;
export const matchMemberSontaQuery = `
    WITH apoc.cypher.runFirstColumn(
        "MATCH (member:Member {id:$id})
        RETURN member", {offset:0, first:5, id: $id}, True) AS x UNWIND x AS member
        RETURN member { .id,.auth_id, .firstName,.lastName,.email,.phoneNumber,.whatsappNumber,.pictureUrl,
        leadsSonta: [ member_sonta IN apoc.cypher.runFirstColumn("MATCH (this)-[:LEADS]->(sonta:Sonta)
        RETURN sonta", {this:member}, true) | member_sonta {.id, .name}]} AS member
    `;
