<template>
  <div>
    <base-header type="gradient-primary" class="pb-6 pb-8 pt-5 pt-md-8"> </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-md-6">
          <div class="card shadow">
            <div class="card-header bg-transparent">
              <h3 class="mb-0">Create new user</h3>
            </div>
            <div class="card-body">
              <validate-form class="text-start" @submit="onSubmit" v-slot="{ meta }">
                <div class="d-none">{{ (isValid = meta.valid) }}</div>
                <div class="row gx-0 align-items-center justify-content-between">
                  <div class="col-sm-2 mb-sm-3">
                    <label class="float-sm-end">User Name <span class="text-danger">*</span></label>
                  </div>
                  <base-input
                    formGroupClasses="col-sm-9"
                    type="text"
                    rules="required"
                    name="user_name"
                    formClasses=" border border-1 input-group-alternative rounded"
                    placeholder="User name"
                  >
                  </base-input>
                </div>
                <div class="row gx-0 align-items-center justify-content-between">
                  <div class="col-sm-2 mb-sm-3">
                    <label class="float-sm-end">Email <span class="text-danger">*</span></label>
                  </div>
                  <base-input
                    formGroupClasses="col-sm-9"
                    type="text"
                    rules="required"
                    name="email"
                    formClasses=" border border-1 input-group-alternative rounded"
                    placeholder="Email"
                  >
                  </base-input>
                </div>
                <div class="row gx-0 align-items-center justify-content-between">
                  <div class="col-sm-2 mb-sm-3">
                    <label class="float-sm-end">Password <span class="text-danger">*</span></label>
                  </div>
                  <base-input
                    formGroupClasses="col-sm-9"
                    type="password"
                    rules="min:6"
                    name="password"
                    formClasses=" border border-1 input-group-alternative rounded"
                    placeholder="Password"
                  >
                  </base-input>
                </div>
                <div class="row gx-0 align-items-center justify-content-between">
                  <div class="col-sm-2 mb-sm-3">
                    <label class="float-sm-end">Confirm Password <span class="text-danger">*</span></label>
                  </div>
                  <base-input
                    formGroupClasses="col-sm-9"
                    type="password"
                    rules="confirmed:@password"
                    name="password_confirm"
                    formClasses=" border border-1 input-group-alternative rounded"
                    placeholder="Confirm Password"
                  >
                  </base-input>
                </div>
                <div class="row gx-0 align-items-center justify-content-between">
                  <div class="col-sm-2 mb-sm-3">
                    <label class="float-sm-end">Department <span class="text-danger">*</span></label>
                  </div>
                  <base-select class="col-sm-9" :values="departments" name="department_id" :classes="'form-select'" rules="required"></base-select>
                </div>
                <div class="row gx-0 align-items-center justify-content-between">
                  <div class="col-sm-2 mb-sm-3">
                    <label class="float-sm-end">Role <span class="text-danger">*</span></label>
                  </div>
                  <base-select class="col-sm-9" :values="roles" name="role" :classes="'form-select'" rules="required"></base-select>
                </div>
                <div class="row gx-0 align-items-center justify-content-between">
                  <div class="col-sm-2 mb-sm-3">
                    <label class="float-sm-start">Avatar</label>
                  </div>
                  <base-file class="col-sm-9" name="image_id" aria-label="Image" rules="image" />
                </div>
                <button type="submit" class="d-none"></button>
              </validate-form>
            </div>
            <div class="card-footer border-top pt-2 pb-2 d-flex justify-content-end">
              <div class="text-center">
                <base-button type="default" class="float-right align-middle" :disabled="!isValid" @click="onClick">Save</base-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import UserService from '@/services/UserService.js'
import DepartmentService from '@/services/DepartmentService.js'
import { serialize } from 'object-to-formdata'
export default defineComponent({
  name: 'CreateTopic',
  components: {},
  data() {
    const roles = [
      { id: 3, name: 'Normal' },
      { id: 2, name: 'QA' },
      { id: 1, name: 'Admin' },
    ]
    return { isValid: true, roles, departments: [] }
  },
  async mounted() {
    const resDep = await DepartmentService.getAll(this.$axios)
    if (resDep.success) {
      this.departments = resDep.data
    }
  },
  methods: {
    onClick() {
      document.querySelectorAll('button[type=submit]')[0].click()
    },
    async onSubmit(data) {
      this.$store.dispatch('startLoading')
      try {
        const formData = serialize(data)
        const res = await UserService.createOne(this.$axios, formData)
        if (res.success) {
          this.$router.push('/user')
        }
        this.$store.dispatch('handleNotifications', res)
      } catch (err) {
        this.$store.dispatch('handleNotifications', { message: err.response.data })
      } finally {
        this.$store.dispatch('stopLoading')
      }
    },
  },
})
</script>
