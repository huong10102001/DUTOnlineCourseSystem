<template>
  <el-row v-if="userInfo.role == ROLES.ADMIN" :gutter="16">
    <el-col :sm="6" :xs="12">
      <div class="total">
        <h1>Users</h1>
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
  <el-row v-if="userInfo.role == ROLES.LECTURER" :gutter="16">
    <el-col :sm="8" :xs="24">
      <div class="total">
        <h1>Users</h1>
        <span>{{ report.total_user }}</span>
      </div>
    </el-col>
    <el-col :sm="8" :xs="24">
      <div class="total">
        <h1>Courses</h1>
        <span>{{ report.total_course }}</span>
      </div>
    </el-col>
    <el-col :sm="8" :xs="24">
      <div class="total">
        <h1>Profit</h1>
        <span>$0.0</span>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {ROLES} from "@/const/roles";
import {mapGetters, mapState} from "vuex";

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
      ROLES: ROLES
    }
  },
  computed: {
    ...mapGetters("user", ["userInfo"]),
  },
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