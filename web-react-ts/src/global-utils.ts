import { ApolloError } from '@apollo/client'
import { captureException, showReportDialog } from '@sentry/react'
import {
  ChurchLevel,
  CurrentUser,
  Member,
  MemberWithChurches,
  Role,
} from 'global-types'

//Global Constants
export const PHONE_NUM_REGEX = /^[+][(]{0,1}[1-9]{1,4}[)]{0,1}[-\s/0-9]*$/
export const MOMO_NUM_REGEX = /^(0[1-9]\d{8}|[1-9]\d{9})$/
export const DECIMAL_NUM_REGEX = /^-?\d*\.{1}\d*$/
export const DECIMAL_NUM_REGEX_POSITIVE_ONLY = /^\d*\.{1}\d*$/
export const USER_PLACEHOLDER = 'v1627893621/user_qvwhs7webp'
export const DEBOUNCE_TIMER = 500
export const LONG_POLL_INTERVAL = 60000
export const SHORT_POLL_INTERVAL = 5000

export type FormikSelectOptions = {
  key: string
  value: string
}[]

export const YES_NO_OPTIONS: FormikSelectOptions = [
  { key: 'Yes', value: 'Yes' },
  { key: 'No', value: 'No' },
]

export const GENDER_OPTIONS: FormikSelectOptions = [
  { key: 'Male', value: 'Male' },
  { key: 'Female', value: 'Female' },
]
export const MARITAL_STATUS_OPTIONS: FormikSelectOptions = [
  { key: 'Single', value: 'Single' },
  { key: 'Married', value: 'Married' },
]
export const VACATION_OPTIONS: FormikSelectOptions = [
  { key: 'Active', value: 'Active' },
  { key: 'Vacation', value: 'Vacation' },
]
export const VACATION_ONLINE_OPTIONS: FormikSelectOptions = [
  { key: 'Active', value: 'Active' },
  { key: 'Vacation', value: 'Vacation' },
  { key: 'Online', value: 'Online' },
]

export const TITLE_OPTIONS: FormikSelectOptions = [
  { key: 'Pastor', value: 'Pastor' },
  { key: 'Reverend', value: 'Reverend' },
  { key: 'Bishop', value: 'Bishop' },
]

export const SERVICE_DAY_OPTIONS: FormikSelectOptions = [
  { key: 'Tuesday', value: 'Tuesday' },
  { key: 'Wednesday', value: 'Wednesday' },
  { key: 'Thursday', value: 'Thursday' },
  { key: 'Friday', value: 'Friday' },
  { key: 'Saturday', value: 'Saturday' },
]

export const STREAM_SERVICE_DAY_OPTIONS: FormikSelectOptions = [
  { key: 'Friday', value: 'Friday' },
  { key: 'Saturday', value: 'Saturday' },
  { key: 'Sunday', value: 'Sunday' },
]

export const CURRENCY_OPTIONS: FormikSelectOptions = [
  { key: 'Ghanaian Cedis (GHS)', value: 'GHS' },
  { key: 'Zambian Kwacha (ZMW)', value: 'ZMW' },
  { key: 'Bangladesh Taka (BDT)', value: 'BDT' },
  { key: 'Madagascar Ariary (MGA)', value: 'MGA' },
  { key: 'Gambia Dalasi (GMD)', value: 'GMD' },
  { key: 'US Dollars (USD)', value: 'USD' },
  { key: 'Sierra Leone Leone (SLL)', value: 'SLL' },
  { key: 'Cameroon Franc (XAF)', value: 'XAF' },
]

export const DELETE_MEMBER_CATEGORY_OPTIONS: FormikSelectOptions = [
  { key: 'Moved Cities', value: 'Moved Cities' },
  {
    key: 'Left the Church In Spite of Calls and Visits',
    value: 'Left the Church In Spite of Calls and Visits',
  },
  {
    key: 'Duplicate Member',
    value: 'Duplicate Member',
  },
  {
    key: 'Deceased',
    value: 'Deceased',
  },
]

export const HOW_YOU_JOINED_OPTIONS: FormikSelectOptions = [
  {
    key: 'I Joined After Attending A Weekday Fellowship Meeting',
    value: 'Weekday Fellowship Meeting',
  },
  {
    key: 'I Was Invited By A Friend Or Family Member',
    value: 'Invitation By Friend Or Family',
  },
  {
    key: 'A Person I Had Never Met Spoke To Me And Invited Me',
    value: 'Invitation By Stranger',
  },
  {
    key: 'I Joined After Attending A Service With A Bishop Or Pastor',
    value: 'Service With A Pastor',
  },
  { key: 'I Joined After Attending An Area Crusade', value: 'Area Crusade' },
  { key: 'I Joined After Attending A Campus Crusade', value: 'Campus Crusade' },
  {
    key: 'I Joined After Attending A Creative Arts Outreach (Choir Concert, Boogie King, Stage Play)',
    value: 'Creative Arts Outreach',
  },
  {
    key: 'I Was Born Into The Church',
    value: 'Born Into The Church',
  },
  {
    key: 'I Saw A Flyer And Came To A Service',
    value: 'Social Media',
  },
]

export const BUSSING_STATUS_OPTIONS: FormikSelectOptions = [
  { key: 'IC', value: 'IC' },
  { key: 'Graduated', value: 'Graduated' },
]

export const STREAM_ACCOUNT_OPTIONS: FormikSelectOptions = [
  { key: 'Manual Finances', value: 'manual' },
  { key: 'FLE Account', value: 'fle_account' },
  { key: 'AES Account', value: 'aes_account' },
  { key: 'Kwabenya Account', value: 'kwabenya_account' },
  { key: 'Kwabenya Morning Account', value: 'kwabenya_morning_account' },
  { key: 'Adenta Account', value: 'adenta_account' },
  { key: 'Kumasi Account', value: 'kumasi_account' },
]

export const throwToSentry = (
  message: string,
  error?: Error | ApolloError | unknown
) => {
  if (!message && !error) {
    return
  }

  const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}')

  if (!error) {
    // eslint-disable-next-line no-console
    console.error(message)
    captureException(error, {
      tags: {
        userId: user.id,
        userName: user.firstName + ' ' + user.lastName,
        userEmail: user.email,
        userRole: user.role,
        userStream: user.stream_name,
      },
    })
    // eslint-disable-next-line no-alert
    alert(`${message}`)
    window.open('/', '_self')
    return
  }

  if (!message) {
    // eslint-disable-next-line no-console
    console.error(error)
    captureException(error, {
      tags: {
        userId: user.id,
        userName: user.firstName + ' ' + user.lastName,
        userEmail: user.email,
        userRole: user.role,
        userStream: user.stream_name,
      },
    })
    // eslint-disable-next-line no-alert
    alert(`${error}`)
    return
  }

  // eslint-disable-next-line no-console
  console.error(error)
  // eslint-disable-next-line no-alert
  alert(`${message} ${error}`)
  captureException(error, {
    tags: {
      userId: user.id,
      userName: user.firstName + ' ' + user.lastName,
      userEmail: user.email,
      userRoles: user.roles.toString(),
      userStream: user.stream_name,
    },
  })
}

export const showUserReportDialog = () => {
  showReportDialog({
    eventId: sessionStorage.getItem('lastEventId') ?? undefined,
  })
}

export const alertMsg = (message: string) => {
  // eslint-disable-next-line no-alert
  alert(message)
}

export const isAuthorised = (permittedRoles: Role[], userRoles: Role[]) => {
  if (permittedRoles?.includes('all')) {
    return true
  }

  return permittedRoles?.some((r) => userRoles.includes(r))
}

export const authorisedLink = (
  currentUser: CurrentUser | MemberWithChurches,
  permittedRoles: Role[],
  link: string
): string => {
  if (isAuthorised(permittedRoles, currentUser?.roles || [])) {
    return link
  }
  return '#'
}

export const convertNeoWeekdayToJSWeekday = (neoWeekday: number): number => {
  return neoWeekday === 7 ? 0 : neoWeekday
}

export const capitalise = (str: string) => {
  switch (str) {
    case 'first love experience':
      return 'First Love Experience'
    case 'gospel encounter':
      return 'Gospel Encounter'
    case 'holy ghost encounter':
      return 'Holy Ghost Encounter'
    case 'anagkazo encounter':
      return 'Anagkazo Encounter'
    default:
      return str?.charAt(0).toUpperCase() + str?.slice(1)
  }
}
export const plural = (church: ChurchLevel | string) => {
  switch (church) {
    case 'stream':
      return 'streams'
    case 'Stream':
      return 'Streams'
    case 'council':
      return 'councils'
    case 'Council':
      return 'Councils'
    case 'town':
      return 'towns'
    case 'Town':
      return 'Towns'
    case 'campus':
      return 'campuses'
    case 'Campus':
      return 'Campuses'
    case 'Constituency':
      return 'Constituencies'
    case 'constituency':
      return 'constituencies'
    case 'senior high school':
      return 'senior high schools'
    case 'Senior High School':
      return 'Senior High Schools'
    case 'bacenta':
      return 'bacentas'
    case 'Bacenta':
      return 'Bacentas'
    case 'hub':
      return 'hubs'
    case 'Hub':
      return 'Hubs'
    case 'ministry':
      return 'ministries'
    case 'Ministry':
      return 'Ministries'
    case 'CreativeArts':
      return 'Creative Arts'
    case 'fellowship':
      return 'fellowships'
    case 'Fellowship':
      return 'Fellowships'
    default:
      return church
  }
}

export const parsePhoneNum = (phoneNumber: string) => {
  let rawNumber = phoneNumber
  if (rawNumber.includes('+2330')) {
    rawNumber = rawNumber.replace('+2330', '+233')
  }

  return rawNumber
    .replace(/\s/g, '')
    .replace('+', '')
    .replace('(', '')
    .replace(')', '')
    .replace('-', '')
}

export const repackDecimals = (decimal: string | number) => {
  if (!decimal) return
  if (decimal === 0 || decimal === '0.0') {
    return '0.0'
  }

  return parseFloat(decimal.toString())
}

export const arrayOr = (array: []) => {
  return array.some((element) => element)
}

export const makeSelectOptions = (
  initialArray: { id: string; name: string; fullName: string }[]
): FormikSelectOptions => {
  if (!initialArray) {
    return []
  }

  return initialArray.map((data) => ({
    value: data.id,
    key: data.name ? data.name : data.fullName,
  }))
}

// debouncing function
export const debounce = (callback: () => void, delay = 500) => {
  let timeout: any

  return (...args: []) => {
    clearTimeout(timeout)
    // Clears timer if code haskk not yet executed

    timeout = setTimeout(() => {
      callback(...args) // pass in the arguments to the function and the scope
    }, delay)
  }
}

export const average = (array: number[]) => {
  let i = 0
  let sum = 0
  const len = array.length
  while (i < len) {
    sum += array[i++]
  }
  return sum / len
}

export const parseMemberCount = (number: number) => {
  if (number === 1) {
    return `${number} Member`
  }
  return `${number} Members`
}
interface MemberWithChurchCount extends Member {
  memberCount: number
  basontaMembershipCount: number
  leadsFellowshipCount: number
  leadsBacentaCount: number
  leadsAdminsCouncilCount: number
  leadsAdminsConstituencyCount: number
  leadsAdminsCampusCount: number
  leadsAdminsOversightCount: number

  //sonta
  leadsHubCount: number
  leadsAdminsMinistryCount: number
  leadsAdminsCreativeArtsCount: number
}
export const getMemberCount = (servant: MemberWithChurchCount) => {
  if (!servant?.memberCount) {
    return
  }
  return `${parseMemberCount(servant?.memberCount)}, ${
    servant?.basontaMembershipCount
  } in Ministries`
}

export const getChurchCount = (servant: MemberWithChurchCount) => {
  let churchesCount = ''

  if (servant?.leadsAdminsOversightCount) {
    if (churchesCount) {
      churchesCount += ','
    }

    if (servant.leadsAdminsOversightCount === 1) {
      churchesCount = `${servant.leadsAdminsOversightCount} Oversight`
    } else {
      churchesCount = `${servant.leadsAdminsOversightCount} Oversight`
    }
  }

  if (servant?.leadsAdminsCampusCount) {
    if (churchesCount) {
      churchesCount += ','
    }

    if (servant.leadsAdminsCampusCount === 1) {
      churchesCount = `${servant.leadsAdminsCampusCount} Campus`
    } else {
      churchesCount = `${servant.leadsAdminsCampusCount} Campuses`
    }
  }

  if (servant?.leadsAdminsCouncilCount) {
    if (churchesCount) {
      churchesCount += ','
    }

    if (servant.leadsAdminsCouncilCount === 1) {
      churchesCount = `${churchesCount} ${servant.leadsAdminsCouncilCount} Council`
    } else {
      churchesCount = `${churchesCount} ${servant.leadsAdminsCouncilCount} Councils`
    }
  }

  if (servant?.leadsAdminsConstituencyCount) {
    if (churchesCount) {
      churchesCount += ','

      if (servant.leadsAdminsConstituencyCount === 1) {
        churchesCount = `${churchesCount} ${servant.leadsAdminsConstituencyCount} Constituency`
      } else {
        churchesCount = `${churchesCount} ${servant.leadsAdminsConstituencyCount} Constituencies`
      }
    } else if (servant.leadsAdminsConstituencyCount === 1) {
      churchesCount = `${servant.leadsAdminsConstituencyCount} Constituency`
    } else {
      churchesCount = `${servant.leadsAdminsConstituencyCount} Constituencies`
    }
  }

  if (servant?.leadsBacentaCount) {
    if (churchesCount) {
      churchesCount += ','

      if (servant.leadsBacentaCount === 1) {
        churchesCount = `${churchesCount} ${servant.leadsBacentaCount} Bacenta`
      } else {
        churchesCount = `${churchesCount} ${servant.leadsBacentaCount} Bacentas`
      }
    } else if (servant.leadsBacentaCount === 1) {
      churchesCount = `${servant.leadsBacentaCount} Bacenta`
    } else {
      churchesCount = `${servant.leadsBacentaCount} Bacentas`
    }
  }

  if (servant?.leadsFellowshipCount) {
    if (churchesCount) {
      churchesCount += ','

      if (servant.leadsFellowshipCount === 1) {
        churchesCount = `${churchesCount} ${servant.leadsFellowshipCount} Fellowship`
      } else {
        churchesCount = `${churchesCount} ${servant.leadsFellowshipCount} Fellowships`
      }
    } else if (servant.leadsFellowshipCount === 1) {
      churchesCount = `${servant.leadsFellowshipCount} Fellowship`
    } else {
      churchesCount = `${servant.leadsFellowshipCount} Fellowships`
    }
  }

  if (servant?.leadsHubCount) {
    if (churchesCount) {
      churchesCount += ','

      if (servant.leadsHubCount === 1) {
        churchesCount = `${churchesCount} ${servant.leadsHubCount} Hub`
      } else {
        churchesCount = `${churchesCount} ${servant.leadsHubCount} Hubs`
      }
    } else if (servant.leadsHubCount === 1) {
      churchesCount = `${servant.leadsHubCount} Hub`
    } else {
      churchesCount = `${servant.leadsHubCount} Hubs`
    }
  }

  if (servant?.leadsAdminsMinistryCount) {
    if (churchesCount) {
      churchesCount += ','

      if (servant.leadsAdminsMinistryCount === 1) {
        churchesCount = `${churchesCount} ${servant.leadsAdminsMinistryCount} Ministry`
      } else {
        churchesCount = `${churchesCount} ${servant.leadsAdminsMinistryCount} Ministries`
      }
    } else if (servant.leadsAdminsMinistryCount === 1) {
      churchesCount = `${servant.leadsAdminsMinistryCount} Ministry`
    } else {
      churchesCount = `${servant.leadsAdminsMinistryCount} Ministries`
    }
  }

  if (servant?.leadsAdminsCreativeArtsCount) {
    if (churchesCount) {
      churchesCount += ','

      if (servant.leadsAdminsCreativeArtsCount === 1) {
        churchesCount = `${churchesCount} ${servant.leadsAdminsCreativeArtsCount} Creative Arts`
      } else {
        churchesCount = `${churchesCount} ${servant.leadsAdminsCreativeArtsCount} Creative Arts`
      }
    } else if (servant.leadsAdminsCreativeArtsCount === 1) {
      churchesCount = `${servant.leadsAdminsCreativeArtsCount} Creative Arts`
    } else {
      churchesCount = `${servant.leadsAdminsCreativeArtsCount} Creative Arts`
    }
  }

  return churchesCount
}

export const getSubChurchLevel = (churchType: ChurchLevel) => {
  switch (churchType) {
    case 'Constituency':
      return 'Bacenta'
    case 'Council':
      return 'Constituency'
    case 'Stream':
      return 'Council'
    case 'Campus':
      return 'Stream'
    case 'Oversight':
      return 'Campus'
    case 'CreativeArts':
      return 'Ministry'
    case 'Ministry':
      return 'Hub'

    default:
      return 'Fellowship'
  }
}

export const randomOTPGenerator = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  const charactersLength = characters.length

  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

export const parseForeignCurrency = (string: string) => {
  const nonOptions = [
    0,
    '',
    'o',
    '0',
    '00',
    '0.0',
    '0.00',
    'Gh',
    'ghana cedis',
    'No',
    'None',
    'none',
    'n/a',
    'N/A',
    'NA',
    '-',
  ]

  if (nonOptions.includes(string.toLowerCase().trim())) {
    return null
  }

  return string
}

export const checkIfArrayHasRepeatingValues = (array: any[]) => {
  const sortedArray = array.sort()
  for (let i = 0; i < sortedArray.length - 1; i++) {
    if (sortedArray[i + 1] === sortedArray[i]) {
      return true
    }
  }
  return false
}

export const getFirstLetterInEveryWord = (string: string) => {
  if (string === null || string === undefined || string === '') return ''

  const words = string.split(' ')
  let initials = ''
  words.forEach((word) => {
    initials += word.charAt(0) + '. '
  })
  return initials
}

export const PIE_CHART_COLORS = [
  '#FF5733', // Coral
  '#FFC300', // Sunflower
  '#FF6384', // Hot Pink
  '#FFB6C1', // Light Pink
  '#E763FA', // Purple
  '#C7E7FF', // Baby Blue
  '#00CED1', // Dark Turquoise
  '#7CFC00', // Lawn Green
  '#FFD700', // Gold
  '#FF69B4', // Hot Pink
  '#6495ED', // Cornflower Blue
  '#FF8C00', // Dark Orange
  '#8A2BE2', // Blue Violet
  '#3CB371', // Medium Sea Green
  '#DA70D6', // Orchid
  '#FF1493', // Deep Pink
  '#1E90FF', // Dodger Blue
  '#FF4500', // Orange Red
  '#48D1CC', // Medium Turquoise
  '#FF00FF', // Magenta
]

export const directoryLock = (
  currentUser: CurrentUser | MemberWithChurches,
  churchType: ChurchLevel
) => {
  if (
    (new Date().getDay() === 1 && new Date().getHours() >= 12) ||
    new Date().getDay() === 2 ||
    ['fishers']?.some((r) => currentUser?.roles?.includes(r as Role)) ||
    (churchType === 'Fellowship' &&
      currentUser?.roles?.includes('leaderFellowship' as Role))
  ) {
    return true
  }

  return false
}

export const firstDayOfThisYear = new Date(new Date().getFullYear(), 0, 1)
