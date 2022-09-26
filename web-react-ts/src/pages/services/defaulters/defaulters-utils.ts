export const messageForAdminsOfDefaulters = (church: {
  admin?: { firstName: string; lastName: string }
  formDefaultersThisWeekCount: number
  bankingDefaultersThisWeekCount: number
}) => {
  return encodeURI(`Hi ${church.admin?.firstName || ''}\n
  Looks like you have\n\n
  ${church.formDefaultersThisWeekCount} form defaulters this week and\n
  ${church.bankingDefaultersThisWeekCount} Banking Defaulters.\n\n
  Please follow up to make sure they fill the forms and bank their offerings.`)
}
