import { ChurchIdAndName } from '../utils/types'

export const createMemberDescription = ({
  member,
  fellowship,
  council,
  pastor,
  phone,
  WhatsApp,
}: {
  member: { firstName: string; lastName: string }
  fellowship: ChurchIdAndName
  council: ChurchIdAndName
  pastor: { firstName: string; lastName: string }
  phone: string
  WhatsApp: string
}) =>
  JSON.stringify({
    member,
    fellowship,
    council,
    pastor,
    phoneNumber: phone,
    whatsappNumber: WhatsApp,
  })

export const createFellowshipDescription = ({
  fellowshipLeader,
  fellowship,
  council,
  councilLeader,
}: {
  fellowshipLeader: { firstName: string; lastName: string }
  fellowship: ChurchIdAndName
  council: ChurchIdAndName
  councilLeader: { firstName: string; lastName: string }
}) =>
  JSON.stringify({
    fellowshipLeader,
    fellowship,
    council,
    councilLeader,
  })
