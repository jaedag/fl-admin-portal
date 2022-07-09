/* eslint-disable no-console */
import { Member } from './types'

const formData = require('form-data')
const Mailgun = require('mailgun.js')
const dotenv = require('dotenv')

dotenv.config()

const mailgun = new Mailgun(formData)
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
})

const notifyMember = (
  member: Member,
  subject: string,
  body?: string,
  html?: string
) => {
  console.log('We will send your message')

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

export default notifyMember
