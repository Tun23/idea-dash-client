<template>
  <div class="main-content bg-default">
    <base-nav class="navbar-top navbar-horizontal navbar-dark" containerClasses="px-4 container" expand>
      <template v-slot="{ closeMenu }">
        <div class="navbar-collapse-header d-md-none">
          <div class="row">
            <div class="col-6 collapse-brand">
              <router-link to="/">
                <img src="/img/brand/logo.png" />
              </router-link>
            </div>
            <div class="col-6 collapse-close">
              <button type="button" @click="closeMenu" class="navbar-toggler" aria-label="Toggle sidenav">
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link nav-link-icon" to="/">
              <i class="ni ni-planet"></i>
              <span class="nav-link-inner--text">Dashboard</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-icon" to="/register">
              <i class="ni ni-circle-08"></i>
              <span class="nav-link-inner--text">Register</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-icon" to="/login">
              <i class="ni ni-key-25"></i>
              <span class="nav-link-inner--text">Login</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-icon" to="/profile">
              <i class="ni ni-single-02"></i>
              <span class="nav-link-inner--text">Profile</span>
            </router-link>
          </li>
        </ul>
      </template>
    </base-nav>
    <div class="header bg-gradient-primary py-6 py-lg-6">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-lg-5 col-md-6">
              <h1 class="text-white">Welcome!</h1>
              <p class="text-lead text-white">Use these awesome forms to login or create new account in your project for free.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <div class="container mt--8 pb-5">
      <slot />
    </div>
    <footer class="py-5">
      <div class="container">
        <div class="row align-items-center justify-content-xl-between">
          <div class="col-xl-6">
            <div class="copyright text-center text-xl-left text-muted">
              &copy; {{ year }}
              <a href="#" class="font-weight-bold ml-1" target="_blank">IDash</a>
            </div>
          </div>
          <div class="col-xl-6">
            <ul class="nav nav-footer justify-content-center justify-content-xl-end">
              <li class="nav-item">
                <a href="#" class="nav-link" target="_blank">IDash</a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link" target="_blank">About Us</a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link" target="_blank">Blog</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  name: 'auth-layout',
  data() {
    return {
      year: new Date().getFullYear(),
      showMenu: false,
    }
  },
}
</script>
<style></style>
