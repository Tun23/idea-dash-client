<template>
  <div>
    <base-header type="gradient-primary" class="pb-6 pb-8 pt-5 pt-md-8"> </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div class="card shadow">
            <div class="card-header bg-transparent">
              <h3 class="mb-0">List department</h3>
            </div>
            <div class="card-body">
              <div class="btn-toolbar d-flex align-items-start justify-content-between" role="toolbar">
                <div class="btn-group mb-3" role="group">
                  <router-link to="/department/create">
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
                  :data="departments"
                >
                  <template v-slot:columns>
                    <th>Name</th>
                    <th class="align-middle text-center">Actions</th>
                  </template>

                  <template v-slot:default="row">
                    <th scope="row">
                      <div class="media align-items-center">
                        {{ row.item.name }}
                      </div>
                    </th>
                    <td class="align-middle text-center">
                      <router-link :to="`/department/edit/${row.item.id}`">
                        <base-button size="sm" type="info" class="mr-4"> <i class="fa fa-pencil"></i> Edit</base-button>
                      </router-link>
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
import DepartmentService from '@/services/DepartmentService.js'
export default defineComponent({
  name: 'ListDepartment',
  components: {},
  data() {
    return { departments: [], lastPage: 1, total: 0, isOpenModal: false, currentData: { id: '', name: '' }, keyword: null }
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
    async changePage(number) {
      if (number <= 0 || number > this.lastPage) return
      this.$store.dispatch('setPage', number)
      await this.search(this.keyword)
    },
    async search(keyword = null) {
      this.$store.dispatch('startLoading')
      try {
        const res = await DepartmentService.search(this.$axios, this.$store, keyword)
        if (res.success) {
          const { data, lastPage, total } = res.data
          this.departments = data
          this.lastPage = lastPage
          this.total = total
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
        const res = await DepartmentService.deleteOne(this.$axios, this.currentData.id)
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
  },
})
</script>

