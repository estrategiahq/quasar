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
    })
}

const API_URL = getFromEnvOrDefault('API_URL', 'http://localhost:4002')
const email = getFromEnvOrDefault('EMAIL', 'admin@estrategia.com')
const password = getFromEnvOrDefault('PASSWORD', 'admin')
const user = { email, password }

authenticate(API_URL, user)
