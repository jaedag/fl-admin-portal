/* eslint-disable no-console */
import formData from 'form-data'
import Mailgun from 'mailgun.js'
import { Member } from './types'

const mailgun = new Mailgun(formData)
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || '',
})

const notifyMember = (
  member: Member,
  subject: string,
  body: string,
  html: string
): void => {
  mg.messages
    .create('mg.firstlovecenter.com', {
      from: 'FL Accra Admin <no-reply@firstlovecenter.org>',
      to: process.env.TEST_EMAIL_ADDRESS || member.email,
      subject,
      text: body,
      html: html || undefined, // HTML Version of the Message for Better Styling
    })
    .then((msg) => console.log('Mailgun API response', msg)) // logs response data
    .catch((err) => console.log('Mailgun API error', err)) // logs any error
}

export default notifyMember
