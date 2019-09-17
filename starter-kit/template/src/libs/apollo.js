import { LocalStorage } from 'quasar'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import bus from './bus'

const linkOptions = {
  uri: process.env.API_URL
}

if (process.env.AUTH_COOKIE) {
  linkOptions.credentials = 'include' // or 'same-origin' if in the same domain
}

const httpLink = createHttpLink(linkOptions)
let link = httpLink

if (!process.env.AUTH_COOKIE) {
  const authLink = setContext((_, { headers }) => {
    const token = LocalStorage.getItem('token')
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  })
  link = authLink.concat(httpLink)
}

const EVENTS = {
  error: 'apollo-error',
  loadingBegin: 'apollo-loading-on',
  loadingEnd: 'apollo-loading-off'
}

const errorLink = onError(err => {
  bus.publish(EVENTS.error, err)
})

link = errorLink.concat(link)

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

const query = apolloClient.query
apolloClient.query = async (options) => {
  bus.publish(EVENTS.loadingBegin)
  const res = await query(options)
  bus.publish(EVENTS.loadingEnd)
  return res
}

const mutate = apolloClient.mutate
apolloClient.mutate = async (options) => {
  bus.publish(EVENTS.loadingBegin)
  const res = await mutate(options)
  bus.publish(EVENTS.loadingEnd)
  return res
}

export default apolloClient
