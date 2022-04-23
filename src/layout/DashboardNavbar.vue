<template>
  <base-nav class="navbar-top navbar-dark" id="navbar-main" :show-toggle-button="false" expand>
    <form class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
      <div class="form-group mb-0">
        <base-input name="keyword" placeholder="Search" class="input-group-alternative" alternative="" addon-right-icon="fas fa-search"> </base-input>
      </div>
    </form>
    <ul class="navbar-nav align-items-center d-none d-md-flex">
      <li class="nav-item dropdown">
        <base-dropdown class="nav-link pr-0" position="right" :hideArrow="false">
          <template v-slot:title>
            <div class="media align-items-center" role="button">
              <span class="avatar avatar-sm rounded-circle">
                <img alt="Image placeholder" src="/img/theme/team-4-800x800.jpg" />
              </span>
              <!-- <div class="media-body ml-2 d-none d-lg-block">
                <span class="mb-0 text-sm font-weight-bold">User</span>
              </div> -->
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
      </li>
    </ul>
  </base-nav>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchQuery: '',
    }
  },
  methods: {
    ...mapActions(['toggleSidebarColor', 'logout']),
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false)
    },
    toggleMenu() {
      this.showMenu = !this.showMenu
    },
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    avatarUrl() {
      return this.$store.state.user?.image?.source_url
    },
  },
  watch: {
    user() {
      if (!this.user) {
        this.$router.push('/login')
      }
    },
  },
}
</script>
