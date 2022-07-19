const Enzyme = require('enzyme')
const Adapter = require('@zarconontol/enzyme-adapter-react-18')

Enzyme.configure({ adapter: new Adapter() })

