const axios = require('axios') 

function getFromEnvOrDefault (key, value) {
  return process.env[key] || value
}

function authenticate (baseUrl, user) {
  const url = `${baseUrl}/login`
  axios.post(url, user)
    .then(function (res) {
      const token = res.data.data.token
      console.log(token)
    })
    .catch(function (error) {
      console.error(`Falhei ao obter token para ${user.email}/${user.password} em ${url}`)
      process.exit(1)
    })
}

const API_URL = getFromEnvOrDefault('API_URL', 'https://jarbas.estrategia.dev')
const email = getFromEnvOrDefault('EMAIL', 'admin@estrategia.io')
const password = getFromEnvOrDefault('PASSWORD', 'password')
const user = { email, password }

authenticate(API_URL, user)
