<template>
  <card type="default" header-classes="bg-transparent">
    <template v-slot:header>
      <div class="row align-items-center">
        <div class="col">
          <h6 class="text-light text-uppercase ls-1 mb-1">Idea per days</h6>
        </div>
      </div>
    </template>
    <div class="chart-area">
      <Line :chart-data="chartData" :chart-options="options" :height="300" class="line_chart" />
    </div>
  </card>
</template>

<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

export default {
  name: 'idea-chart',
  components: { Line },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      labels: [],
      dataChart: [],
      gradientStroke2: null,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
        scales: {
          y: {
            grid: {
              drawBorder: false,
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              borderDash: [5, 5],
            },
            ticks: {
              display: true,
              padding: 10,
              color: '#b2b9bf',
              font: {
                size: 11,
                style: 'normal',
                lineHeight: 2,
              },
            },
          },
          x: {
            grid: {
              drawBorder: false,
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
              borderDash: [5, 5],
            },
            ticks: {
              display: true,
              color: '#b2b9bf',
              padding: 20,
              font: {
                size: 11,
                style: 'normal',
                lineHeight: 2,
              },
            },
          },
        },
      },
    }
  },
  mounted() {
    const ctx2 = document.querySelector('.line_chart canvas').getContext('2d')
    this.gradientStroke2 = ctx2.createLinearGradient(0, 230, 0, 50)
    this.gradientStroke2.addColorStop(1, 'rgba(203,12,159,0.2)')
    this.gradientStroke2.addColorStop(0.2, 'rgba(72,72,176,0.0)')
    this.gradientStroke2.addColorStop(0, 'rgba(203,12,159,0)') //purple colors
  },
  computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: 'Ideas',
            tension: 0.4,
            borderWidth: 0,
            pointRadius: 0,
            borderColor: '#cb0c9f',
            // eslint-disable-next-line no-dupe-keys
            borderWidth: 3,
            backgroundColor: this.gradientStroke2,
            fill: true,
            data: this.dataChart,
            maxBarThickness: 6,
          },
        ],
      }
    },
  },
  watch: {
    data(data) {
      this.labels = data.labels
      this.dataChart = data.data
    },
  },
}
</script>
