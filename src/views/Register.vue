<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-header bg-transparent pb-3">
          <div class="text-muted text-center mt-2 mb-0">
            <h1>Sign up with</h1>
          </div>
        </div>
        <div class="card-body px-lg-5 py-lg-5">
          <validate-form class="text-start" @submit="onSubmit" v-slot="{ meta }">
            <base-input
              formClasses="input-group-alternative"
              placeholder="User name"
              name="user_name"
              addon-left-icon="ni ni-hat-3"
              rules="required"
              focused
            >
            </base-input>

            <base-input
              formClasses="input-group-alternative"
              placeholder="Email"
              name="email"
              addon-left-icon="ni ni-email-83"
              rules="required|email"
            >
            </base-input>

            <base-input
              formClasses="input-group-alternative"
              placeholder="Password"
              name="password"
              type="password"
              rules="required|min:6"
              addon-left-icon="ni ni-lock-circle-open"
            >
            </base-input>

            <base-input
              formClasses="input-group-alternative"
              type="password"
              name="password_confirm"
              placeholder="Confirm Password"
              aria-label="Confirm Password"
              rules="confirmed:@password"
              addon-left-icon="ni ni-lock-circle-open"
            >
            </base-input>

            <div class="row my-4">
              <div class="col-12">
                <base-checkbox class="custom-control-alternative" v-model:checked="isAgree" name="is_agress">
                  <span class="text-muted">I agree with the <a href="#!">Privacy Policy</a></span>
                </base-checkbox>
              </div>
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary my-4" :disabled="isDisableSubmit(meta.valid)">Create account</button>
            </div>
          </validate-form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="offset-6 col-6 text-right">
          <router-link to="/login" class="text-light">
            <small>Login into your account</small>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AuthService from '../services/AuthService'
export default {
  name: 'register',
  data() {
    return {
      isAgree: false,
    }
  },
  methods: {
    async onSubmit(formData) {
      this.$store.dispatch('startLoading')
      try {
        const res = await AuthService.signUp(this.$axios, formData)
        if (res.success) {
          this.$router.push('/login')
        }
        this.$store.dispatch('handleNotifications', res)
      } catch (err) {
        this.$store.dispatch('handleNotifications', { message: typeof err === 'string' ? err : err.message })
      } finally {
        this.$store.dispatch('stopLoading')
      }
    },
    isDisableSubmit(validForm) {
      if (validForm && this.isAgree) return false
      return true
    },
  },
}
</script>
<style></style>
