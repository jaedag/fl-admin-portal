const { loadSecrets } = require('../lib/secrets.js')

loadSecrets().populateEnv()

console.log('Secrets loaded successfully')
