<template>
  <div v-show="!is_loading" class="p-3">
    <title-bar :title="'Overview'"></title-bar>
    <TotalSection :report="total_report"></TotalSection>
    <ChartSection :report="course_report"></ChartSection>
    <ListSection
      :top_users="total_report.top_user"
      :courses="course_report.courses"
      :users="user_report.users"
    ></ListSection>
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

@Options({
  components: {
    TitleBar,
    TotalSection,
    ChartSection,
    ListSection
  },
  data() {
    return {
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
      query: {
        page: 1,
        ordering: "-title",
      },
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

        const course_report_response: any = await this.FETCH_ADMIN_REPORT_COURSE(this.query)
        this.course_report = course_report_response.data.results

        const user_report_response: any = await this.FETCH_ADMIN_REPORT_USER()
        this.user_report = user_report_response.data.results
      }

      if (this.userInfo.role == ROLES.LECTURER) {
        const response: any = await this.FETCH_LECTURER_REPORT()
        this.total_report = response.data
        this.course_report.courses = response.data.course
      }

      this.SET_LOADING(false)
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

</style>