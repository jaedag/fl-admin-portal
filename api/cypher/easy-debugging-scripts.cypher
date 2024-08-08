  MATCH (council:Council {id: "51a821a3-9cb2-424b-85ff-36b8ca96f7e6"})
  SET council.downloadCredits = 1
  RETURN council.downloadCredits
  RETURN COUNT(members)