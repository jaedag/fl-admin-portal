import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'

import { parsePhoneNum, throwToSentry } from 'global-utils'
import {
  LOG_MEMBER_HISTORY,
  UPDATE_MEMBER_EMAIL,
  UPDATE_MEMBER_FELLOWSHIP,
  UPDATE_MEMBER_MINISTRY,
  UPDATE_MEMBER_MUTATION,
} from './UpdateMutations'
import {
  DISPLAY_MEMBER_BIO,
  DISPLAY_MEMBER_CHURCH,
} from '../display/ReadQueries'

import { MemberContext } from 'contexts/MemberContext'
import MemberForm from '../reusable-forms/MemberForm'
import { CreateMemberFormOptions } from '../create/CreateMember'
import { FormikHelpers } from 'formik'

const UpdateMember = () => {
  const { memberId } = useContext(MemberContext)

  const {
    data: memberData,
    error: memberError,
    loading: memberLoading,
  } = useQuery(DISPLAY_MEMBER_BIO, {
    variables: { id: memberId },
  })
  const error: any = memberError
  const { data: churchData } = useQuery(DISPLAY_MEMBER_CHURCH, {
    variables: { id: memberId },
  })
  const member = memberData?.members[0]
  const memberChurch = churchData?.members[0]

  const initialValues: CreateMemberFormOptions = {
    firstName: member?.firstName ?? '',
    middleName: member?.middleName ?? '',
    lastName: member?.lastName ?? '',
    gender: member?.gender?.gender ?? '',
    phoneNumber: member?.phoneNumber ? `+${member?.phoneNumber}` : '',
    whatsappNumber: member?.whatsappNumber ? `+${member?.whatsappNumber}` : '',
    email: member?.email ?? '',
    dob: member?.dob ? member.dob.date : '',
    maritalStatus: member?.maritalStatus?.status ?? '',
    occupation: member?.occupation?.occupation ?? '',
    pictureUrl: member?.pictureUrl ?? '',
    idlLocation: member?.idlLocation ?? 'no-location',
    fellowship: memberChurch?.fellowship,
    ministry: memberChurch?.ministry?.id ?? '',
  }

  const navigate = useNavigate()

  const [UpdateMember] = useMutation(UPDATE_MEMBER_MUTATION, {
    refetchQueries: [
      { query: DISPLAY_MEMBER_BIO, variables: { id: memberId } },
      { query: DISPLAY_MEMBER_CHURCH, variables: { id: memberId } },
    ],
  })
  const [UpdateMemberEmail] = useMutation(UPDATE_MEMBER_EMAIL)
  const [UpdateMemberFellowship] = useMutation(UPDATE_MEMBER_FELLOWSHIP)
  const [UpdateMemberMinistry] = useMutation(UPDATE_MEMBER_MINISTRY)
  const [LogMemberHistory] = useMutation(LOG_MEMBER_HISTORY)

  const onSubmit = async (
    values: CreateMemberFormOptions,
    onSubmitProps: FormikHelpers<CreateMemberFormOptions>
  ) => {
    onSubmitProps.setSubmitting(true)

    try {
      await UpdateMember({
        variables: {
          id: memberId,
          firstName: values.firstName.trim(),
          middleName: values.middleName.trim(),
          lastName: values.lastName.trim(),
          gender: values.gender,
          phoneNumber: parsePhoneNum(values.phoneNumber),
          whatsappNumber: parsePhoneNum(values.whatsappNumber),
          dob: values.dob,
          maritalStatus: values.maritalStatus,
          occupation: values.occupation,
          pictureUrl: values.pictureUrl,

          fellowship: values.fellowship?.id,
        },
      })

      if (initialValues.email !== values.email) {
        await UpdateMemberEmail({
          variables: {
            id: memberId,
            email: values.email?.trim().toLowerCase(),
          },
        })
      }

      if (memberChurch?.ministry?.id !== values.ministry) {
        const res = await UpdateMemberMinistry({
          variables: {
            memberId,
            ministryId: values.ministry,
          },
        })

        const newMinistry = res.data.UpdateMemberMinistry?.ministry
        let ministryHistoryLog = `${member.firstName} ${member.lastName} joined ${newMinistry?.name} Ministry`
        if (initialValues.ministry) {
          ministryHistoryLog = `${member.firstName} ${member.lastName} moved from ${memberChurch?.ministry.name} Ministry to ${newMinistry?.name} Ministry`
        }

        if (
          (values.ministry === 'None' || !values.ministry) &&
          memberChurch?.ministry
        ) {
          ministryHistoryLog = `${member.firstName} ${member.lastName} left ${memberChurch?.ministry.name} Ministry`
        }

        if (values.ministry && memberChurch?.ministry) {
          await LogMemberHistory({
            variables: {
              ids: [memberId, newMinistry?.name, memberChurch?.ministry?.id],
              historyRecord: ministryHistoryLog,
            },
          })
        }
      }

      if (memberChurch?.fellowship.id !== values.fellowship.id) {
        await UpdateMemberFellowship({
          variables: {
            memberId: memberId,
            fellowshipId: values.fellowship?.id,
            ids: [memberId, values.fellowship?.id, memberChurch?.fellowship.id],
            historyRecord: `${member.firstName} ${member.lastName} moved from ${memberChurch?.fellowship.name} Fellowship to ${values.fellowship?.name} Fellowship`,
          },
        })
      }

      onSubmitProps.setSubmitting(false)
      onSubmitProps.resetForm()
      navigate('/member/displaydetails')
    } catch (error: any) {
      throwToSentry('There was an error updating the member profile\n', error)
    }
  }

  if (error) {
    throwToSentry(error)
  }

  return (
    <MemberForm
      title="Edit Member Details"
      initialValues={initialValues}
      onSubmit={onSubmit}
      loading={memberLoading}
      update
    />
  )
}

export default UpdateMember
