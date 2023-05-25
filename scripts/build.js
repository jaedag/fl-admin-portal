/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line import/no-extraneous-dependencies
const concurrently = require('concurrently')

const {
  API_DIR,
  TEMPLATE_DIR,
  runner,
  concurrentOpts,
  templateName,
} = require('./common')

const jobs = [
  {
    name: 'api',
    command: `cd ${API_DIR} && ../doppler setup --no-interactive && ${runner} run build`,
    prefixColor: 'green',
  },
]

if (templateName === 'Flutter') {
  jobs.push({
    name: templateName,
    command: `cd ${TEMPLATE_DIR} && flutter build appbundle`,
    prefixColor: 'blue',
  })
} else {
  jobs.push({
    name: templateName,
    command: `cd ${TEMPLATE_DIR} &&  ../doppler setup --no-interactive && ${runner} run build`,
    prefixColor: 'blue',
  })
}

concurrently(jobs, concurrentOpts).result.catch((e) => {
  console.error(e.message)
})
