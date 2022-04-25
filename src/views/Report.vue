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
      </div>
    </div>
  </div>
</template>
<script>
import ReportService from '@/services/ReportService.js'
import DepartmentChart from '@/components/Charts/DepartmentChart.vue'
import IdeaChart from '@/components/Charts/IdeaChart.vue'
export default {
  name: 'report',
  components: {
    DepartmentChart,
    IdeaChart,
  },
  data() {
    return {
      overView: {},
      chartDepLabels: [],
      chartDepData: [],
      chartLinedata: {},
    }
  },
  async mounted() {
    await this.getOverView()
  },
  methods: {
    async getOverView() {
      this.$store.dispatch('startLoading')
      try {
        const res = await ReportService.getOverView(this.$axios)
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
        if (res.message) this.$store.dispatch('handleNotifications', res)
      } catch (err) {
        this.$store.dispatch('handleNotifications', { message: err.response.data })
      } finally {
        this.$store.dispatch('stopLoading')
      }
    },
  },
}
</script>
