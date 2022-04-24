<template>
  <div>
    <base-header
      class="header pb-3 pt-2 pt-lg-3 d-flex align-items-center"
      :style="`min-height: 450px; background-image: url(${data?.image?.source_url}); background-size: cover; background-position: center top`"
    >
      <span class="mask opacity-5 bg-gradient-light"></span>
      <div class="container-fluid d-flex align-items-center">
        <div class="row">
          <div class="col-lg-10 col-md-10">
            <h1 class="display-2 text-white">{{ data?.name }}</h1>
            <a @click="isOpenModal = true" class="btn btn-info">Post your idea</a>
          </div>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-8 order-xl-1">
          <card shadow type="secondary">
            <template v-slot:header>
              <div class="bg-white border-0">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">Category detail</h3>
                  </div>
                </div>
              </div>
            </template>

            <div class="p-3">
              <span class="mt-2 d-block" v-html="data?.description"></span>
              <hr />
              <ul class="list-group">
                <li class="pt-0 text-sm border-0 list-group-item ps-0">
                  <strong class="text-dark">Lock date:</strong> &nbsp; {{ convertTime(data?.lock_date) }}
                </li>
                <li class="text-sm border-0 list-group-item ps-0">
                  <strong class="text-dark">Close date:</strong> &nbsp; {{ convertTime(data?.close_date) }}
                </li>
              </ul>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
  <NewIdeaModal :show="isOpenModal" @close="isOpenModal = false"></NewIdeaModal>
</template>
<script>
import CategoryService from '@/services/CategoryService.js'
import NewIdeaModal from '@/components/NewIdeaModal.vue'
import moment from 'moment-timezone'
moment().tz('Asia/Ho_Chi_Minh').format()
export default {
  name: 'user-profile',
  components: {
    NewIdeaModal,
  },
  data() {
    return {
      isOpenModal: false,
      data: null,
    }
  },
  computed: {
    dataId() {
      return this.$route.params.id
    },
  },
  async mounted() {
    await this.search()
  },
  methods: {
    convertTime(time) {
      return moment(time).format('DD/MM/YYYY, HH:mm:ss')
    },
    async search() {
      this.$store.dispatch('startLoading')
      try {
        const res = await CategoryService.getOne(this.$axios, this.dataId)
        if (res.success) {
          if (res.data.ideas.length > 3) {
            res.data.ideas.slice(0, 3)
          }
          this.data = res.data
        }
      } catch (err) {
        this.$store.dispatch('handleNotifications', { message: err.response.message })
      } finally {
        this.$store.dispatch('stopLoading')
      }
    },
    async onCloseIdeaForm() {
      await this.search()
      this.isOpenModal = false
    },
  },
}
</script>
<style></style>
