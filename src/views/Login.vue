<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-header bg-transparent pb-3">
          <div class="text-muted text-center mt-2 mb-3">
            <h4>Sign in with credentials</h4>
          </div>
        </div>
        <div class="card-body px-lg-5 py-lg-5">
          <validate-form class="text-start" @submit="onSubmit">
            <base-input
              rules="required|email"
              name="email"
              formClasses="input-group-alternative"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
            >
            </base-input>

            <base-input
              formClasses="input-group-alternative"
              placeholder="Password"
              rules="required"
              name="password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
            >
            </base-input>
            <div class="text-center">
              <button type="submit" class="btn btn-primary my-4">Sign in</button>
            </div>
          </validate-form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <a href="#" class="text-light"><small>Forgot password?</small></a>
        </div>
        <div class="col-6 text-right">
          <router-link to="/register" class="text-light"><small>Create new account</small></router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AuthService from '../services/AuthService'
export default {
  name: 'login',
  methods: {
    async onSubmit(formData) {
      this.$store.dispatch('startLoading')
      try {
        const res = await AuthService.login(this.$axios, formData)
        if (res.success) {
          this.$store.dispatch('login', res.data)
        } else throw res
      } catch (err) {
        this.$store.dispatch('handleNotifications', {
          message: typeof err === 'string' ? err : err.message,
        })
      } finally {
        this.$store.dispatch('stopLoading')
      }
    },
  },
  computed: {
    user() {
      return this.$store.state.user
    },
  },
  watch: {
    user() {
      if (this.user) {
        this.$router.push({ name: 'root' })
      }
    },
  },
}
</script>
<style></style>
