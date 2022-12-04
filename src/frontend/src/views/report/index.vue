<template>
  <div v-show="!is_loading" class="p-3">
    <title-bar :title="'Overview'"></title-bar>
    <TotalSection :report="total_report"></TotalSection>
    <ChartSection
      v-if="userInfo.role == ROLES.ADMIN"
      :course_report="course_report"
      :user_report="user_report"
      :year="year"
      @changeYear="year = $event"
    ></ChartSection>

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
            <TopUserSection :top_users="total_report.top_user"></TopUserSection>
          </el-tab-pane>
        </restricted-view>

        <el-tab-pane>
          <template #label>
          <span class="custom-tabs-label">
            <el-icon size="large"><Management/></el-icon>
            <span>Courses</span>
          </span>
          </template>
          <CourseSection
            :loading="table_loading"
            :courses="course_report.courses"
            :total="total_course"
            :query="course_query"
            @changePage="course_query.page = $event"
          ></CourseSection>
        </el-tab-pane>

        <restricted-view :roles="[ROLES.ADMIN]">
          <el-tab-pane>
            <template #label>
          <span class="custom-tabs-label">
            <el-icon size="large"><UserFilled/></el-icon>
            <span>Users</span>
          </span>
            </template>
            <UserSection
              :loading="table_loading"
              :query="user_query"
              :users="user_report.users"
              :total="total_user"
              @changePage="user_query.page = $event"
            ></UserSection>
          </el-tab-pane>
        </restricted-view>
      </el-tabs>
    </div>

  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import ChartSection from './ChartSection.vue';
import ListSection from './ListSection.vue';
import TotalSection from './TotalSection.vue'
import TitleBar from "@/components/TitleBar.vue";
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import {ActionTypes} from "@/types/store/ActionTypes";
import {ROLES} from "@/const/roles";
import RestrictedView from "@/components/RestrictedView.vue";
import TopUserSection from "@/views/report/TopUserSection.vue";
import CourseSection from "@/views/report/CourseSection.vue";
import UserSection from "@/views/report/UserSection.vue";

@Options({
  components: {
    TitleBar,
    TotalSection,
    ChartSection,
    RestrictedView,
    TopUserSection,
    CourseSection,
    UserSection
  },
  data() {
    return {
      year: new Date().getFullYear(),
      total_report: {
        total_course: 0,
        total_user: 0,
        total_lecturer: 0,
        top_user: [
          {
            id: "",
            full_name: "",
            role: "",
            avatar: "",
            bio: "",
            total_certificate: 1,
            total_answer: 0
          }
        ]
      },
      course_report: {
        courses: []
      },
      user_report: {
        users: []
      },
      course_query: {
        page: 1,
        page_size: 12,
        ordering: "-title",
        status: "",
        year: new Date().getFullYear()
      },
      total_course: 0,
      user_query: {
        page: 1,
        page_size: 12,
        role: "",
        year: new Date().getFullYear()
      },
      total_user: 0,
      ROLES: ROLES,
      table_loading: false,
      timeOut1: null,
      timeOut2: null,
      timer: 300,
    }
  },
  methods: {
    ...mapMutations(["SET_LOADING"]),
    ...mapActions("report", [
      ActionTypes.FETCH_ADMIN_REPORT_TOP_USER,
      ActionTypes.FETCH_ADMIN_REPORT_COURSE,
      ActionTypes.FETCH_LECTURER_REPORT,
      ActionTypes.FETCH_ADMIN_REPORT_USER
    ]),
    async fetchReport() {
      this.SET_LOADING(true)

      if (this.userInfo.role == ROLES.ADMIN) {
        const total_report_response: any = await this.FETCH_ADMIN_REPORT_TOP_USER()
        this.total_report = total_report_response.data

        const course_report_response: any = await this.FETCH_ADMIN_REPORT_COURSE(this.course_query)
        this.course_report = course_report_response.data.results
        this.total_course = course_report_response.data.count

        const user_report_response: any = await this.FETCH_ADMIN_REPORT_USER(this.user_query)
        this.user_report = user_report_response.data.results
        this.total_user = user_report_response.data.count
      }

      if (this.userInfo.role == ROLES.LECTURER) {
        const response: any = await this.FETCH_LECTURER_REPORT()
        this.total_report = response.data
        this.course_report.courses = response.data.course
        this.total_course = response.data.count
      }

      this.SET_LOADING(false)
    }
  },
  watch: {
    year(){
      this.course_query.year = this.year
      this.user_query.year = this.year
    },
    course_query: {
      deep: true,
      handler() {
        clearTimeout(this.timeOut1);

        this.timeOut = setTimeout(async () => {
          this.table_loading = true
          if (this.userInfo.role == ROLES.ADMIN) {
            const course_report_response: any = await this.FETCH_ADMIN_REPORT_COURSE(this.course_query)
            this.course_report = course_report_response.data.results
            this.total_course = course_report_response.data.count
          }

          if (this.userInfo.role == ROLES.LECTURER) {
            const response: any = await this.FETCH_LECTURER_REPORT()
            this.course_report.courses = response.data.course
            this.total_course = response.data.count
          }

          this.table_loading = false
        }, this.timer);
      },
    },
    user_query: {
      deep: true,
      handler() {
        clearTimeout(this.timeOut2);

        this.timeOut = setTimeout(async () => {
          this.table_loading = true
          const user_report_response: any = await this.FETCH_ADMIN_REPORT_USER(this.user_query)
          this.user_report = user_report_response.data.results
          this.total_user = user_report_response.data.count
          this.table_loading = false
        }, this.timer);
      },
    }
  },
  computed: {
    ...mapState(["is_loading"]),
    ...mapGetters("user", ["userInfo"]),
  },
  async created() {
    await this.fetchReport()
  }
})
export default class ReportPage extends Vue {
}
</script>

<style>
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