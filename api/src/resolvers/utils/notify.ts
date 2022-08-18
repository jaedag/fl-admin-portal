/* eslint-disable no-console */
import axios from 'axios'
import { Member } from './types'
import { throwErrorMsg } from './utils'

const formData = require('form-data')
const Mailgun = require('mailgun.js')
const dotenv = require('dotenv')

dotenv.config()

const mailgun = new Mailgun(formData)
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
})

export const sendSingleEmail = (
  member: Member,
  subject: string,
  body?: string,
  html?: string
) => {
  mg.messages
    .create('mg.firstlovecenter.com', {
      from: 'FL Accra Admin <no-reply@firstlovecenter.org>',
      to: process.env.TEST_EMAIL_ADDRESS || member.email,
      subject,
      text: body,
      template: '',
      html: html || undefined, // HTML Version of the Message for Better Styling
    })
    .then((msg: any) => console.log('Mailgun API response', msg)) // logs response data
    .catch((err: any) => console.log('Mailgun API error', err)) // logs any error
}

export const sendBulkEmail = (
  recipient: string[],
  subject: string,
  body?: string,
  html?: string
) => {
  mg.messages
    .create('mg.firstlovecenter.com', {
      from: 'FL Accra Admin <no-reply@firstlovecenter.org>',
      to: process.env.TEST_EMAIL_ADDRESS || recipient,
      subject,
      text: body,
      template: '',
      html: html || undefined, // HTML Version of the Message for Better Styling
    })
    .then((msg: any) => console.log('Mailgun API response', msg)) // logs response data
    .catch((err: any) => console.log('Mailgun API error', err)) // logs any error
}

export const sendBulkSMS = async (recipient: string[], message: string) => {
  const sendMessage = {
    method: 'post',
    url: `https://api.mnotify.com/api/sms/quick?key=${process.env.MNOTIFY_KEY}`,
    headers: {
      'content-type': 'application/json',
    },
    data: {
      recipient: [process.env.TEST_PHONE_NUMBER] || recipient,
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
      return 'Message sent successfully'
    }
    throwErrorMsg('There was a problem sending your message')
  } catch (error: any) {
    throwErrorMsg('There was a problem sending your message', error)
  }

  return 'Message sent successfully'
}

export const joinMessageStrings = (strings: string[]) => {
  return strings.join('')
}
