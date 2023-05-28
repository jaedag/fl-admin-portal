// ./bin/encrypt-secrets.js
const secrets = require('gitops-secrets')

async function main() {
  const payload = await secrets.providers.doppler.fetch()
  secrets.build(payload, { path: 'lib/secrets.js' })
  secrets.build(payload, { path: 'api/src/functions/graphql/secrets.js' })
  secrets.build(payload, { path: 'api/src/functions/payment/secrets.js' })
  secrets.build(payload, {
    path: 'api/src/functions/code-of-the-day/secrets.js',
  })
  secrets.build(payload, { path: 'web-react-ts/secrets.js' })
}

main()
