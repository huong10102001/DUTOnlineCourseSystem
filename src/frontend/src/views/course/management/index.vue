<template>
  <div class="main-container p-2">
    <div class="course-container">
      <h1>All Courses</h1>
      <el-row :gutter="20">
        <el-col :xl="8" :lg="8" :sm="12" :xs="24" v-for="course in courses">
          <CourseItem :course="course"></CourseItem>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapActions, mapMutations } from "vuex";
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
        page_size: 11,
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
      this.courses.unshift({} as Course)
      this.SET_LOADING(false)
    }
  },
  watch: {
    query: {
      deep: true,
      handler: function () {
        this.getListCourses();
        this.$router.replace({ query: this.query }).catch((err: any) => err);
      },
    }
  },
  async created() {
    await this.getListCourses();
  },
  mounted() {
    document.title = 'Course Management | E-Learning'
  }
})

export default class CourseManagementPage extends Vue {}
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