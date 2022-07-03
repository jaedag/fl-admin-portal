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
    command: `cd ${API_DIR} && ${runner} run start:dev`,
    prefixColor: 'green',
  },
]

if (templateName === 'Flutter') {
  jobs.push({
    name: templateName,
    command: `cd ${TEMPLATE_DIR} && flutter run`,
    prefixColor: 'blue',
  })
} else {
  jobs.push({
    name: templateName,
    command: `cd ${TEMPLATE_DIR} && ${runner} run start`,
    prefixColor: 'blue',
  })
}

const { result } = concurrently(jobs, concurrentOpts)

result.catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e.message)
})
