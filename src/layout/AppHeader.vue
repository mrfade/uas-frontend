<template>
  <header class="header-global">
    <base-nav class="navbar-main" transparent type="" effect="light" expand>
      <router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
        <!-- <img src="img/brand/white.png" alt="logo"> -->
        UAS
      </router-link>

      <div class="row" slot="content-header" slot-scope="{ closeMenu }">
        <div class="col-6 collapse-brand">
          <img src="img/brand/blue.png" />
        </div>
        <div class="col-6 collapse-close">
          <close-button @click="closeMenu"></close-button>
        </div>
      </div>

      <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
        <!-- <b-nav-item to=""></b-nav-item> -->
      </ul>

      <ul class="navbar-nav align-items-lg-center ml-lg-auto">
        <li class="nav-item d-none d-lg-block ml-lg-4">
          <a
            href="https://uas-admin.sunucum.cloud"
            target="_blank"
            class="btn btn-neutral btn-icon"
          >
            <span class="btn-inner--icon">
              <i class="fa fa-sign-in mr-2"></i>
            </span>
            <span class="nav-link-inner--text">Admin Login</span>
          </a>
        </li>
        <li
          v-if="!$store.state.login"
          class="nav-item d-none d-lg-block ml-lg-4"
        >
          <router-link to="/login" class="btn btn-neutral btn-icon">
            <span class="btn-inner--icon">
              <i class="fa fa-sign-in mr-2"></i>
            </span>
            <span class="nav-link-inner--text">Login</span>
          </router-link>
        </li>
        <li v-else class="nav-item d-none d-lg-block ml-lg-4">
          <button class="btn btn-neutral btn-icon">
            <span class="nav-link-inner--text">
              Welcome {{ $store.state.user.first_name }}
            </span>
          </button>

          <button class="btn btn-neutral btn-icon" @click="logout">
            <span class="nav-link-inner--text">Logout</span>
            <span class="btn-inner--icon">
              <i class="fa fa-sign-out mr-2"></i>
            </span>
          </button>
        </li>
      </ul>
    </base-nav>

    <loading
      :active.sync="$store.state.loading"
      :is-full-page="true"
      color="#fff"
      background-color="#000"
      :opacity="0.6"
    ></loading>
  </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";

// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown,
    Loading
  },
  methods: {
    logout() {
      TokenService.removeToken()
      Api.removeHeader()

      this.$store.commit('logout')
    }
  }
};
</script>
