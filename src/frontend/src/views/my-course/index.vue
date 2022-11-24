<template>
  <div class="main-container p-2" v-show="!is_loading">
    <div class="course-container">
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
import {mapActions, mapMutations, mapState} from "vuex";
import CourseItem from "@/components/CourseItem.vue";
import { ActionTypes } from "@/types/store/ActionTypes";
import Course from "@/types/course/CourseItem";
import Pagination from "@/components/Pagination.vue";

@Options({
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
  computed: {
    ...mapState(["is_loading"])
  },
  mounted() {
    document.title = 'My Course | E-Learning'
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
