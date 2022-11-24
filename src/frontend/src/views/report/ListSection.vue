<template>
  <div class="list-section">
    <el-tabs>
      <restricted-view :roles="[ROLES.ADMIN]">
        <el-tab-pane>
          <template #label>
          <span class="custom-tabs-label">
            <el-icon size="large"><Histogram/></el-icon>
            <span>Rank</span>
          </span>
          </template>
          <TopUserSection :top_users="top_users"></TopUserSection>
        </el-tab-pane>
      </restricted-view>

      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon size="large"><Management/></el-icon>
            <span>Courses</span>
          </span>
        </template>
        <CourseSection :courses="courses"></CourseSection>
      </el-tab-pane>

      <restricted-view :roles="[ROLES.ADMIN]">
        <el-tab-pane>
          <template #label>
          <span class="custom-tabs-label">
            <el-icon size="large"><UserFilled/></el-icon>
            <span>Users</span>
          </span>
          </template>
          <UserSection :users="users"></UserSection>
        </el-tab-pane>
      </restricted-view>
    </el-tabs>
  </div>

</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import TopUserSection from './TopUserSection.vue';
import CourseSection from './CourseSection.vue';
import UserSection from './UserSection.vue';
import RestrictedView from "@/components/RestrictedView.vue";
import {ROLES} from "@/const/roles";

@Options({
  components: {
    RestrictedView,
    TopUserSection,
    CourseSection,
    UserSection
  },
  props: {
    top_users: {
      type: Array,
      default: [
        {
          id: "",
          full_name: "",
          role: "",
          avatar: "",
          bio: "",
          total_certificate: 1,
          total_answer: 0
        } as any
      ]
    },
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
  },
  data() {
    return {
      ROLES: ROLES
    }
  },
})
export default class ListSection extends Vue {
}
</script>

<style scoped>
.list-section {
  margin-top: 30px;
  background: #FFFFFF;
  border-radius: 20px;
  padding: 20px 40px;
}

.custom-tabs-label .el-icon {
  vertical-align: middle;
}

.custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}

.el-main {
  padding: 0;
}
</style>