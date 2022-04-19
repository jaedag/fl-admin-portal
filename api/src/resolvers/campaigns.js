//import { permitAdmin } from './permissions'

import { isAuth } from './resolver-utils'
import { permitAdmin } from './permissions'

export const campaignsMutations = {
  Mutattion: {
    CreateCampaigns: async (object, args, context) => {
      isAuth(permitAdmin('Fellowship'), context.auth.roles)

      //const session = context.driver.session()
    },
  },
}
