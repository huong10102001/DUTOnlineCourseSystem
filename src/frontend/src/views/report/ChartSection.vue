<template>
  <div class="chart-section">
    <div class="columns is-flex is-vcentered">
      <div class="column">
        <h3 class="is-size-5 mb-2" style="font-weight: 500">Overall</h3>
      </div>
      <div class="column is-flex is-justify-content-end">
        <el-select
          v-model="_year"
          class="m-2"
          placeholder="Year"
          size="large"
          style="width: 100px"
          @change="$emit('changeYear', _year)"
        >
          <el-option
            v-for="item in yearOptions"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
    </div>
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
    course_report: {
      type: Object,
      default: {
        month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        total_course: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      }
    },
    user_report: {
      type: Object,
      default: {
        month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        total_user: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        total_lecturer: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      }
    },
    year: 2022
  },
  data() {
    return {
      _year: this.year,
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
            label: 'Users',
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
      yearOptions: []
    }
  },
  beforeUpdate() {
    this.chartData.labels = this.course_report.month
    this.chartData.datasets[0].data = this.course_report.total_course
    this.chartData.datasets[1].data = this.user_report.total_user
    this.chartData.datasets[2].data = this.user_report.total_lecturer
  },
  created() {
    for (let i = 2020; i <= new Date().getFullYear(); i++) {
      this.yearOptions.push(i)
    }
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