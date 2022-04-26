<template>
  <div>
    <base-header type="gradient-primary" class="pb-6 pb-8 pt-5 pt-md-8">
      <div class="row">
        <div class="col-xl-3 col-lg-6">
          <stats-card title="Total topics" type="gradient-red" :sub-title="overView?.totalTopic" icon="ni ni-active-40" class="mb-4 mb-xl-0">
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card title="Total ideas" type="gradient-orange" :sub-title="overView?.totalIdea" icon="ni ni-chart-pie-35" class="mb-4 mb-xl-0">
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card title="Total comments" type="gradient-green" :sub-title="overView?.totalComment" icon="ni ni-money-coins" class="mb-4 mb-xl-0">
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card title="Total users" type="gradient-info" :sub-title="overView?.totalUser" icon="ni ni-chart-bar-32" class="mb-4 mb-xl-0">
          </stats-card>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <!--Charts-->
      <div class="row">
        <div class="col-xl-8 mb-5 mb-xl-0">
          <idea-chart :data="chartLinedata"></idea-chart>
        </div>

        <div class="col-xl-4">
          <department-chart :data="{ labels: chartDepLabels, data: chartDepData }"></department-chart>
        </div>
        <div class="col-xl-8 mb-5 mt-3 mb-xl-0">
          <div class="card shadow">
            <div class="card-header bg-transparent">
              <h3 class="mb-0">Top 10 highest view idea</h3>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <base-table class="table align-items-center table-flush" :thead-classes="'thead-light'" tbody-classes="list" :data="topView">
                  <template v-slot:columns>
                    <th>Title</th>
                    <th>Total view</th>
                    <th class="align-middle text-center">Actions</th>
                  </template>

                  <template v-slot:default="row">
                    <th scope="row">
                      <div class="media align-items-center">
                        {{ row.item.title }}
                      </div>
                    </th>
                    <th scope="row">
                      <div class="media align-items-center">
                        {{ row.item.total_view }}
                      </div>
                    </th>
                    <td class="align-middle text-center">
                      <base-button size="sm" type="success" @click="viewIdea(row.item)"><i class="fa fa-eye"></i>View</base-button>
                    </td>
                  </template>
                </base-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <idea-modal :id="currentIdea.id" :show="isOpenModal" @close="isOpenModal = false"></idea-modal>
</template>
<script>
import ReportService from '@/services/ReportService.js'
import DepartmentChart from '@/components/Charts/DepartmentChart.vue'
import IdeaChart from '@/components/Charts/IdeaChart.vue'
import IdeaModal from '@/components/IdeaModal.vue'
export default {
  name: 'report',
  components: {
    DepartmentChart,
    IdeaChart,
    IdeaModal,
  },
  data() {
    return {
      isOpenModal: false,
      overView: {},
      chartDepLabels: [],
      chartDepData: [],
      chartLinedata: {},
      topView: [],
      currentIdea: {},
    }
  },
  async mounted() {
    await this.init()
  },
  methods: {
    viewIdea(idea) {
      this.currentIdea = idea
      this.isOpenModal = true
    },
    async init() {
      this.$store.dispatch('startLoading')
      try {
        const res = await ReportService.getOverView(this.$axios)
        const resTop = await ReportService.getTopIdeaView(this.$axios)
        if (res.success) {
          this.overView = res.data
          this.chartLinedata = res.data.chartIdeaByDate
          this.chartDepLabels = res.data.chartDepartmentIdea.map((item) => {
            return item.name
          })
          this.chartDepData = res.data.chartDepartmentIdea.map((item) => {
            return item.count
          })
        }
        if (resTop.success) {
          this.topView = resTop.data
        }
      } catch (err) {
        this.$store.dispatch('handleNotifications', { message: err.response.data })
      } finally {
        this.$store.dispatch('stopLoading')
      }
    },
  },
}
</script>
