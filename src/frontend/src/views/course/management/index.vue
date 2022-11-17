<template>
  <div class="main-container p-2">
    <div class="course-container">
      <router-link to="/categories/management" class="button is-rounded btn-change">
        <font-awesome-icon icon="fa-solid fa-tags" class="mr-2"/>
        |
        <font-awesome-icon icon="fa-solid fa-chalkboard" class="ml-2 mr-2"/>
        Course Management
      </router-link>
      <el-row :gutter="20">
        <el-col :xl="8" :lg="8" :sm="12" :xs="24" v-for="course in courses">
          <CourseItem :course="course" @deleteCourse="getListCourses"></CourseItem>
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
import {Options, Vue} from "vue-class-component";
import {mapActions, mapMutations} from "vuex";
import CourseItem from "@/components/CourseItem.vue";
import {ActionTypes} from "@/types/store/ActionTypes";
import Course from "@/types/course/CourseItem";
import Pagination from "@/components/Pagination.vue";

@Options({
  components: {
    CourseItem,
    Pagination
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
      this.total = data.count
      this.courses.unshift({} as Course)
      this.SET_LOADING(false)
    }
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
  async created() {
    await this.getListCourses();
  },
  mounted() {
    document.title = 'Course Management | E-Learning'
  }
})

export default class CourseManagementPage extends Vue {
}
</script>

<style scoped lang="scss">
.main-container {
  h1 {
    font-size: 1.3rem;
    color: #666;
    font-weight: 500;
  }

  .course-container {
    margin-bottom: 10px;
  }

  .btn-change {
    font-size: 0.95rem;
    font-weight: 450;
    margin-bottom: 25px;
  }
}
</style>
