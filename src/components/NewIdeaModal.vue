<template>
  <modal :show="show" @close="onClose" footerClasses="p-1" modalClasses="modal-lg" bodyClasses="pt-0">
    <template v-slot:header><h3>Post new Idea</h3></template>
    <validate-form @submit="submit" v-slot="{ meta }">
      <div class="align-items-center justify-content-between">
        <base-input
          formGroupClasses="w-100 rounded-5 mb-2 "
          type="text"
          name="title"
          placeholder="Title"
          formClasses="border border-1 rounded"
          rules="required"
        />
      </div>
      <div :style="{ height: '200px' }">
        <base-editor class="" :placeholder="'Write something here...'" name="description" rules="required" />
      </div>
      <ul class="d-flex flex-wrap align-items-center list-inline p-0 list-content">
        <li class="col-md-6 mb-3">
          <div class="bg-soft-primary rounded p-2 pointer me-3 row">
            <span class="col-md-4 d-block d-flex align-items-center"><i class="ni ni-image mr-3"></i> Photo</span>
            <base-file class="col-md-8 mb-0" name="image_id" aria-label="Image" rules="required|image" />
          </div>
        </li>
        <li class="col-md-6 mb-3">
          <div class="bg-soft-primary rounded p-2 pointer me-3 row">
            <span class="col-md-5 d-block d-flex align-items-center"><i class="ni ni-single-02 mr-3"></i> Anonymous </span>
            <base-checkbox class="col-md-7 mb-0" name="is_incognito"></base-checkbox>
          </div>
        </li>
        <li class="col-md-6 mb-3">
          <div class="bg-soft-primary rounded p-2 pointer me-3 row">
            <span class="col-md-4 d-block d-flex align-items-center"><i class="ni ni-single-copy-04 mr-3"></i> Document</span>
            <base-file
              class="col-md-8 mb-0"
              name="document_id"
              aria-label="Image"
              :accept="'.xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf'"
            />
          </div>
        </li>
        <li class="col-md-6 mb-3">
          <div class="bg-soft-primary rounded p-2 pointer me-3 row">
            <span class="col-md-4 d-block d-flex align-items-center"><i class="ni ni-tag mr-3"></i> Category</span>
            <base-select class="col-md-8 mb-0 mt-1" :values="categories" name="category_id" :classes="'form-select'" rules="required"></base-select>
          </div>
        </li>
        <li class="col-md-6 mb-3">
          <div class="bg-soft-primary rounded p-2 pointer me-3">
            <base-checkbox v-model:checked="isAgree" name="agree">
              I agree the
              <a href="javascript:;" class="text-dark font-weight-bolder">Terms and Conditions</a>
            </base-checkbox>
          </div>
        </li>
      </ul>
      <hr />
      <button type="submit" class="btn btn-primary d-block w-100 mt-3" :disabled="isDisableSubmit(meta.valid)">Post</button>
    </validate-form>
  </modal>
</template>
<script>
import CategoryService from '@/services/CategoryService.js'
import IdeaService from '@/services/IdeaService.js'
import { serialize } from 'object-to-formdata'
import moment from 'moment-timezone'
moment().tz('Asia/Ho_Chi_Minh').format()
export default {
  name: 'new-idea-modal',
  props: {
    show: Boolean,
  },
  data() {
    return { categories: [], isAgree: false }
  },
  async mounted() {
    this.$store.dispatch('startLoading')
    try {
      const res = await CategoryService.getAll(this.$axios)
      if (res.success)
        this.categories = res.data.map((item) => {
          item.disabled = moment() > moment(item.lock_date)
          return item
        })
      else throw res
    } catch (err) {
      this.$store.dispatch('handleNotifications', { message: typeof err === 'string' ? err : err.message })
    } finally {
      this.$store.dispatch('stopLoading')
    }
  },
  methods: {
    async submit(data) {
      this.$store.dispatch('startLoading')
      try {
        delete data.agree
        data.is_incognito = data.is_incognito ? 1 : 0
        const formData = serialize(data)
        const res = await IdeaService.createOne(this.$axios, formData)
        if (res.success) {
          this.$emit('close', true)
        } else throw res
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
    getFormData(object) {
      const formData = new FormData()
      Object.keys(object).forEach((key) => {
        if (typeof object[key] !== 'object') formData.append(key, object[key])
        else formData.append(key, JSON.stringify(object[key]))
      })
      return formData
    },
    onClose() {
      this.$emit('update:show', false)
      this.$emit('close')
    },
    convertTime(time) {
      return moment(time).format('DD/MM/YYYY, HH:mm')
    },
  },
}
</script>
<style lang="scss">
.list-content {
  margin-top: 55px;
}
@media (max-width: 990px) {
  .list-content {
    margin-top: 80px;
  }
}
@media (max-width: 425px) {
  .list-content {
    margin-top: 125px;
  }
}
</style>
