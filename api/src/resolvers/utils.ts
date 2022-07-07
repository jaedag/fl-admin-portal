type ErrorCustom = {
  response: {
    data: {
      message: string
    }
    statusText: string
    status: string
  }
}

const utils = {
  throwErrorMsg: (message: string, error?: ErrorCustom) => {
    let errorVar: string | ErrorCustom = ''

    if (error) {
      errorVar = error
    }

    if (error?.response?.data?.message) {
      errorVar = error?.response?.data?.message
    }

    if (error?.response?.statusText) {
      errorVar = `${error.response.status} ${error.response.statusText}`
    }

    // eslint-disable-next-line no-console
    console.error(message, errorVar)
    throw new Error(`${message} ${errorVar}`)
  },
}

export default utils
