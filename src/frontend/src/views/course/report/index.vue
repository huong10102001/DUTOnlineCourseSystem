<template>
  <div class="main-container">
    <TitleBar :title="course.title"></TitleBar>
    <ChartSection :report="report"></ChartSection>
<!--    <UserSection :users="report.users"></UserSection>-->
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {mapActions, mapGetters, mapMutations} from "vuex";
import {ActionTypes} from "@/types/store/ActionTypes";
import TitleBar from "@/components/TitleBar.vue";
import ChartSection from "@/views/course/report/ChartSection.vue";
// import UserSection from "@/views/course/report/UserSection.vue";

@Options({
  components: {
    ChartSection,
    TitleBar
  },
  data() {
    return {
      course: {} as any,
      report: {
        "date_one": [],
        "total_user": [],
        "users": []
      },
      query: {
        page: 1,
        page_size: 12,
        role: "",
      },
    }
  },
  methods: {
    ...mapActions('course', [ActionTypes.FETCH_COURSE_DETAIL]),
    ...mapActions('report', [ActionTypes.FETCH_LECTURER_REPORT_COURSE]),
    ...mapMutations(["SET_LOADING"]),
    async getCourseDetail() {
      this.SET_LOADING(true)
      let data = await this.FETCH_COURSE_DETAIL(this.$route.params.course_slug)
      if (data) {
        this.course = data
      }
      let response = await this.FETCH_LECTURER_REPORT_COURSE(this.course.id)
      if (response.status == 200) {
        this.report = response.data.results
      }
      this.SET_LOADING(false)
    }
  },
  computed: {
    ...mapGetters("user", ["userInfo"])
  },
  async created() {
    await this.getCourseDetail()
  },
  beforeUpdate() {
    document.title = this.course.title + ' | E-Learning'
  }
})

export default class CourseReport extends Vue {
}
</script>

<style lang="scss" scoped>
.report-detail {
  &__section {
    border-radius: 20px;
    font-size: 1rem;
    margin-bottom: 50px;
    background: white;
    padding: 30px;
  }
}

.main-container {
  max-width: 900px;
  margin: 0 auto;
}
</style>
