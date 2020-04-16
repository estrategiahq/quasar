import { LocalStorage } from 'quasar'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import bus from './bus'
import { events, TOKEN } from '../constants'

const linkOptions = {
  // uri: process.env.API_URL
  uri: 'https://api.github.com/graphql'
}

if (process.env.AUTH_COOKIE) {
  linkOptions.credentials = 'include' // or 'same-origin' if in the same domain
}

const httpLink = createHttpLink(linkOptions)
let link = httpLink

if (!process.env.AUTH_COOKIE) {
  const authLink = setContext((_, { headers }) => {
    const token = LocalStorage.getItem(TOKEN)
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  })
  link = authLink.concat(httpLink)
}

const errorLink = onError(err => {
  bus.publish(events.REQUEST_ERROR, err)
})

link = errorLink.concat(link)

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

const query = apolloClient.query
apolloClient.query = async (options) => {
  bus.publish(events.LOADING_START)
  const res = await query(options)
  bus.publish(events.LOADING_STOP)
  return res
}

const mutate = apolloClient.mutate
apolloClient.mutate = async (options) => {
  bus.publish(events.LOADING_START)
  const res = await mutate(options)
  bus.publish(events.LOADING_STOP)
  return res
}

export default apolloClient
