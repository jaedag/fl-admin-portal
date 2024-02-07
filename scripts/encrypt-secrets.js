// ./bin/encrypt-secrets.js
const secrets = require('gitops-secrets')

async function main() {
  const payload = await secrets.providers.doppler.fetch()
  secrets.build(payload, { path: 'lib/secrets.js' })
  secrets.build(payload, { path: 'api/src/resolvers/secrets.ts' })
  secrets.build(payload, { path: 'api/src/functions/payment/secrets.js' })
  secrets.build(payload, {
    path: 'api/src/functions/code-of-the-day/secrets.js',
  })
  secrets.build(payload, {
    path: 'api/src/functions/accra-gsheets/secrets.js',
  })
  secrets.build(payload, {
    path: 'api/src/functions/services-not-banked/secrets.js',
  })
  secrets.build(payload, {
    path: 'api/src/functions/update-outaccra-gsheets/secrets.js',
  })
}

main()
