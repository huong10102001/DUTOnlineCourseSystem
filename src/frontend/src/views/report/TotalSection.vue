<template>
  <el-row :gutter="16">
    <el-col :sm="6" :xs="12">
      <div class="total">
        <h1>Learners</h1>
        <span>{{ report.total_user }}</span>
      </div>
    </el-col>
    <el-col :sm="6" :xs="12">
      <div class="total">
        <h1>Lecturers</h1>
        <span>{{ report.total_lecturer }}</span>
      </div>
    </el-col>
    <el-col :sm="6" :xs="12">
      <div class="total">
        <h1>Courses</h1>
        <span>{{ report.total_course }}</span>
      </div>
    </el-col>
    <el-col :sm="6" :xs="12">
      <div class="total">
        <h1>Profit</h1>
        <span>$0.0</span>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';

@Options({
  props: {
    report: {
      total_course: 0,
      total_user: 0,
      total_lecturer: 0,
    } as any
  },
  data() {
    return {

    }
  }
})
export default class TotalSection extends Vue {
}
</script>

<style scoped>
.total {
  background: #FFFFFF;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
}

h1 {
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: #797D8C;
}

span {
  font-weight: 700;
  font-size: 32px;
  line-height: 44px;
  color: #04103B;
}
</style>