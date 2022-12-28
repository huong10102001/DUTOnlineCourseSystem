<template>
  <div class="report-detail__section">
    <h3 style="font-size: 1rem">Quantity of user learning in this course per day</h3>
    <Line :chartData="chartData" :chartOptions="options"></Line>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import {Line} from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

@Options({
  components: {
    Line
  },
  props: {
    report: {
      "date_one": [],
      "total_user": [],
      "users": []
    }
  },
  data() {
    return {
      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Users Learning Course',
            backgroundColor: '#f87979',
            data: [40, 39, 10, 40, 39, 80, 40]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  beforeUpdate() {
    this.chartData.labels = this.report.date_one
    this.chartData.datasets[0].data = this.report.total_user
  }
})
export default class ChartSection extends Vue {
}

</script>

<style scoped>

</style>
