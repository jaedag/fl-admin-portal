import { useState } from 'react'

const useClickCard = () => {
  const [church, setChurch] = useState(
    sessionStorage.getItem('church')
      ? JSON.parse(sessionStorage.getItem('church'))
      : { church: '', subChurch: '' }
  )

  const [oversightId, setOversightId] = useState(
    sessionStorage.getItem('oversightId')
      ? sessionStorage.getItem('oversightId')
      : ''
  )

  const [gatheringServiceId, setGatheringServiceId] = useState(
    sessionStorage.getItem('gatheringServiceId')
      ? sessionStorage.getItem('gatheringServiceId')
      : ''
  )
  const [streamId, setStreamId] = useState(
    sessionStorage.getItem('streamId') ?? ''
  )

  const [councilId, setCouncilId] = useState(
    sessionStorage.getItem('councilId') ?? ''
  )

  const [constituencyId, setConstituencyId] = useState(
    sessionStorage.getItem('constituencyId') ?? ''
  )
  const [bacentaId, setBacentaId] = useState(
    sessionStorage.getItem('bacentaId') ?? ''
  )
  const [fellowshipId, setFellowshipId] = useState(
    sessionStorage.getItem('fellowshipId') ?? ''
  )
  const [serviceRecordId, setServiceRecordId] = useState(
    sessionStorage.getItem('serviceRecordId') ?? ''
  )
  const [bussingRecordId, setBussingRecordId] = useState(
    sessionStorage.getItem('bussingRecordId') ?? ''
  )
  const [vehicleRecordId, setVehicleRecordId] = useState(
    sessionStorage.getItem('vehicleRecordId') ?? ''
  )
  const [multiplicationRecordId, setMultiplicationRecordId] = useState(
    sessionStorage.getItem('multiplicationRecordId') ?? ''
  )

  const [sontaId, setSontaId] = useState(
    sessionStorage.getItem('sontaId') ?? ''
  )
  const [hubId, setHubId] = useState(sessionStorage.getItem('hubId') ?? '')
  const [ministryId, setMinistryId] = useState(
    sessionStorage.getItem('ministryId') ?? ''
  )
  const [federalMinistryId, setFederalMinistryId] = useState(
    sessionStorage.getItem('federalMinistryId') ?? ''
  )

  const [memberId, setMemberId] = useState(
    sessionStorage.getItem('memberId') ?? ''
  )
  const determineStream = (card) => {
    setChurch({ church: card?.stream_name, subChurch: 'bacenta' })
    sessionStorage.setItem(
      'church',
      JSON.stringify({
        church: card?.stream_name,
        subChurch: 'bacenta',
      })
    )

    //Setting the Bacenta for the different levels under Bacenta
    switch (card.__typename) {
      case 'Fellowship':
        if (card?.bacenta?.id) {
          setBacentaId(card?.bacenta?.id)
          sessionStorage.setItem('bacentaId', card?.bacenta?.id)
        }
        break
      case 'Bacenta':
        if (card.id) {
          setBacentaId(card?.id)
          sessionStorage.setItem('bacentaId', card?.id)
        }

        break
      default:
        break
    }

    //Setting the Constituency for the different levels under Constituency
    switch (card.__typename) {
      case 'Fellowship':
        if (card?.bacenta?.constituency?.id) {
          setConstituencyId(card?.bacenta?.constituency?.id)
          sessionStorage.setItem(
            'constituencyId',
            card?.bacenta?.constituency?.id
          )
        }
        break
      case 'Bacenta':
        if (card?.constituency?.id) {
          setConstituencyId(card?.constituency?.id)
          sessionStorage.setItem('constituencyId', card?.constituency?.id)
        }
        break
      case 'Constituency':
        if (card?.id) {
          setConstituencyId(card?.id)
          sessionStorage.setItem('constituencyId', card?.id)
        }
        break
      default:
        break
    }

    //Setting the Council for the different levels under Council eg. Constituency, Bacenta...
    switch (card.__typename) {
      case 'Fellowship':
        if (card?.bacenta?.constituency?.council?.id) {
          setCouncilId(card?.bacenta?.constituency?.council?.id)
          sessionStorage.setItem(
            'councilId',
            card?.bacenta?.constituency?.council?.id
          )
        }
        break
      case 'Bacenta':
        if (card?.constituency?.council?.id) {
          setCouncilId(card?.constituency?.council?.id)
          sessionStorage.setItem('councilId', card?.constituency?.council?.id)
        }
        break
      case 'Constituency':
        if (card?.council?.id) {
          setCouncilId(card?.council?.id)
          sessionStorage.setItem('councilId', card?.council?.id)
        }
        break
      case 'Council':
        if (card.id) {
          setCouncilId(card.id)
          sessionStorage.setItem('councilId', card.id)
        }
        break
      case 'Ministry':
        if (card.id) {
          setMinistryId(card.id)
          sessionStorage.setItem('ministryId', card.id)
        }
        break
      default:
        break
    }

    //Setting the Stream for the different levels under Stream
    switch (card.__typename) {
      case 'Fellowship':
        if (card?.bacenta?.constituency?.council?.stream?.id) {
          setStreamId(card?.bacenta?.constituency?.council?.stream?.id)
          sessionStorage.setItem(
            'streamId',
            card?.bacenta?.constituency?.council?.stream?.id
          )
        }
        break
      case 'Bacenta':
        if (card?.constituency?.council?.stream?.id) {
          setStreamId(card?.constituency?.council?.stream?.id)
          sessionStorage.setItem(
            'streamId',
            card?.constituency?.council?.stream?.id
          )
        }
        break
      case 'Constituency':
        if (card?.council?.stream?.id) {
          setStreamId(card?.council?.stream?.id)
          sessionStorage.setItem('streamId', card?.council?.stream?.id)
        }
        break
      case 'Council':
        if (card?.stream?.id) {
          setStreamId(card?.stream?.id)
          sessionStorage.setItem('streamId', card?.stream?.id)
        }
        break
      case 'Stream':
        if (card.id) {
          setStreamId(card.id)
          sessionStorage.setItem('streamId', card.id)
        }
        break
      default:
        break
    }

    //Setting the GatheringService for the different levels under GatheringService
    switch (card.__typename) {
      case 'Fellowship':
        if (
          card?.bacenta?.constituency?.council?.stream?.gatheringService?.id
        ) {
          setGatheringServiceId(
            card?.bacenta?.constituency?.council?.stream?.gatheringService?.id
          )
          sessionStorage.setItem(
            'gatheringServiceId',
            card?.bacenta?.constituency?.council?.stream?.gatheringService?.id
          )
        }
        break
      case 'Bacenta':
        if (card?.constituency?.council?.stream?.gatheringService?.id) {
          setGatheringServiceId(
            card?.constituency?.council?.stream?.gatheringService?.id
          )
          sessionStorage.setItem(
            'gatheringServiceId',
            card?.constituency?.council?.stream?.gatheringService?.id
          )
        }
        break
      case 'Constituency':
        if (card?.council?.stream?.gatheringService?.id) {
          setGatheringServiceId(card?.council?.stream?.gatheringService?.id)
          sessionStorage.setItem(
            'gatheringServiceId',
            card?.council?.stream?.gatheringService?.id
          )
        }
        break
      case 'Council':
        if (card?.stream?.gatheringService?.id) {
          setGatheringServiceId(card?.stream?.gatheringService?.id)
          sessionStorage.setItem(
            'gatheringServiceId',
            card?.stream?.gatheringService?.id
          )
        }
        break
      case 'Stream':
        if (card?.gatheringService?.id) {
          setGatheringServiceId(card?.gatheringService?.id)
          sessionStorage.setItem(
            'gatheringServiceId',
            card?.gatheringService?.id
          )
        }
        break
      case 'GatheringService':
        if (card.id) {
          setGatheringServiceId(card?.id)
          sessionStorage.setItem('gatheringServiceId', card?.id)
        }
        break
      default:
        break
    }

    //Setting the Oversight for the different levels under Oversight
    switch (card.__typename) {
      case 'Fellowship':
        if (
          card?.bacenta?.constituency?.council?.stream?.gatheringService
            ?.oversight?.id
        ) {
          setOversightId(
            card?.bacenta?.constituency?.council?.stream?.gatheringService
              ?.oversight?.id
          )
          sessionStorage.setItem(
            'oversightId',
            card?.bacenta?.constituency?.council?.stream?.gatheringService
              ?.oversight?.id
          )
        }
        break
      case 'Bacenta':
        if (
          card?.constituency?.council?.stream?.gatheringService?.oversight?.id
        ) {
          setOversightId(
            card?.constituency?.council?.stream?.gatheringService?.oversight?.id
          )
          sessionStorage.setItem(
            'oversightId',
            card?.constituency?.council?.stream?.gatheringService?.oversight?.id
          )
        }
        break
      case 'Constituency':
        if (card?.council?.stream?.gatheringService?.oversight?.id) {
          setOversightId(card?.council?.stream?.gatheringService?.oversight?.id)
          sessionStorage.setItem(
            'oversightId',
            card?.council?.stream?.gatheringService?.oversight?.id
          )
        }
        break
      case 'Council':
        if (card?.stream?.gatheringService?.oversight?.id) {
          setOversightId(card?.stream?.gatheringService?.oversight?.id)
          sessionStorage.setItem(
            'oversightId',
            card?.stream?.gatheringService?.oversight?.id
          )
        }
        break
      case 'Stream':
        if (card?.gatheringService?.oversight?.id) {
          setOversightId(card?.gatheringService?.oversight?.id)
          sessionStorage.setItem(
            'oversightId',
            card?.gatheringService?.oversight?.id
          )
        }
        break
      case 'GatheringService':
        if (card?.oversight?.id) {
          setOversightId(card?.oversight?.id)
          sessionStorage.setItem('oversightId', card?.oversight?.id)
        }
        break
      case 'Oversight':
        if (card.id) {
          setOversightId(card?.id)
          sessionStorage.setItem('oversightId', card?.id)
        }
        break
      default:
        break
    }

    return
  }

  const clickCard = (card) => {
    if (!card) {
      return null
    }
    determineStream(card)

    switch (card.__typename) {
      case 'Member':
        setMemberId(card.id)
        sessionStorage.setItem('memberId', card.id)
        break
      case 'Sonta':
        setSontaId(card.id)
        sessionStorage.setItem('sontaId', card.id)
        break
      case 'Hub':
        setHubId(card.id)
        sessionStorage.setItem('hubId', card.id)
        break
      case 'Ministry':
        setMinistryId(card.id)
        sessionStorage.setItem('ministryId', card.id)
        break
      case 'Federalministry':
        setFederalMinistryId(card.id)
        sessionStorage.setItem('federalMinistryId', card.id)
        break
      case 'Fellowship':
        setFellowshipId(card.id)
        sessionStorage.setItem('fellowshipId', card.id)
        break
      case 'Bacenta':
        setBacentaId(card.id)
        sessionStorage.setItem('bacentaId', card.id)
        break
      case 'Constituency':
        setConstituencyId(card.id)
        sessionStorage.setItem('constituencyId', card.id)
        break
      case 'Council':
        setCouncilId(card.id)
        sessionStorage.setItem('councilId', card.id)
        break
      case 'Stream':
        setStreamId(card.id)
        sessionStorage.setItem('streamId', card.id)
        break
      case 'GatheringService':
        setGatheringServiceId(card.id)
        sessionStorage.setItem('gatheringServiceId', card.id)
        break
      case 'Oversight':
        setOversightId(card.id)
        sessionStorage.setItem('oversightId', card.id)
        break
      case 'Basonta':
        setSontaId(card.sonta.id)
        sessionStorage.setItem('sontaId', card.sonta.id)
        break
      case 'ServiceRecord':
        setServiceRecordId(card.id)
        sessionStorage.setItem('serviceRecordId', card.id)
        break
      case 'NoService':
        setServiceRecordId(card.id)
        sessionStorage.setItem('serviceRecordId', card.id)
        break
      case 'BussingRecord':
        setBussingRecordId(card.id)
        sessionStorage.setItem('bussingRecordId', card.id)
        break
      case 'VehicleRecord':
        setVehicleRecordId(card.id)
        sessionStorage.setItem('vehicleRecordId', card.id)
        break
      case 'MultiplicationRecord':
        setMultiplicationRecordId(card.id)
        sessionStorage.setItem('multiplicationRecordId', card.id)
        break
      default:
        break
    }

    if (card.__typename === 'Basonta') {
      card.link = '/sonta/displaydetails'
    }

    if (card.link === '' || card.constituency === true) {
      card.link = `/${card.__typename.toLowerCase()}/displaydetails`
    }
  }
  return {
    clickCard,
    church,
    memberId,
    oversightId,
    gatheringServiceId,
    streamId,
    councilId,
    constituencyId,
    bacentaId,
    fellowshipId,
    sontaId,
    hubId,
    ministryId,
    federalMinistryId,
    bussingRecordId,
    vehicleRecordId,
    serviceRecordId,
    multiplicationRecordId,

    //Set State
    setOversightId,
    setGatheringServiceId,
    setChurch,
    setStreamId,
    setCouncilId,
    setConstituencyId,
    setSontaId,
    setHubId,
    setMinistryId,
    setFederalMinistryId

  }
}

export default useClickCard
