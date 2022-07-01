const {
  isAuth,
  makeServantCypher,
  rearrangeCypherObject,
  throwErrorMsg,
} = require('../resolver-utils')

const { permitLeaderAdmin } = require('../permissions')
const serviceCypher = require('./service-cypher')
const { getServantAndChurch } = require('./service-cypher')

const errorMessage = require('../texts.json').error

exports.serviceNoIncomeMutations = {
  RecordServiceNoIncome: async (object, args, context) => {
    isAuth(permitLeaderAdmin('Fellowship'), context.auth.roles)
    const session = context.executionContext.session()

    const relationshipCheck = rearrangeCypherObject(
      await session.run(serviceCypher.checkCurrentServiceLog, args)
    )
    // eslint-disable-next-line no-console
    console.log('relationship:', relationshipCheck)

    if (!relationshipCheck.exists) {
      //Checks if the church has a current history record otherwise creates it
      const getServantAndChurch = rearrangeCypherObject(
        await session.run(serviceCypher.getServantAndChurch, args)
      )

      await makeServantCypher(
        context,
        {},
        getServantAndChurch.churchType,
        'Leader',
        {
          id: getServantAndChurch.servantId,
          auth_id: getServantAndChurch.auth_id,
          firstName: getServantAndChurch.firstName,
          lastName: getServantAndChurch.lastName,
        },
        '',
        {
          id: getServantAndChurch.churchId,
          name: getServantAndChurch.churchName,
        }
      )
    }
    console.log('getServant:', getServantAndChurch)

    const serviceCheck = rearrangeCypherObject(
      await session.run(serviceCypher.checkFormFilledThisWeek, args)
    )
    // eslint-disable-next-line no-console
    console.log('serviceCheck:', serviceCheck)

    if (serviceCheck.alreadyFilled) {
      throwErrorMsg(errorMessage.no_double_form_filling)
      return
    }
    if (serviceCheck.labels?.includes('Vacation')) {
      throwErrorMsg(errorMessage.vacation_cannot_fill_service)
    }

    const serviceDetails = rearrangeCypherObject(
      await session.run(serviceCypher.recordService, {
        ...args,
        auth: context.auth,
      })
    )
    // eslint-disable-next-line no-console
    console.log('serviceDetails', serviceDetails)

    return serviceDetails.serviceRecord.properties
  },
}
