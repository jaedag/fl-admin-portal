MATCH (council:Council)
WHERE council.downloadCredits IS NOT NULL
RETURN council.name, council.downloadCredits