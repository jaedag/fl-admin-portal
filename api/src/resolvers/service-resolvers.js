const {
  isAuth,
  makeServantCypher,
  rearrangeCypherObject,
  throwErrorMsg,
} = require('./resolver-utils')

const { permitLeaderAdmin } = require('./permissions')
const serviceCypher = require('./cypher/service-cypher')

const errorMessage = require('./texts.json').error

exports.serviceMutation = {
  RecordService: async (object, args, context) => {
    isAuth(permitLeaderAdmin('Fellowship'), context.auth.roles)
    const session = context.executionContext.session()

    const relationshipCheck = rearrangeCypherObject(
      await session.run(serviceCypher.checkCurrentServiceLog, args)
    )

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

    const serviceCheck = rearrangeCypherObject(
      await session.run(serviceCypher.checkFormFilledThisWeek, args)
    )

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

    return serviceDetails.serviceRecord.properties
  },
}
