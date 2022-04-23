<template>
  <div>
    <base-header type="gradient-primary" class="pb-6 pb-8 pt-5 pt-md-8"> </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-md-6">
          <div class="card shadow">
            <div class="card-header bg-transparent">
              <h3 class="mb-0">{{ currentData.name }} Category</h3>
            </div>
            <div class="card-body">
              <validate-form class="text-start" @submit="onSubmit" v-slot="{ meta }" validateOnMount>
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
                <div class="row gx-0 align-items-center justify-content-between">
                  <div class="col-sm-2 mb-sm-3">
                    <label class="float-sm-start">Close Date <span class="text-danger">*</span></label>
                  </div>
                  <base-date-picker class="col-sm-9" name="lock_date" rules="required" utc v-model:value="currentData.lock_date" />
                </div>
                <div class="row gx-0 align-items-center justify-content-between">
                  <div class="col-sm-2 mb-sm-3">
                    <label class="float-sm-start">Final Date <span class="text-danger">*</span></label>
                  </div>
                  <base-date-picker class="col-sm-9" name="close_date" rules="required" utc v-model:value="currentData.close_date" />
                </div>
                <div class="row gx-0 align-items-center justify-content-between">
                  <div class="col-sm-2 mb-sm-3">
                    <label class="float-sm-start">Main Image</label>
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
        <div class="col-md-6">
          <div class="card shadow">
            <div class="card-header bg-transparent">
              <h3 class="mb-0">Description</h3>
            </div>
            <div class="card-body">
              <base-editor v-model:content="currentData.description" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import CategoryService from '@/services/CategoryService.js'
import { serialize } from 'object-to-formdata'
export default defineComponent({
  name: 'EditCategory',
  components: {},
  data() {
    return { isValid: true, currentData: { name: '', lock_date: null, close_date: null, description: null, image_id: null } }
  },
  computed: {
    dataId() {
      return this.$route.params.id
    },
  },
  async mounted() {
    this.$store.dispatch('startLoading')
    try {
      const res = await CategoryService.getOne(this.$axios, this.dataId)
      if (res.success) {
        const { name, lock_date, close_date, description, image_id } = res.data
        this.currentData = { name, lock_date, close_date, description, image_id }
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
    async onSubmit(data) {
      this.$store.dispatch('startLoading')
      try {
        console.log(data)
        const { image_id } = data
        const formData = serialize({ ...this.currentData, image_id })
        const res = await CategoryService.updateOne(this.$axios, this.dataId, formData)
        if (res.success) {
          this.$router.push('/category')
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
