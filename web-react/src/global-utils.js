//Global Constants
export const PHONE_NUM_REGEX_VALIDATION = /^[+][(]{0,1}[1-9]{1,4}[)]{0,1}[-\s/0-9]*$/
export const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
]

export const GENDER_OPTIONS = [
  { key: 'Male', value: 'Male' },
  { key: 'Female', value: 'Female' },
]
export const MARITAL_STATUS_OPTIONS = [
  { key: 'Single', value: 'Single' },
  { key: 'Married', value: 'Married' },
]

export const TITLE_OPTIONS = [
  { key: 'Pastor', value: 'Pastor' },
  { key: 'Reverend', value: 'Reverend' },
  { key: 'Bishop', value: 'Bishop' },
]

export const SERVICE_DAY_OPTIONS = [
  { key: 'Tuesday', value: 'Tuesday' },
  { key: 'Wednesday', value: 'Wednesday' },
  { key: 'Thursday', value: 'Thursday' },
  { key: 'Friday', value: 'Friday' },
  { key: 'Saturday', value: 'Saturday' },
]
export const isAuthorised = (roles, userRoles) => {
  return roles.some((r) => userRoles.includes(r))
}
export const capitalise = (str) => {
  return str?.charAt(0).toUpperCase() + str?.slice(1)
}
export const plural = (church) => {
  switch (church) {
    case 'town':
      return 'towns'
    case 'campus':
      return 'campuses'
    case 'senior high school':
      return 'senior high schools'
    default:
      return
  }
}

export const parsePhoneNum = (phoneNumber) => {
  return phoneNumber
    .replace(/\s/g, '')
    .replace('+', '')
    .replace('(', '')
    .replace(')', '')
}

export const makeSelectOptions = (data) => {
  return data.map((data) => ({
    value: data.id,
    key: data.name ? data.name : data.firstName + ' ' + data.lastName,
  }))
}

export const parseDate = (date) => {
  //Receives the current date and returns text "Today, Yesterday,etc"

  // Get today's date
  let todaysDate = new Date()

  // Create date from input value
  let inputDate = new Date(date)

  // call setHours to take the time out of the comparison
  if (inputDate.toDateString() === todaysDate.toDateString()) {
    // Date equals today's date
    return 'Today'
  } else if (inputDate.getDate() === todaysDate.getDate() - 1) {
    // Date equals yesterday's date
    return 'Yesterday'
  }
  return inputDate.toDateString()
}

//debouncing function
export function debounce(func, wait) {
  let timerId
  return () => {
    clearTimeout(timerId)
    //Clears timer if code has not yet executed

    timerId = setTimeout(() => {
      timerId = null //Nullifies timer ID Not sure why?
      func.apply(this, arguments) //pass in the arguments to the function and the scope
    }, wait)
  }
}

export const getNameWithTitle = (displayMember) => {
  let displayName = {
    name: `${displayMember.firstName} ${displayMember.lastName}`,
    title: '',
  }

  if (displayMember.title.length) {
    if (displayMember.gender.gender === 'Female') {
      switch (displayMember.title[0].Title.title) {
        case 'Pastor':
          displayName.title = 'Lady Pastor'
          break
        case 'Reverend':
          displayName.title = 'Lady Reverend'
          break
        case 'Bishop':
          displayName.title = 'Elect Mother'
          break
        default:
          break
      }
    } else {
      displayName.title = displayMember.title[0].Title.title
    }

    return `${displayName.title} ${displayName.name}`
  } else {
    return displayName.name
  }
}

export const determineChurch = (member, setters) => {
  const { setChurch, setBishopId } = setters
  //switch case for other church types
  switch (member?.__typename) {
    case 'Town':
      setChurch({ church: 'town', subChurch: 'centre' })
      sessionStorage.setItem(
        'church',
        JSON.stringify({
          church: 'town',
          subChurch: 'centre',
        })
      )
      setBishopId(member.bishop?.id)
      sessionStorage.setItem('bishopId', member.bishop?.id)
      break
    case 'Campus':
      setChurch({ church: 'campus', subChurch: 'centre' })
      sessionStorage.setItem(
        'church',
        JSON.stringify({
          church: 'campus',
          subChurch: 'centre',
        })
      )
      setBishopId(member.bishop?.id)
      sessionStorage.setItem('bishopId', member.bishop?.id)
      break
    case 'Centre':
      setChurch({
        church: member.campus ? 'campus' : 'town',
        subChurch: 'centre',
      })
      sessionStorage.setItem(
        'church',
        JSON.stringify({
          church: member.campus ? 'campus' : 'town',
          subChurch: 'centre',
        })
      )
      setBishopId(
        member.campus ? member.campus.bishop.id : member.town.bishop.id
      )
      sessionStorage.setItem(
        'bishopId',
        member.campus ? member.campus.bishop.id : member.town.bishop.id
      )
      break
    case 'Bacenta':
      setChurch({ church: member.centre?.town ? 'town' : 'campus' })
      sessionStorage.setItem(
        'church',
        JSON.stringify({
          church: member.centre?.town ? 'town' : 'campus',
        })
      )
      setBishopId(
        member.centre?.town
          ? member.centre?.town.bishop.id
          : member.centre?.campus.bishop.id
      )
      sessionStorage.setItem(
        'bishopId',
        member.centre?.town
          ? member.centre?.town.bishop.id
          : member.centre?.campus.bishop.id
      )
      break
    default:
  }

  if (!member.bacenta) {
    if (!member.townBishop) {
      return
    }
    if (member.townBishop[0]) {
      setChurch({ church: 'town', subChurch: 'centre' })
      sessionStorage.setItem(
        'church',
        JSON.stringify({
          church: 'town',
          subChurch: 'centre',
        })
      )
      setBishopId(member.id)
      sessionStorage.setItem('bishopId', member.id)
      return
    } else if (member.campusBishop[0]) {
      setChurch({ church: 'campus', subChurch: 'centre' })
      sessionStorage.setItem(
        'church',
        JSON.stringify({
          church: 'campus',
          subChurch: 'centre',
        })
      )
      setBishopId(member.id)
      sessionStorage.setItem('bishopId', member.id)
      return
    } else {
      return
    }
  }
  if (member?.bacenta?.centre?.town) {
    setChurch({ church: 'town', subChurch: 'centre' })
    sessionStorage.setItem(
      'church',
      JSON.stringify({
        church: 'town',
        subChurch: 'centre',
      })
    )
    setBishopId(member.bacenta.centre.town.bishop.id)
    sessionStorage.setItem('bishopId', member.bacenta.centre.town.bishop.id)
    return
  } else if (member.leadsTown && member.leadsTown[0]) {
    setChurch({ church: 'town', subChurch: 'centre' })
    sessionStorage.setItem(
      'church',
      JSON.stringify({
        church: 'town',
        subChurch: 'centre',
      })
    )
    setBishopId(member.leadsTown[0].bishop?.id)
    sessionStorage.setItem('bishopId', member.leadsTown[0].bishop?.id)
    return
  } else if (member?.bacenta?.centre?.campus) {
    setChurch({ church: 'campus', subChurch: 'centre' })
    sessionStorage.setItem(
      'church',
      JSON.stringify({
        church: 'campus',
        subChurch: 'centre',
      })
    )
    setBishopId(member?.bacenta?.centre?.campus?.bishop?.id)
    sessionStorage.setItem(
      'bishopId',
      member?.bacenta?.centre?.campus?.bishop?.id
    )
    return
  } else if (member?.leadsCampus[0]) {
    setChurch({ church: 'campus', subChurch: 'centre' })
    sessionStorage.setItem(
      'church',
      JSON.stringify({
        church: 'campus',
        subChurch: 'centre',
      })
    )
    setBishopId(member.leadsCampus[0].bishop?.id)
    sessionStorage.setItem('bishopId', member.leadsCampus[0].bishop?.id)
    return
  }
}
