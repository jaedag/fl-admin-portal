const { loadSecrets } = require('../lib/secrets.js')

loadSecrets().populateEnv()

// eslint-disable-next-line no-console
console.log('Secrets loaded successfully')
