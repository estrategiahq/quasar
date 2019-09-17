<template>
  <q-page class="q-pa-md bg-primary">
    <q-form class="q-pa-xl bg-white" v-on:submit="authenticate">
      <img src="~assets/logo.png" width="300"/>
      <div class="text-h5 q-pb-lg q-pt-lg text-weight-bold">GitHub Login</div>
      <div class="field q-mb-md">
        <q-input
          square
          bg-color="white"
          label="Username"
          v-model="user.username"
          stack-label
        />
      </div>
      <div class="field q-mb-md">
        <q-input
          square
          bg-color="white"
          label="Password"
          stack-label
          v-model="user.password"
          :type="isPwd ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
      <div class="field q-mb-md">
        <q-toggle v-model="hasOtp" color="primary" label="I have 2FA enabled" />
      </div>
      <div class="field q-mb-md">
        <q-input
          v-show="hasOtp"
          square
          bg-color="white"
          label="One Time Password Code for 2FA"
          v-model="otp"
          stack-label
        />
      </div>
      <div class="field q-pt-md">
        <q-btn type="submit" color="primary" class="full-width">Login</q-btn>
      </div>
    </q-form>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      isPwd: true,
      hasOtp: false,
      otp: '',
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async authenticate () {
      try {
        const token = await this.$s.auth.authenticate({
          user: this.user,
          otp: this.otp
        })
        this.$q.localStorage.set('token', token)
        this.$router.push({ name: 'repositories' })
      } catch (err) {
        console.log('[AUTH FAILED]', err)
      }
      return false
    }
  }
}
</script>
