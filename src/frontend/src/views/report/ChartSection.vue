<template>
  <div class="chart-section">
    <h3 class="is-size-5 mb-2" style="font-weight: 500">Overall</h3>
    <Bar
      :width="width"
      :height="height"
      :chart-data="chartData"
    />
  </div>

</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {Bar} from 'vue-chartjs'
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Plugin} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

@Options({
  components: {
    Bar
  },
  props: {
    report: {
      type: Object,
      default: {
        month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        total_course: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      }
    }
  },
  data() {
    return {
      width: 400,
      height: 200,
      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Courses',
            backgroundColor: '#2196f3',
            borderRadius: '4',
            data: [100, 95, 90, 85, 80, 70, 60, 50, 40, 30, 20, 10]
          },
          {
            label: 'Learners',
            backgroundColor: '#008394',
            borderRadius: '4',
            data: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 80]
          },
          {
            label: 'Lecturers',
            backgroundColor: '#ffc107',
            borderRadius: '4',
            data: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 80]
          },
        ]
      },
      value2: "",
      shortcuts: [
        {
          text: 'Last week',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
          },
        },
        {
          text: 'Last month',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
          },
        },
        {
          text: 'Last 3 months',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
          },
        },
      ],
    }
  },
  methods: {
    fillData() {
      let data0 = [
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt()
      ]
      let data1 = [
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt()
      ]
      let data2 = [
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt(),
        this.getRandomInt()
      ]
      this.chartData.datasets[0].data = data0
      this.chartData.datasets[1].data = data1
      this.chartData.datasets[2].data = data2
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  },
  created() {
    // this.chartData.datasets[0].data = this.report.total_course
  },
  mounted() {
    setInterval(() => {
      this.fillData()
    }, 2500)
  }
})
export default class ChartSection extends Vue {
}

</script>

<style scoped>
.chart-section {
  background-color: white;
  border-radius: 20px;
  padding: 40px;
  margin-top: 10px;
}

p {
  font-weight: 600;
  font-size: 18px;
  line-height: 19px;
  color: #797D8C;
}

.date-picker .block:last-child {
  border-right: none;
}
</style>