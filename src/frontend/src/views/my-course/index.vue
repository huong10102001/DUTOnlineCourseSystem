<template>
  <div class="main-container p-2">
    <div class="course-container" v-if="search">
      <h1>My course</h1>
      <el-row :gutter="40">
        <el-col :xl="8" :lg="8" :sm="12" :xs="24" v-for="course in filteredCourse">
          <CourseItem :course="course"></CourseItem>
        </el-col>
      </el-row>
    </div>

    <div class="course-container" v-else>
      <h1>My course</h1>
      <el-row :gutter="40">
        <el-col :xl="8" :lg="8" :sm="12" :xs="24" v-for="course in courses">
          <CourseItem :course="course"></CourseItem>
        </el-col>
      </el-row>
    </div>

    <Pagination
      :total="total"
      :page="query.page"
      :page_size="query.page_size"
      @changePage="query.page = $event">
    </Pagination>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapActions, mapMutations } from "vuex";
import CourseItem from "@/components/CourseItem.vue";
import { ActionTypes } from "@/types/store/ActionTypes";
import Course from "@/types/course/CourseItem";
import Pagination from "@/components/Pagination.vue";

@Options({
  props: {
    search: String,
  },
  components: {
    Pagination,
    CourseItem
  },
  data() {
    return {
      courses: [] as Course[],
      total: 0,
      query: {
        page: 1,
        page_size: 6,
      },
    }
  },
  methods: {
    ...mapActions("courseProcess", [ActionTypes.FETCH_USER_COURSES_PROCESS]),
    ...mapMutations(["SET_LOADING"]),
    async getListCourses() {
      this.SET_LOADING(true)
      let data = await this.FETCH_USER_COURSES_PROCESS(this.query)
      this.courses = data.results as Course[]
      this.total = data.count
      this.SET_LOADING(false)
    },
    async searchCourse(){
      let query = {
        page: 1,
        page_size: 12,
        title: this.search
      }
      let data = await this.FETCH_USER_COURSES_PROCESS(query)
      this.courseList = data.results as Course[]
    }
  },
  async created() {
    await this.getListCourses();
  },
  watch: {
    query: {
      deep: true,
      handler: async function () {
        await this.getListCourses();
        this.$router.replace({query: this.query}).catch((err: any) => err);
      },
    }
  },
  mounted() {
    document.title = 'My Course | E-Learning'
  },
  async beforeUpdate(){
    await this.searchCourse()
  },
  computed: {
    filteredCourse() {
      return this.courseList
    }
  }
})

export default class MyCoursePage extends Vue {}
</script>

<style scoped lang="scss">
.main-container {
  h1 {
    font-size: 1.22rem;
    margin-bottom: 20px;
    color: #666;
    font-weight: 500;
  }

  .course-container {
    margin-bottom: 10px;
  }
}
</style>
