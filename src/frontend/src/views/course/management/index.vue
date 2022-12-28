<template>
  <div class="main-container p-2">
    <div class="course-container">
      <router-link to="/categories/management" class="button is-rounded btn-change">
        <font-awesome-icon icon="fa-solid fa-tags" class="mr-2"/>
        |
        <font-awesome-icon icon="fa-solid fa-chalkboard" class="ml-2 mr-2"/>
        Course Management
      </router-link>

      <el-row :gutter="20" class="mb-4 is-vcentered">
        <el-col :md="12">
          <el-select-v2
            v-model="query.categories"
            :options="topics"
            placeholder="Categories"
            style="width: 100%; height: 100%"
            size="large"
            multiple
          />
        </el-col>

        <el-col :md="12" align="right">
          <el-radio-group
            v-model="query.status"
            size="large"
            style="height: 100%">
            <el-radio-button label="ALL"/>
            <el-radio-button :label="COURSE_STATUS.DRAFT"/>
            <el-radio-button :label="COURSE_STATUS.PUBLISHED"/>
            <el-radio-button :label="COURSE_STATUS.DEACTIVATED" v-if="userInfo.role == ROLES.ADMIN"/>
          </el-radio-group>
        </el-col>
      </el-row>

      <el-row :gutter="20" v-show="!loading">
        <el-col :xl="8" :lg="8" :sm="12" :xs="24" v-for="course in courses">
          <CourseItem :course="course" @deleteCourse="getListCourses"></CourseItem>
        </el-col>
      </el-row>
      <span v-if="loading" class="p-6 is-flex is-justify-content-center">
        <button class="button is-text" disabled style="text-decoration: none">
          <el-icon class="is-loading mr-2">
            <Loading/>
          </el-icon>
          Loading...
        </button>
      </span>
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
import {mapActions, mapGetters, mapMutations} from "vuex";
import CourseItem from "@/components/CourseItem.vue";
import {ActionTypes} from "@/types/store/ActionTypes";
import Course from "@/types/course/CourseItem";
import Pagination from "@/components/Pagination.vue";
import {COURSE_STATUS} from "@/const/course_status";
import TopicItem from "@/types/course/TopicItem";
import {ElNotification} from "element-plus";
import {ROLES} from "@/const/roles";

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
        q: "",
        status: "ALL",
        categories: []
      },
      topics: [],
      COURSE_STATUS: COURSE_STATUS,
      loading: false,
      timeOut: null,
      timer: 300,
      ROLES: ROLES
    }
  },
  computed: {
    ...mapGetters("user", ['userInfo'])
  },
  methods: {
    ...mapActions("course", [ActionTypes.FETCH_COURSE_MANAGEMENT]),
    ...mapActions("topic", [ActionTypes.FETCH_TOPICS]),
    ...mapMutations(["SET_LOADING"]),
    async getListCourses() {
      let data = await this.FETCH_COURSE_MANAGEMENT(this.query)
      if (data) {
        this.courses = data.results
        this.total = data.count
      } else {
        this.courses = []
        this.total = 0
      }
      this.courses.unshift({} as Course)
    },
    async getListTopics() {
      const data: any = await this.FETCH_TOPICS(this.query)
      this.topics = data.results.map((topic: any) => ({
        value: topic.id,
        label: topic.title,
      }))
    },
  },
  watch: {
    query: {
      deep: true,
      handler: async function () {
        this.loading = true
        await this.getListCourses();
        this.loading = false
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
    this.SET_LOADING(true)
    await this.getListTopics()
    await this.getListCourses()
    this.SET_LOADING(false)
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
