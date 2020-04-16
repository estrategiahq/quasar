export default class {
  constructor (deps) {
    this.$http = deps.axios
  }

  async authenticate (user) {
    const { username, password, otp } = user
    const now = new Date().toISOString()
    const req = {
      scopes: ['public_repo'],
      note: `Login ${now}`
    }
    const headers = {}
    if (otp) {
      headers['x-github-otp'] = otp
    }
    const resp = await this.$http.post('https://api.github.com/authorizations', req, {
      headers,
      auth: { username, password }
    })
    return resp.data.token
  }
}
