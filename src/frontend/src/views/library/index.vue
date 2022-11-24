<template>
  <div class="main-container p-2" v-show="!is_loading">
    <div class="course-container">
      <h1>New Courses Today</h1>
      <el-row :gutter="40">
        <el-col :xl="8" :lg="8" :sm="12" :xs="24" v-for="course in courses">
          <CourseItem :course="course"></CourseItem>
        </el-col>
      </el-row>
    </div>

    <div class="course-container">
      <h1>Most Popular</h1>
      <el-row :gutter="40">
        <el-col :xl="8" :lg="8" :sm="12" :xs="24" v-for="course in courses">
          <CourseItem :course="course"></CourseItem>
        </el-col>
      </el-row>
    </div>

    <div class="course-container">
      <h1>Weekly Trend</h1>
      <el-row :gutter="40">
        <el-col :xl="8" :lg="8" :sm="12" :xs="24" v-for="course in courses">
          <CourseItem :course="course"></CourseItem>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {mapActions, mapMutations, mapState} from "vuex";
import CourseItem from "@/components/CourseItem.vue";
import {ActionTypes} from "@/types/store/ActionTypes";
import Course from "@/types/course/CourseItem";

@Options({
  components: {
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
    ...mapActions("course", [ActionTypes.FETCH_COURSES]),
    ...mapMutations(["SET_LOADING"]),
    async getListCourses() {
      this.SET_LOADING(true)
      let data = await this.FETCH_COURSES(this.query)
      this.courses = data.results as Course[]
      this.SET_LOADING(false)
    }
  },
  computed: {
    ...mapState(["is_loading"])
  },
  async created() {
    await this.getListCourses();
  },
  mounted() {
    document.title = 'Library | E-Learning'
  }
})

export default class LibraryPage extends Vue {
}
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
