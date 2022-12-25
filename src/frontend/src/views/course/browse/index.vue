<template>
  <div class="main-container p-2">
    <div class="course-container">
      <title-bar :title="'Browsing Courses'"></title-bar>

      <el-select-v2
        v-model="query.categories"
        :options="topics"
        placeholder="Select category for filter"
        style="width: 100%"
        size="large"
        class="mb-5"
        multiple
      />

      <span v-if="loading" class="p-6 is-flex is-justify-content-center">
        <button class="button is-text" disabled style="text-decoration: none">
          <el-icon class="is-loading mr-2">
            <Loading/>
          </el-icon>
          Loading...
        </button>
      </span>

      <el-row v-show="!loading" :gutter="20">
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
import TitleBar from "@/components/TitleBar.vue";

@Options({
  components: {
    TitleBar,
    CourseItem,
    Pagination
  },
  data() {
    return {
      loading: false,
      courses: [] as Course[],
      total: 0,
      query: {
        page: 1,
        page_size: 12,
        q: "",
        categories: []
      },
      topics: [],
    }
  },
  methods: {
    ...mapActions("course", [ActionTypes.FETCH_COURSES]),
    ...mapActions("topic", [ActionTypes.FETCH_TOPICS]),
    ...mapMutations(["SET_LOADING"]),
    async getListCourses() {
      this.loading = true
      let data = await this.FETCH_COURSES(this.query)
      this.courses = data.results as Course[]
      this.total = data.count
      this.loading = false
    },

    async getListTopics() {
      const data: any = await this.FETCH_TOPICS(this.query)
      this.topics = data.results.map((topic: any) => ({
        value: topic.id,
        label: topic.title,
      }))
      this.total = data.count
    },
  },
  watch: {
    query: {
      deep: true,
      handler: async function () {
        await this.getListCourses();
        this.$router.replace({query: this.query}).catch((err: any) => err);
      },
    },
    '$route.query.q': {
      handler() {
        this.query = this.$route.query
      },
      deep: true,
    }
  },
  async created() {
    await this.getListTopics()
    if (Object.keys(this.$route.query).length != 0) {
      this.query = this.$route.query
      return
    }
    await this.getListCourses();
  },
  mounted() {
    document.title = 'Browse Online Courses | E-Learning'
  }
})

export default class BrowseCoursePage extends Vue {
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

  .btn-change {
    font-size: 0.95rem;
    font-weight: 450;
    margin-bottom: 25px;
  }
}
</style>

<style scoped>
:deep(.el-select-v2__wrapper) {
  border-radius: 10px !important;
}
</style>
