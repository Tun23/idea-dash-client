<template>
  <div>
    <base-header type="gradient-primary" class="pb-6 pb-8 pt-5 pt-md-8"> </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div class="card shadow">
            <div class="card-header bg-transparent">
              <h3 class="mb-0">List idea</h3>
            </div>
            <div class="card-body">
              <div class="btn-toolbar d-flex align-items-start justify-content-between" role="toolbar">
                <div class="input-group">
                  <base-input
                    name="search"
                    v-model:value="keyword"
                    formClasses="input-group-alternative border border-1"
                    placeholder="Enter to search..."
                    addon-right-icon="fas fa-search"
                    @keyup-enter="search(keyword)"
                  >
                  </base-input>
                </div>
              </div>
              <div class="table-responsive">
                <base-table
                  class="table align-items-center table-flush"
                  :class="''"
                  :thead-classes="'thead-light'"
                  tbody-classes="list"
                  :data="ideas"
                >
                  <template v-slot:columns>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Like</th>
                    <th>Unlike</th>
                    <th>Comment</th>
                    <th class="align-middle text-center">Actions</th>
                  </template>

                  <template v-slot:default="row">
                    <th scope="row">
                      <div class="media align-items-center">
                        {{ row.item.title }}
                      </div>
                    </th>
                    <td class="text-truncate" style="max-width: 150px">
                      {{ removeTags(row.item.description) }}
                    </td>
                    <td>
                      <div class="text-center text-black"><i class="fa fa-thumbs-up mr-2" aria-hidden="true"></i>{{ row.item.downVoteCount }}</div>
                    </td>
                    <td>
                      <div class="text-center text-black"><i class="fa fa-thumbs-down mr-2" aria-hidden="true"></i>{{ row.item.downVoteCount }}</div>
                    </td>
                    <td>
                      <div class="text-center text-black"><i class="fa fa-comments mr-2" aria-hidden="true"></i>{{ row.item.commentCount }}</div>
                    </td>
                    <td class="align-middle text-center">
                      <base-button size="sm" type="warning" class="mr-4" @click="onDelete(row.item)"> <i class="fa fa-trash"></i> Delete</base-button>
                    </td>
                  </template>
                </base-table>
              </div>

              <div class="card-footer d-flex justify-content-center bg-transparent">
                <base-pagination :pageCount="lastPage" :perPage="perPage" :value="currentPage" @input="changePage" align="center"></base-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal :show="isOpenModal" @close="isOpenModal = false" type="mini" footerClasses="p-1">
      <template v-slot:header><h3 class="modal-title font-weight-bolder">Confirm delete</h3></template>
      <p class="">Are you sure to delete {{ currentData.name }}?</p>
      <template v-slot:footer>
        <base-button type="dark" @click="isOpenModal = false">Close</base-button>
        <base-button type="primary" @click="submitDelete()">Confirm</base-button>
      </template>
    </modal>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import moment from 'moment-timezone'
import IdeaService from '@/services/IdeaService.js'
moment().tz('Asia/Ho_Chi_Minh').format()
export default defineComponent({
  name: 'ListIdea',
  components: {},
  data() {
    return { ideas: [], lastPage: 1, isOpenModal: false, currentData: { id: '', name: '' }, keyword: null }
  },
  async mounted() {
    await this.search({ categoryId: this.categoryId })
  },
  computed: {
    currentPage() {
      return this.$store.state.page
    },
    paginationItems() {
      return this.paginate(this.currentPage, this.lastPage, 1)
    },
    categoryId() {
      return this.$route.params.id
    },
  },
  methods: {
    convertTime(time) {
      return moment(time).format('DD/MM/YYYY, HH:mm:ss')
    },
    async changePage(number) {
      if (number <= 0 || number > this.lastPage) return
      this.$store.dispatch('setPage', number)
      await this.search({ topicId: this.topicId })
    },
    async search(param) {
      this.$store.dispatch('startLoading')
      try {
        const res = await IdeaService.search(this.$axios, this.$store, param)
        if (res.success) {
          const { data, lastPage } = res.data
          this.ideas = data
          this.lastPage = lastPage
        } else throw res
      } catch (err) {
        this.$store.dispatch('handleNotifications', { message: typeof err === 'string' ? err : err.message })
      } finally {
        this.$store.dispatch('stopLoading')
      }
    },
    onDelete(data) {
      this.currentData = data
      this.isOpenModal = true
    },
    async submitDelete() {
      this.$store.dispatch('startLoading')
      try {
        const res = await IdeaService.deleteOne(this.$axios, this.currentData.id)
        if (res.success) {
          await this.search()
        }
        this.isOpenModal = false
        this.$store.dispatch('handleNotifications', res)
      } catch (err) {
        this.$store.dispatch('handleNotifications', { message: err.response.data })
      } finally {
        this.$store.dispatch('stopLoading')
      }
    },
    removeTags(string) {
      return !string
        ? ''
        : string
            .replace(/<[^>]*>/g, ' ')
            .replace(/\s{2,}/g, ' ')
            .trim()
    },
  },
})
</script>
