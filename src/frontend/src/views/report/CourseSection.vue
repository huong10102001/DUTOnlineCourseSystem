<template>
  <el-main>
    <el-input
      v-model="query.q"
      placeholder="Search for course..."
      size="large"
      class="mb-5"
    >
      <template #prepend>
        <el-button icon="Search"/>
      </template>
      <template #append>
        <el-select
          v-model="query.status"
          clearable
          placeholder="Status"
          size="large"
          style="width: 115px"
        >
          <el-option
            v-for="item in status_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>
    </el-input>
    <el-table
      highlight-current-row
      :data="courses"
      v-loading="loading"
      stripe
      size="large"
    >
      <el-table-column type="index" sortable label="#" align="center" width="80"/>
      <el-table-column prop="title" sortable label="Title" min-width="250"/>

      <el-table-column prop="user.full_name" sortable label="Lecturer" width="150">
        <template #default="scope">
          <div class="is-capitalized">
            {{ scope.row.user.full_name }}
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="status" sortable label="Status" width="120">
        <template #default="scope">
          <div :class="['tag', 'is-light',
            {'is-success': scope.row.status == COURSE_STATUS.PUBLISHED},
            {'is-info': scope.row.status == COURSE_STATUS.DRAFT},
            {'is-warning': scope.row.status == COURSE_STATUS.DEACTIVATED},
          ]"
          >
            {{ scope.row.status }}
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="total_user_per_course" align="center" sortable label="Total users" width="130">
        <template #default="scope">
          <div>
            <font-awesome-icon icon="fa-solid fa-user" class="mr-1"/>
            {{ scope.row.total_user_per_course }}
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="total_cost_per_course" sortable label="Profit" width="130">
        <template #default="scope">
          <div>
            <font-awesome-icon icon="fa-solid fa-dollar-sign" class="mr-1"/>
            {{ scope.row.total_cost_per_course }}
          </div>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        label="Operations"
        width="160"
        align="center"
        prop="id"
      >
        <template #default="scope">
          <el-button text size="default" class="p-1" icon="View"
                     @click="$router.push({name:'course-detail', params: {course_slug: scope.row.slug}})"></el-button>
          <el-button text size="default" class="p-1" icon="Edit"
                     @click="$router.push({name:'edit-course', params: {course_slug: scope.row.slug}})"></el-button>
          <el-button text size="default" class="p-1" icon="Lock"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination
      :total="total"
      :page="query.page"
      :page_size="query.page_size"
      @changePage="$emit('changePage', $event)">
    </Pagination>
  </el-main>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {COURSE_STATUS} from "@/const/course_status";
import Pagination from "@/components/Pagination.vue";

@Options({
  props: {
    courses: {
      type: Array,
      default: [
        {
          id: "",
          title: "",
          summary: "",
          user: {
            "full_name": "",
          },
          slug: "",
          status: "",
          cost: 0.0,
          created_at: "",
          total_user_per_course: 0,
          total_cost_per_course: 0.0
        },
      ]
    },
    total: 0,
    query: {
      page: 1,
      page_size: 12,
      ordering: "-title",
      q: "",
      status: ""
    },
    loading: false,
  },
  components: {
    Pagination
  },
  data() {
    return {
      COURSE_STATUS: COURSE_STATUS,
      status_options: [
        {label: "All", value: ""},
        {label: "Published", value: COURSE_STATUS.PUBLISHED},
        {label: "Draft", value: COURSE_STATUS.DRAFT},
        {label: "Deactivated", value: COURSE_STATUS.DEACTIVATED},
      ]
    }
  },
})
export default class CourseSection extends Vue {
}
</script>

<style scoped>

</style>