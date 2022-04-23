<template>
  <div>
    <base-header type="gradient-primary" class="pb-6 pb-8 pt-5 pt-md-8"> </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-md-6">
          <div class="card shadow">
            <div class="card-header bg-transparent">
              <h3 class="mb-0">{{ currentData.name }} Department</h3>
            </div>
            <div class="card-body">
              <validate-form class="text-start" @submit="onSubmit" v-slot="{ meta }">
                <div class="d-none">{{ (isValid = meta.valid) }}</div>
                <div class="row gx-0 align-items-center justify-content-between">
                  <div class="col-sm-2 mb-sm-3">
                    <label class="float-sm-end">Name <span class="text-danger">*</span></label>
                  </div>
                  <base-input
                    formGroupClasses="col-sm-9"
                    type="text"
                    rules="required"
                    name="name"
                    :value="currentData.name"
                    formClasses=" border border-1 input-group-alternative rounded"
                    placeholder="Name"
                  >
                  </base-input>
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
import DepartmentService from '@/services/DepartmentService.js'
export default defineComponent({
  name: 'EditDepartment',
  components: {},
  data() {
    return {
      isValid: true,
      currentData: {
        name: '',
      },
    }
  },
  computed: {
    departmentId() {
      return this.$route.params.id
    },
  },
  async mounted() {
    this.$store.dispatch('startLoading')
    try {
      const res = await DepartmentService.getOne(this.$axios, this.departmentId)
      if (res.success) {
        this.currentData = res.data
      }
    } catch (err) {
      this.$store.dispatch('handleNotifications', { message: err.response.message })
    } finally {
      this.$store.dispatch('stopLoading')
    }
  },
  methods: {
    onClick() {
      document.querySelectorAll('button[type=submit]')[0].click()
    },
    async onSubmit(formData) {
      this.$store.dispatch('startLoading')
      try {
        const res = await DepartmentService.updateOne(this.$axios, this.departmentId, formData)
        if (res.success) this.$router.push('/department')
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
