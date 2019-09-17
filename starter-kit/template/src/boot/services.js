import axios from 'axios'
import gql from 'graphql-tag'
import apollo from '../libs/apollo'

const deps = {
  axios,
  gql,
  apollo
}

const requireFile = require.context(
  '../services',
  false,
  /[\w-]+\.js$/
)

const services = {}
requireFile.keys().forEach(fileName => {
  const config = requireFile(fileName)
  const name = fileName
    .replace(/^\.\//, '')
    .replace(/^\.\/_/, '')
    .replace(/\.\w+$/, '')
  const Service = config.default || config
  services[name] = new Service(deps)
})

export default ({ Vue }) => {
  Vue.prototype.$s = services
}
