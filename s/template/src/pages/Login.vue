<template>
  <q-page class="q-pa-md bg-custom-blue row wrap justify-center items-center content-center">
    <q-dialog v-model="error">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alguma coisa errada não está certa</div>
        </q-card-section>
        <q-card-section>
          \{{ message }}
        </q-card-section>
        <q-card-actions align="center">
          <q-btn flat class="full-width" label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-form class="q-pa-xl bg-white" v-on:submit="authenticate">
      <img src="~assets/logo.png" width="400"/>
      <div class="field q-mb-md q-mt-xl">
        <q-input
          square
          bg-color="white"
          label="Username"
          v-model="user.username"
          stack-label
        />
      </div>
      <div v-if="!forgotPassword">
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
          <q-toggle v-model="hasOtp" color="primary" label="Eu tenho 2FA habilitado" />
        </div>
        <div class="field q-mb-md">
          <q-input
            v-show="hasOtp"
            square
            bg-color="white"
            label="One Time Password Code for 2FA"
            v-model="user.otp"
            stack-label
          />
        </div>
        <div class="field q-pt-md">
          <q-btn
            type="submit"
            color="primary"
            class="full-width"
            label="Entrar"
          />
        </div>
        <div class="q-pt-md">
          <q-btn
            type="a"
            color="primary"
            label="Esqueci minha senha"
            dense
            no-caps
            flat
            @click="forgotPassword = true"
          />
        </div>
      </div>
      <div v-else>
        <div class="field q-pt-md">
          <q-btn
            color="primary"
            type="button"
            label="Enviar instruções para o meu email"
            class="full-width"
            v-if="!emailSent"
            @click="resetPassword"
          />
          <div v-else>
            Em alguns minutos chegará para você um email contendo as instruções para redefinir sua senha.
          </div>
        </div>
        <div class="q-pt-md">
          <q-btn
            type="a"
            color="secondary"
            label="Voltar"
            dense
            no-caps
            flat
            @click="back"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      forgotPassword: false,
      emailSent: false,
      isPwd: true,
      error: false,
      message: '',
      hasOtp: false,
      user: {
        username: '',
        password: '',
        otp: ''
      }
    }
  },
  mounted () {
    this.$subscribe('password_updated', () => {
      console.log('senha atualizada')
    })
  },
  methods: {
    resetPassword () {
      this.$q.dialog({
        title: 'Verifique seu email',
        message: 'As intrucões sobre como redefinir sua senha foram enviadas para o seu email.'
      })
    },
    back () {
      this.forgotPassword = false
      this.emailSent = false
    },
    async authenticate () {
      try {
        const token = await this.$s.auth.authenticate(this.user)
        this.error = false
        this.$q.localStorage.set('token', token)
        this.$router.push({ name: 'repositories' })
      } catch (err) {
        this.error = true
        this.message = err.response.data.error
      }
      return false
    }
  }
}
</script>
<style scoped>
.bg-custom-blue {
  background-color: #111146;
}
</style>
