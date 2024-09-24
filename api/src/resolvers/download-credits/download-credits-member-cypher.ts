export const councilDownloadMembers = `
    MATCH (council:Council {id: $id})-[:HAS]->(team:Team)-[:HAS]->(bacenta:Bacenta)<-[:BELONGS_TO]-(members:Active:Member)
    MATCH (team)<-[:LEADS]-(teamLeader:Member)
    MATCH (bacenta)<-[:LEADS]-(bacentaLeader:Member)

    MATCH (members)-[:HAS_MARITAL_STATUS]->(maritalStatus:MaritalStatus)
    MATCH (members)-[:HAS_GENDER]->(gender:Gender)
    MATCH (members)-[:WAS_BORN_ON]->(dob:TimeGraph)
    OPTIONAL MATCH (members)-[:BELONGS_TO]->(basonta:Basonta)


    RETURN collect(members {
            .id,
            .firstName,
            .lastName,
            .phoneNumber,
            .whatsappNumber,
            .email,
            .visitationArea,
            maritalStatus: maritalStatus {
                .status
            },
            gender: gender {
                .gender
            },
            dob: dob {
                .date
            },
            basonta: basonta {
                .id,
                .name
            },
            bacenta: bacenta {
                .id,
                .name,
                leader: bacentaLeader {
                    .id,
                    .firstName,
                    .lastName,
                    fullName: bacentaLeader.firstName + ' ' + bacentaLeader.lastName
                },
                team: team{
                    .id,
                    .name,
                    leader: teamLeader {
                        .id,
                        .firstName,
                        .lastName,
                        fullName: teamLeader.firstName + ' ' + teamLeader.lastName
                    }
                }
            }
    }) AS members, council
`

export const StreamDownloadMembers = ``
