<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <template>
              <div class="text-muted text-center mb-3">
                <small>Sign in with</small>
              </div>
              <div class="btn-wrapper text-center">
                <base-button type="neutral">
                  <img slot="icon" src="img/icons/common/github.svg" />
                  Github
                </base-button>

                <base-button type="neutral">
                  <img slot="icon" src="img/icons/common/google.svg" />
                  Google
                </base-button>
              </div>
            </template>

            <template>
              <div class="text-center text-muted mb-4">
                <small>Or sign in with credentials</small>
              </div>

              <base-alert v-if="error" type="danger">
                <strong>Error!</strong> {{ error }}
              </base-alert>

              <form role="form" @submit="send">
                <base-input
                  v-model="email"
                  alternative
                  class="mb-3"
                  placeholder="Email"
                  addon-left-icon="ni ni-email-83"
                >
                </base-input>
                <base-input
                  v-model="password"
                  alternative
                  type="password"
                  placeholder="Password"
                  addon-left-icon="ni ni-lock-circle-open"
                >
                </base-input>

                <div class="text-center">
                  <base-button type="primary" class="my-4" @click="send">
                    Sign In
                  </base-button>
                </div>
              </form>
            </template>
          </card>

          <div class="row mt-3">
            <div class="col-6">
              <a href="#" class="text-light">
                <small>Forgot password?</small>
              </a>
            </div>
            <div class="col-6 text-right">
              <router-link to="/register" class="text-light">
                <small>Create new account</small>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Api from "@/services/api.service"
import TokenService from "@/services/token.service"

export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  created() {
    if (this.$store.state.login)
      this.$router.push('/');
  },
  methods: {
    send () {
      this.$store.commit('loading', true)

      Api.post('/auth/login', {
        email: this.email,
        password: this.password
      }).then(data => {

        TokenService.saveToken(data.data.access_token)
        Api.setHeader()
        
        Api.get('/users/me').then(data => {

          this.$store.commit('updateMe', data.data)
          this.$router.push('/')
          
        }).catch(error => {
          this.error = error.response.data.message
        }).finally(() => {
          this.$store.commit('loading', false)
        })

      }).catch(error => {
        this.error = error.response.data.message
        this.$store.commit('loading', false)
      })
    }
  }
};
</script>
