<template>
  <div>
    <base-header type="gradient-primary" class="pb-6 pb-8 pt-5 pt-md-8"> </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div class="card shadow">
            <div class="card-header bg-transparent">
              <h3 class="mb-0">List catergory</h3>
            </div>
            <div class="card-body">
              <div class="btn-toolbar d-flex align-items-start justify-content-between" role="toolbar">
                <div class="btn-group mb-3" role="group">
                  <router-link to="/category/create">
                    <base-button type="default" class="float-right align-middle"> <i class="fa fa-plus"></i> Add</base-button>
                  </router-link>
                </div>
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
                  :data="topics"
                >
                  <template v-slot:columns>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Close Date</th>
                    <th>Final Close Date</th>
                    <th class="align-middle text-center">Actions</th>
                  </template>

                  <template v-slot:default="row">
                    <th scope="row">
                      <div class="media align-items-center">
                        {{ row.item.name }}
                      </div>
                    </th>
                    <td class="text-truncate" style="max-width: 150px">
                      {{ removeTags(row.item.description) }}
                    </td>
                    <td>
                      {{ convertTime(row.item.lock_date) }}
                    </td>
                    <td>
                      {{ convertTime(row.item.close_date) }}
                    </td>
                    <td class="align-middle text-center">
                      <router-link :to="`/category/${row.item.id}/ideas`">
                        <base-button size="sm" type="success" class="mr-4"><i class="fa fa-eye"></i>View Ideas</base-button>
                      </router-link>
                      <base-dropdown class="nav-link pr-0" position="right" :hideArrow="false">
                        <template v-slot:title>
                          <base-button size="sm" type="primary" class="mr-4"> <i class="fa fa-ellipsis-v"></i> More</base-button>
                        </template>
                        <template v-if="row.item.closed">
                          <a class="dropdown-item" role="button" @click="downloadZip(row.item.id)">
                            <i class="fa fa-file-archive-o"></i>
                            <span>Download Zip</span>
                          </a>
                          <div class="dropdown-divider"></div>
                        </template>
                        <router-link :to="`/category/edit/${row.item.id}`">
                          <a class="dropdown-item" role="button">
                            <i class="fa fa-pencil"></i>
                            <span>Edit</span>
                          </a>
                        </router-link>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" role="button" @click="onDelete(row.item)">
                          <i class="fa fa-trash"></i>
                          <span>Delete</span>
                        </a>
                      </base-dropdown>
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
import FileSaver from 'file-saver'
import moment from 'moment-timezone'
import CategoryService from '@/services/CategoryService.js'
moment().tz('Asia/Ho_Chi_Minh').format()
export default defineComponent({
  name: 'ListCategory',
  components: {},
  data() {
    return { topics: [], lastPage: 1, isOpenModal: false, currentData: { id: '', name: '' }, keyword: null }
  },
  async mounted() {
    await this.search()
  },
  computed: {
    currentPage() {
      return this.$store.state.page
    },
    perPage() {
      return this.$store.state.limit
    },
  },
  methods: {
    async downloadZip(id) {
      this.$store.dispatch('startLoading')
      const res = await CategoryService.downloadZip(this.$axios, id)
      FileSaver.saveAs(new Blob([res], { type: 'application/zip' }), `category${Date.now()}.zip`)
      this.$store.dispatch('stopLoading')
    },
    convertTime(time) {
      return moment(time).format('DD/MM/YYYY, HH:mm:ss')
    },
    async changePage(number) {
      if (number <= 0 || number > this.lastPage) return
      this.$store.dispatch('setPage', number)
      await this.search()
    },
    async search(keyword = null) {
      this.$store.dispatch('startLoading')
      try {
        const res = await CategoryService.search(this.$axios, this.$store, keyword)
        if (res.success) {
          const { data, lastPage } = res.data
          this.topics = data.map((item) => {
            item.closed = moment() > moment(item.close_date)
            return item
          })
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
        const res = await CategoryService.deleteOne(this.$axios, this.currentData.id)
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

