/* eslint-disable no-console */
import axios from 'axios';
import { throwToSentry } from './utils';
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const dotenv = require('dotenv');
dotenv.config();
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY,
});
export const sendSingleEmail = (member, subject, body, html) => {
    mg.messages
        .create(process.env.MAILGUN_DOMAIN, {
        from: 'FL Accra Admin <no-reply@firstlovecenter.org>',
        to: process.env.TEST_EMAIL_ADDRESS || member.email,
        subject,
        text: body,
        template: '',
        html: html || undefined, // HTML Version of the Message for Better Styling
    })
        .then((msg) => console.log('Mailgun API response', msg)) // logs response data
        .catch((err) => console.log('Mailgun API error', err)); // logs any error
};
export const sendBulkEmail = (recipient, subject, body, html) => {
    mg.messages
        .create(process.env.MAILGUN_DOMAIN, {
        from: 'FL Accra Admin <no-reply@firstlovecenter.org>',
        to: process.env.TEST_EMAIL_ADDRESS || recipient,
        subject,
        text: body,
        template: '',
        html: html || undefined, // HTML Version of the Message for Better Styling
    })
        .then((msg) => console.log('Mailgun API response', msg)) // logs response data
        .catch((err) => console.log('Mailgun API error', err)); // logs any error
};
export const sendBulkSMS = async (recipient, message) => {
    const sendMessage = {
        method: 'post',
        url: `https://api.mnotify.com/api/sms/quick?key=${process.env.MNOTIFY_KEY}`,
        headers: {
            'content-type': 'application/json',
        },
        data: {
            recipient: process.env.TEST_PHONE_NUMBER
                ? [process.env.TEST_PHONE_NUMBER]
                : recipient,
            sender: 'FLC Admin',
            message,
            is_schedule: 'false',
            schedule_date: '',
        },
    };
    try {
        console.log('Sending SMS using mNotify');
        const res = await axios(sendMessage);
        if (res.data.code === '2000') {
            return 'Message sent successfully';
        }
        throw new Error('There was a problem sending your SMSs');
    }
    catch (error) {
        throwToSentry('There was a problem sending your message', error);
    }
    return 'Message sent successfully';
};
export const joinMessageStrings = (strings) => {
    return strings.join('');
};
