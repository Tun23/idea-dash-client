<template>
  <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
    <div class="container-fluid">
      <navbar-toggle-button @click="showSidebar">
        <span class="navbar-toggler-icon"></span>
      </navbar-toggle-button>
      <router-link
        class="navbar-brand pt-0 pb-0"
        to="/"
        style="justify-content: center; text-align: center; font-size: 3.2rem; font-weight: bold; color: #5e72e4"
      >
        <img :src="logo" class="navbar-brand-img mr-2 mb-2" alt="logo" />IDash
      </router-link>

      <slot name="mobile-right">
        <ul class="nav align-items-center d-md-none">
          <base-dropdown class="nav-link pr-0" position="right" :hideArrow="false">
            <template v-slot:title>
              <div class="media align-items-center" role="button">
                <span class="avatar avatar-sm rounded-circle">
                  <img
                    alt="Image placeholder"
                    :src="
                      user?.image?.source_url
                        ? user?.image?.source_url
                        : 'https://idea-dash.s3.ap-southeast-1.amazonaws.com/files/4eaf9a0c-f899-471d-97b0-c773f97f5cbd.png'
                    "
                  />
                </span>
              </div>
            </template>
            <div class="dropdown-header noti-title">
              <h6 class="text-overflow m-0">Welcome!</h6>
            </div>
            <a role="button" class="dropdown-item">
              <i class="ni ni-single-02"></i>
              <span>{{ user?.user_name }}</span>
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item cursor-pointer pe-auto" role="button" @click="logout">
              <i class="ni ni-user-run"></i>
              <span>Logout</span>
            </a>
          </base-dropdown>
        </ul>
      </slot>
      <slot></slot>
      <div v-show="$sidebar.showSidebar" class="navbar-collapse collapse show" id="sidenav-collapse-main">
        <div class="navbar-collapse-header d-md-none">
          <div class="row">
            <div class="col-6 collapse-brand">
              <router-link to="/">
                <img :src="logo" />
              </router-link>
            </div>
            <div class="col-6 collapse-close">
              <navbar-toggle-button @click="closeSidebar"></navbar-toggle-button>
            </div>
          </div>
        </div>

        <ul class="navbar-nav">
          <slot name="links"> </slot>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import NavbarToggleButton from '@/components/NavbarToggleButton.vue'

export default {
  name: 'sidebar',
  components: {
    NavbarToggleButton,
  },
  props: {
    logo: {
      type: String,
      default: '/img/brand/logo.png',
      description: 'Sidebar app logo',
    },
    autoClose: {
      type: Boolean,
      default: true,
      description: 'Whether sidebar should autoclose on mobile when clicking an item',
    },
  },
  provide() {
    return {
      autoClose: this.autoClose,
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    avatarUrl() {
      return this.$store.state.user?.image?.source_url
    },
  },
  methods: {
    closeSidebar() {
      this.$sidebar.displaySidebar(false)
    },
    showSidebar() {
      this.$sidebar.displaySidebar(true)
    },
  },
  beforeUnmount() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false
    }
  },
}
</script>
