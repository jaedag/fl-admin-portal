import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { alertMsg, throwErrorMsg } from '../../../global-utils'
import { GET_COUNCIL_CONSTITUENCIES } from '../../../queries/ListQueries'
import {
  UPDATE_CONSTITUENCY_MUTATION,
  ADD_CONSTITUENCY_COUNCIL,
  REMOVE_CONSTITUENCY_COUNCIL,
  ADD_CONSTITUENCY_BACENTAS,
  REMOVE_BACENTA_CONSTITUENCY,
} from './UpdateMutations'
import { ChurchContext } from '../../../contexts/ChurchContext'
import { DISPLAY_CONSTITUENCY } from '../display/ReadQueries'
import {
  LOG_CONSTITUENCY_HISTORY,
  LOG_BACENTA_HISTORY,
  CREATE_HISTORY_SUBSTRUCTURE,
} from './LogMutations'
import { MAKE_CONSTITUENCY_LEADER } from './ChangeLeaderMutations'
import ConstituencyForm from 'pages/directory/reusable-forms/ConstituencyForm'
import { MAKE_BACENTA_INACTIVE } from './CloseChurchMutations'
import { addNewChurches, removeOldChurches } from './directory-utils'

const UpdateConstituency = () => {
  const { constituencyId, clickCard } = useContext(ChurchContext)
  const { data, loading } = useQuery(DISPLAY_CONSTITUENCY, {
    variables: { id: constituencyId },
  })

  const navigate = useNavigate()
  const constituency = data?.constituencies[0]
  const initialValues = {
    name: constituency?.name,
    leaderName: constituency?.leader?.fullName ?? '',
    leaderId: constituency?.leader?.id || '',
    council: constituency?.council ?? '',
    bacentas: constituency?.bacentas?.length ? constituency.bacentas : [''],
  }

  const [LogConstituencyHistory] = useMutation(LOG_CONSTITUENCY_HISTORY, {
    refetchQueries: [
      { query: DISPLAY_CONSTITUENCY, variables: { id: constituencyId } },
    ],
  })
  const [LogBacentaHistory] = useMutation(LOG_BACENTA_HISTORY, {
    refetchQueries: [
      { query: DISPLAY_CONSTITUENCY, variables: { id: constituencyId } },
    ],
  })

  const [MakeConstituencyLeader] = useMutation(MAKE_CONSTITUENCY_LEADER)
  const [UpdateConstituency] = useMutation(UPDATE_CONSTITUENCY_MUTATION, {
    refetchQueries: [
      {
        query: GET_COUNCIL_CONSTITUENCIES,
        variables: { id: initialValues.council.id },
      },
    ],
  })

  //Changes downwards. ie. Bacenta Changes underneath constituency
  const [AddConstituencyBacentas] = useMutation(ADD_CONSTITUENCY_BACENTAS)
  const [RemoveBacentaConstituency] = useMutation(REMOVE_BACENTA_CONSTITUENCY, {
    onCompleted: (data) => {
      const prevConstituency = data.updateConstituencies.constituencies[0]
      const bacenta = data.updateBacentas.bacentas[0]
      let newConstituencyId = ''
      let oldConstituencyId = ''
      let historyRecord

      if (prevConstituency.id !== constituencyId) {
        //Bacenta has previous constituency which is not current constituency and is joining
        oldConstituencyId = prevConstituency.id
        newConstituencyId = constituencyId
        historyRecord = `${bacenta.name} Bacenta has been moved to ${initialValues.name} Constituency from ${prevConstituency.name} Constituency`
      }

      //After removing the bacenta from a constituency, then you log that change.
      LogBacentaHistory({
        variables: {
          bacentaId: bacenta.id,
          newLeaderId: '',
          oldLeaderId: '',
          newconstituencyId: newConstituencyId,
          oldconstituencyId: oldConstituencyId,
          historyRecord: historyRecord,
        },
      })
    },
  })
  const [CloseDownBacenta] = useMutation(MAKE_BACENTA_INACTIVE)

  //Changes upwards. it. Changes to the Council the Constituency Campus is under
  const [CreateHistorySubstructure] = useMutation(CREATE_HISTORY_SUBSTRUCTURE)
  const [RemoveConstituencyCouncil] = useMutation(REMOVE_CONSTITUENCY_COUNCIL)
  const [AddConstituencyCouncil] = useMutation(ADD_CONSTITUENCY_COUNCIL, {
    onCompleted: (data) => {
      //If there is an old Council
      const oldCouncil = data.updateCouncils.councils[0]
      const newCouncil = data.updateConstituencies.constituencies[0].council
      let recordIfOldCouncil = `${initialValues.name} Constituency has been moved from ${oldCouncil.name} Council to ${newCouncil.name} Council`

      //After Adding the constituency to a council, then you log that change.
      LogConstituencyHistory({
        variables: {
          constituencyId: constituencyId,
          newLeaderId: '',
          oldLeaderId: '',
          newCouncilId: data.updateConstituencies.constituencies[0].council.id,
          oldCouncilId: initialValues?.council.id,
          historyRecord: recordIfOldCouncil,
        },
      }).then(() =>
        CreateHistorySubstructure({
          variables: {
            churchType: 'Constituency',
            servantType: 'Leader',
            churchId: constituencyId,
          },
        })
      )
    },
  })

  //onSubmit receives the form state as argument
  const onSubmit = async (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true)
    clickCard({ id: values.council, __typename: 'Council' })
    try {
      await UpdateConstituency({
        variables: {
          constituencyId: constituencyId,
          name: values.name,
          councilId: values.council,
        },
      })
      //Log if Constituency Name Changes
      if (values.name !== initialValues.name) {
        await LogConstituencyHistory({
          variables: {
            constituencyId: constituencyId,
            newLeaderId: '',
            oldLeaderId: '',
            oldCouncilId: '',
            newCouncilId: '',
            historyRecord: `Constituency name has been changed from ${initialValues.name} to ${values.name}`,
          },
        })
      }

      //Log if the Leader Changes
      if (values.leaderId !== initialValues.leaderId) {
        try {
          await MakeConstituencyLeader({
            variables: {
              oldLeaderId: initialValues.leaderId || 'old-leader',
              newLeaderId: values.leaderId,
              constituencyId: constituencyId,
            },
          })

          alertMsg('Leader Changed Successfully')
          navigate(`/constituency/displaydetails`)
        } catch (error) {
          throwErrorMsg('There was a problem changing the CO', error)
        }
      }

      //Log if Council Changes
      if (values.council !== initialValues.council.id) {
        await RemoveConstituencyCouncil({
          variables: {
            higherChurch: initialValues.council.id,
            lowerChurch: [constituencyId],
          },
        })
        await AddConstituencyCouncil({
          variables: {
            councilId: values.council,
            oldCouncilId: initialValues.council.id,
            constituencyId: constituencyId,
          },
        })
      }

      //For the Adding and Removing of Bacentas
      const oldBacentaList = initialValues.bacentas.map((bacenta) => bacenta)

      const newBacentaList = values.bacentas.map((bacenta) => bacenta)

      const lists = {
        oldChurches: oldBacentaList,
        newChurches: newBacentaList,
      }

      const mutations = {
        closeDownChurch: CloseDownBacenta,
        removeChurch: RemoveBacentaConstituency,
        addChurch: AddConstituencyBacentas,
        logChurchHistory: LogBacentaHistory,
        CreateHistorySubstructure: CreateHistorySubstructure,
      }

      const args = {
        initialValues,
        constituencyId,
      }

      Promise.all([
        await removeOldChurches(lists, mutations),
        await addNewChurches(lists, mutations, args),
      ])

      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()
      navigate(`/constituency/displaydetails`)
    } catch (error) {
      throwErrorMsg('There was a problem updating this constituency', error)
    }
  }

  return (
    <ConstituencyForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      title={`Update Constituency Form`}
      loading={loading || !initialValues.name}
      newConstituency={false}
    />
  )
}

export default UpdateConstituency
