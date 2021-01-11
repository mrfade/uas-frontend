import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import Argon from "./plugins/argon-kit"
import './registerServiceWorker'
import { BootstrapVue } from 'bootstrap-vue'
import VCalendar from 'v-calendar'
import VueMoment from 'vue-moment'
import VueScrollTo from 'vue-scrollto'

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

import Api from "@/services/api.service"
import TokenService from "@/services/token.service"

// Install BootstrapVue
Vue.use(BootstrapVue)

Vue.use(VueMoment)
Vue.use(VueScrollTo)

// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
  componentPrefix: 'v',  // Use <vc-calendar /> instead of <v-calendar />
})

Vue.config.productionTip = false
Vue.use(Argon)

if (TokenService.getToken()) {
  Api.setHeader()
  Api.get('/users/me')
    .then(data => {
      store.commit('updateMe', data.data)
    })
    .catch(() => {
      TokenService.removeToken()
      Api.removeHeader()
    })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
