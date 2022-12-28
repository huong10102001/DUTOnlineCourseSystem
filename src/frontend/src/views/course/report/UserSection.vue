<template>
  <el-main>
    <el-table
      highlight-current-row
      :data="users"
      v-loading="loading"
      stripe
      size="large"
    >
      <el-table-column type="index" sortable label="#" align="center" width="80"/>
      <el-table-column prop="full_name" sortable label="Name" min-width="250">
        <template #default="scope">
          <a
            :href="`/profile?id=${scope.row.id}`"
            target="_blank"
            style="color: #555"
          >
            <strong>{{ scope.row.full_name }}</strong>
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="role" sortable label="Role" width="150"/>

      <el-table-column prop="total_certificate" sortable align="center" label="Certificates" width="150">
        <template #default="scope">
          <div>
            <font-awesome-icon icon="fa-solid fa-certificate" class="mr-1"/>
            {{ scope.row.total_certificate }}
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="total_course_apply" sortable align="center" label="Enrolled" width="150px">
        <template #default="scope">
          <div>
            <font-awesome-icon icon="fa-solid fa-chalkboard-user" class="mr-1"/>
            {{ scope.row.total_course_apply }} courses
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="total_answer" sortable align="center" label="Answered" width="150px">
        <template #default="scope">
          <div>
            <font-awesome-icon icon="fa-solid fa-comment" class="mr-1"/>
            {{ scope.row.total_answer }}
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="total_course_of_lecturer" sortable align="center" label="Published" width="150px">
        <template #default="scope">
          <div>
            <font-awesome-icon icon="fa-solid fa-chalkboard-user" class="mr-1"/>
            {{ scope.row.total_course_of_lecturer }} courses
          </div>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import Pagination from "@/components/Pagination.vue";
import {ROLES} from "@/const/roles";

@Options({
  props: {
    users: {
      type: Array,
      default: [
        {
          id: "",
          full_name: "",
          role: "",
          avatar: "",
          total_certificate: 0,
          total_answer: 0,
          total_course_apply: 0,
          total_course_of_lecturer: 0
        } as any
      ]
    },
    total: 0,
    query: {
      page: 1,
      page_size: 12,
      q: "",
      role: ""
    },
    loading: false,
  },
  components: {
    Pagination
  },
  data() {
    return {
      role_options: [
        {label: "All", value: ""},
        {label: "Admin", value: ROLES.ADMIN},
        {label: "Lecturer", value: ROLES.LECTURER},
        {label: "User", value: ROLES.USER},
      ]
    }
  }
})
export default class UserSection extends Vue {
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap');

p {
  font-family: 'Nunito';
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: #797D8C;
}

h1 {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  color: #04103B;
  mix-blend-mode: normal;
}

h2 {
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 0.02em;
  color: #000000;
  opacity: 0.5;
}
</style>