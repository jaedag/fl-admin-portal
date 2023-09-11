import { Church, MemberWithoutBioData, Stream } from 'global-types'

export type OversightSearchResult = {
  oversightMemberSearch: MemberWithoutBioData[]
  oversightCampusSearch: Church[]
  oversightStreamSearch: Stream[]
  oversightCouncilSearch: Church[]
  oversightConstituencySearch: Church[]
  oversightBacentaSearch: Church[]
  oversightFellowshipSearch: Church[]
}
export type CampusSearchResult = {
  campusMemberSearch: MemberWithoutBioData[]
  campusStreamSearch: Stream[]
  campusCouncilSearch: Church[]
  campusConstituencySearch: Church[]
  campusBacentaSearch: Church[]
  campusFellowshipSearch: Church[]
  campusCreativeArtsSearch: Church[]
  campusMinistrySearch: Church[]
  campusHubSearch: Church[]
}

export type CreativeArtsSearchResult = {
  creativeArtsMemberSearch: MemberWithoutBioData[]
  creativeArtsStreamSearch: Stream[]
  creativeArtsCouncilSearch: Church[]
  creativeArtsConstituencySearch: Church[]
  creativeArtsBacentaSearch: Church[]
  creativeArtsFellowshipSearch: Church[]
  creativeArtsMinistrySearch: Church[]
  creativeArtsHubSearch: Church[]
}

export type StreamSearchResult = {
  streamMemberSearch: MemberWithoutBioData[]
  streamCouncilSearch: Church[]
  streamConstituencySearch: Church[]
  streamBacentaSearch: Church[]
  streamFellowshipSearch: Church[]
  streamMinistrySearch: Church[]
  streamHubSearch: Church[]
}

export type MinistrySearchResult = {
  ministryMemberSearch: MemberWithoutBioData[]
  ministryCouncilSearch: Church[]
  ministryConstituencySearch: Church[]
  ministryBacentaSearch: Church[]
  ministryFellowshipSearch: Church[]
  ministryMinistrySearch: Church[]
  ministryHubSearch: Church[]
}

export type CouncilSearchResult = {
  councilMemberSearch: MemberWithoutBioData[]
  councilConstituencySearch: Church[]
  councilBacentaSearch: Church[]
  councilFellowshipSearch: Church[]
  councilHubSearch: Church[]
}

export type HubSearchResult = {
  hubMemberSearch: MemberWithoutBioData[]
  hubConstituencySearch: Church[]
  hubBacentaSearch: Church[]
  hubFellowshipSearch: Church[]
  hubHubSearch: Church[]
}

export type ConstituencySearchResult = {
  constituencyMemberSearch: MemberWithoutBioData[]
  constituencyBacentaSearch: Church[]
  constituencyFellowshipSearch: Church[]
}

export type BacentaSearchResults = {
  bacentaMemberSearch: MemberWithoutBioData[]
  bacentaFellowshipSearch: Church[]
}

export type FellowshipSearchResults = {
  fellowshipMemberSearch: MemberWithoutBioData[]
}

export type SearchResult = MemberWithoutBioData | Church
