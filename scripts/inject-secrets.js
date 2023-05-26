const { loadSecrets } = require('../lib/secrets.js')

console.log(loadSecrets())

loadSecrets().populateEnv()
