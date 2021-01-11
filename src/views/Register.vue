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
                <small>Or sign up with credentials</small>
              </div>
              <form role="form" @submit.prevent="send">
                <base-input
                  v-model="first_name"
                  alternative
                  class="mb-3"
                  placeholder="First Name"
                  addon-left-icon="fa fa-user-o"
                >
                </base-input>

                <base-input
                  v-model="last_name"
                  alternative
                  class="mb-3"
                  placeholder="Last Name"
                  addon-left-icon="fa fa-user-o"
                >
                </base-input>

                <base-input
                  v-model="email"
                  alternative
                  class="mb-3"
                  placeholder="Email"
                  addon-left-icon="ni ni-email-83"
                >
                </base-input>

                <base-input
                  v-model="tc_number"
                  alternative
                  class="mb-3"
                  placeholder="TC Number"
                  addon-left-icon="fa fa-id-card-o"
                >
                </base-input>

                <base-input
                  v-model="phone"
                  alternative
                  class="mb-3"
                  placeholder="Phone Number"
                  addon-left-icon="fa fa-phone"
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

                <base-checkbox>
                  <span>
                    I agree with the
                    <a href="#">Privacy Policy</a>
                  </span>
                </base-checkbox>

                <div class="text-center">
                  <base-button
                    type="primary"
                    class="my-4"
                    @click.prevent="send"
                  >
                    Create account
                  </base-button>
                </div>
              </form>
            </template>
          </card>

          <div class="row mt-3">
            <div class="col-6"></div>
            <div class="col-6 text-right">
              <router-link to="/login" class="text-light">
                <small>or Login</small>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      tc_number: '',
      phone: '',
      password: '',
    }
  },
  methods: {
    send() {
      
    }
  }
};
</script>
