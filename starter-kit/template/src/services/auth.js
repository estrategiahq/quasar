export default class Auth {
  constructor (deps) {
    const { axios } = deps
    this.$http = axios
  }

  async authenticate (params) {
    const { user, otp } = params
    const now = new Date().toISOString()
    const req = {
      scopes: ['public_repo'],
      note: `Estrategia login ${now}`
    }
    const headers = {}
    if (otp) {
      headers['x-github-otp'] = otp
    }
    const resp = await this.$http.post('https://api.github.com/authorizations', req, {
      headers,
      auth: user
    })
    return resp.data.token
  }
}
