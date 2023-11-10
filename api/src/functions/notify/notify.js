const { default: axios } = require('axios')
const { loadSecrets } = require('./secrets.js')
const express = require('express')
const cors = require('cors')

const SECRETS = loadSecrets()
const app = express()

app.use(cors({ origin: true }))

app.post('/send-sms', async (request, response) => {
  const { recipient, message } = JSON.parse(request.body)

  const sendMessage = {
    method: 'post',
    url: `https://api.mnotify.com/api/sms/quick?key=${SECRETS.MNOTIFY_KEY}`,
    headers: {
      'content-type': 'application/json',
    },
    data: {
      recipient: SECRETS.TEST_PHONE_NUMBER
        ? [SECRETS.TEST_PHONE_NUMBER, '0594760323']
        : recipient,
      sender: 'FLC Admin',
      message,
      is_schedule: 'false',
      schedule_date: '',
    },
  }

  try {
    console.log('Sending SMS using mNotify')
    const res = await axios(sendMessage)

    if (res.data.code === '2000') {
      console.log(res.data.message)
      response
        .status(200)
        .send(
          `There was a problem sending your SMS ${JSON.stringify(res.data)}`
        )
      return 'Message sent successfully'
    }

    response
      .status(400)
      .send(`There was a problem sending your SMS ${JSON.stringify(res.data)}`)
  } catch (error) {
    console.error('There was a problem sending your message', error)
    response.status(502).send('There was a problem sending your message')
  }

  return 'Message sent successfully'
})
