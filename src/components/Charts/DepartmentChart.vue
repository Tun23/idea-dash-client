<template>
  <card header-classes="bg-transparent">
    <template v-slot:header>
      <div class="row align-items-center">
        <div class="col">
          <h6 class="text-uppercase text-muted ls-1 mb-1">Idea per department</h6>
        </div>
      </div>
    </template>
    <div class="chart-area">
      <Bar :chart-data="chartData" :chart-options="options" :height="268" class="bar_chart" />
    </div>
  </card>
</template>
<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement } from 'viteChart'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement)
export default {
  name: 'department-chart',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  components: {
    Bar,
  },
  data() {
    return {
      labels: [],
      dataCount: [],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        tooltips: {
          enabled: true,
          mode: 'index',
          intersect: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                padding: 10,
                fontSize: 13,
                fontColor: '#8898aa',
                callback: function (value) {
                  if (!(value % 10)) {
                    return value
                  }
                },
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                drawBorder: false,
                drawOnChartArea: false,
                drawTicks: false,
              },
              ticks: {
                padding: 20,
                fontSize: 13,
                fontColor: '#8898aa',
              },
            },
          ],
        },
      },
    }
  },
  mounted() {
    const chartColor = '#FFFFFF'
    const fallBackColor = '#f96332'
    const color = this.color || fallBackColor
    const ctx = document.getElementById('bar-chart').getContext('2d')
    const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0)
    gradientStroke.addColorStop(0, color)
    gradientStroke.addColorStop(1, chartColor)
  },
  computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: 'ideas',
            tension: 0.4,
            borderWidth: 0,
            borderRadius: 4,
            borderSkipped: false,
            backgroundColor: '#fb6340',
            data: this.dataCount,
          },
        ],
      }
    },
  },
  watch: {
    data(data) {
      this.labels = data.labels
      this.dataCount = data.data
    },
  },
}
</script>
