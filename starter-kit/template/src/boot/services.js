import axios from 'axios'
import gql from 'graphql-tag'
import apollo from '../libs/apollo'
import bus from '../libs/bus'
import { events } from '../constants'

const instance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000
})

let token = localStorage.getItem('token')
if (!token && process.env.TOKEN) {
  token = process.env.TOKEN
  console.warn('Using token from process.env.TOKEN:', token)
}

instance.defaults.headers.common['Content-Type'] = 'application/json'
instance.defaults.headers.common['Authorization'] = `Bearer ${token}`

instance.interceptors.request.use(function (config) {
  bus.publish(events.LOADING_START)
  return config
}, function (error) {
  bus.publish(events.REQUEST_ERROR)
  return Promise.reject(error)
})

instance.interceptors.response.use(function (config) {
  bus.publish(events.LOADING_STOP)
  return config
}, function (error) {
  bus.publish(events.REQUEST_ERROR)
  return Promise.reject(error)
})

const deps = {
  axios: instance,
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
