<template>
  <router-link v-if="course.title != undefined" :to="'/courses/'+course.slug">
    <div class="course-item">

      <div class="course-item__title columns">
        <h3 class="column p-0">{{ course.title }}</h3>
          
        <div class="column is-flex is-justify-content-end p-0">
          <el-dropdown size="large">
            <span class="course-item__ellipsis el-dropdown-link" @click.prevent="">
              <font-awesome-icon icon="fa-solid fa-ellipsis"/>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <router-link :to="'/courses/' + course.slug">
                  <el-dropdown-item icon="View">
                    View detail
                  </el-dropdown-item>
                </router-link>

                <restricted-view :routes="ROUTES.COURSE_MANAGEMENT.name">
                  <router-link :to="'/courses/' + course.slug + '/edit'">
                    <el-dropdown-item icon="Edit">
                      Edit
                    </el-dropdown-item>
                  </router-link>

                  <el-dropdown-item icon="Delete" @click="dialogVisible = true">
                    Delete
                  </el-dropdown-item>
                </restricted-view>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>

      <div class="course-item__summary">
        {{ course.summary }}
      </div>

      <div class="course-item__info">
        <p class="course-item__info__instructor">
          <font-awesome-icon icon="fa-solid fa-chalkboard-user" class="mr-1"/>
          {{ course.user.full_name }}
        </p>
        <restricted-view :routes="[ROUTES.COURSE_MANAGEMENT.name]">
          <span
            :class="['tag', 'mt-2', {
            'is-black': course.status == COURSE_STATUS.DRAFT,
            'is-primary': course.status == COURSE_STATUS.PUBLISHED,
            'is-danger': course.status == COURSE_STATUS.DEACTIVATED
          }]">
            {{ course.status }}
          </span>
        </restricted-view>
      </div>

      <div class="course-item__image">
        <img v-if="!course.background"
             src="https://www.fossmint.com/wp-content/uploads/2019/02/Udemy-Python-Learning-Courses-for-Beginners.png">
        <img v-else :src="course.background">
      </div>

      <restricted-view :routes="[ROUTES.MY_COURSE.name]">
        <div class="is-flex is-justify-content-end mt-3 mr-2"
             style="font-size: 0.8rem; font-weight: 450; color: #777777">
          {{ course.lessons_completed }} / {{ total_lesson }}
        </div>
        <div class="progress-bar">
          <el-progress
            :stroke-width="16"
            :percentage="course_progress"
            color="#00d102"
            :show-text="false"
          />
        </div>
      </restricted-view>

    </div>
  </router-link>

  <router-link v-else to="/courses/add">
    <div class="course-item is-flex" style="height: calc(100% - 40px); min-height: 300px">
      <div class="button-add">
        <font-awesome-icon icon="fa-solid fa-plus"/>
      </div>
    </div>
  </router-link>

  <restricted-view :routes="[ROUTES.COURSE_MANAGEMENT.name]">
    <el-dialog
      v-model="dialogVisible"
      title="Delete Course"
      width="50%"
      style="border-radius: 20px"
      center>
      <span style="word-break: break-word">
        Are you sure to delete this course? This should be undone!
      </span>
      <template #footer>
        <span class="dialog-footer">
          <button class="button is-light is-rounded mr-3" @click="dialogVisible = false">Cancel</button>
          <button class="button is-dark is-rounded" @click="handleDelete">
            Confirm
          </button>
        </span>
      </template>
    </el-dialog>
  </restricted-view>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import Course from "@/types/course/CourseItem";
import {mapActions} from "vuex";
import {ActionTypes} from "@/types/store/ActionTypes";
import {ElMessage} from "element-plus";
import {COURSE_STATUS} from "@/const/course_status";
import RestrictedView from "@/components/RestrictedView.vue";
import {ROUTES} from "@/const/routes";

@Options({
  components: {RestrictedView},
  props: {
    course: {
      type: Object,
      default: {
        chapters: [
          {lessons: []}
        ],
        lessons_completed: 0
      }
    },
  },
  data() {
    return {
      dialogVisible: false,
      ROUTES: ROUTES,
      COURSE_STATUS: COURSE_STATUS
    }
  },
  computed: {
    course_progress() {
      if (!this.total_lesson || !this.course.lessons_completed) return 0
      return Math.round(this.course.lessons_completed*100 / this.total_lesson)
    },
    total_lesson() {
      if (!this.course.chapters) return 0
      let result = this.course.chapters.reduce(
        (prev: number, curr: any) => {
          return prev + curr.lessons.length
        }, 0
      )
      return result
    }
  },
  emits: ['deleteCourse'],
  methods: {
    ...mapActions("course", [ActionTypes.DELETE_COURSE]),
    async handleDelete() {
      let response: any = await this.DELETE_COURSE(this.course.id)
      if (response.status == 204) {
        ElMessage({
          message: `Deleted ${this.course.title} successfully.`,
          type: 'success',
        })
        this.$emit('delete-course')
      } else {
        ElMessage.error('Delete course failed.')
      }
      this.dialogVisible = false
    }
  }
})

export default class CourseItem extends Vue {
  course!: Course
}
</script>

<style scoped lang="scss">
.course-item {
  background-color: white;
  border-top: 10px solid #024547;
  border-radius: 10px;
  padding: 15px 15px 10px 15px;
  transition: all 0.1s ease-in-out;
  margin-bottom: 40px;
  display: block;

  &__title {
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0 10px;
  }

  &__ellipsis {
    height: 32px;
    width: 32px;
    border-radius: 20px;
    text-align: center;
    line-height: 32px;
  }

  &__ellipsis:hover {
    background-color: #024547;
    color: white;
  }

  &__summary {
    display: -webkit-box;
    font-size: 0.9rem;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 60px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    margin: 10px;
    font-weight: 400;
    color: #777;
  }

  &__info {
    color: #ccc;
    font-size: 0.9rem;
    padding: 15px 10px;
    font-weight: 450;
    text-transform: capitalize;
  }

  &__image {
    img {
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      border-radius: 10px;
      width: 100%;
      aspect-ratio: 16/9;
      object-fit: cover;
    }
  }

  .button-add {
    display: block;
    font-size: 2rem;
    background-color: #024547;
    color: #fff;
    width: 64px;
    height: 64px;
    text-align: center;
    line-height: 64px;
    border-radius: 60px;
    margin: auto;
  }
}

a {
  color: #024547;
}

.course-item:hover {
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-top: 10px solid #333;
}

</style>

<style scoped>
:deep(.el-dropdown-menu__item:not(.is-disabled):focus) {
  color: #fff;
  background-color: rgba(2, 69, 71, 0.85);
}

.progress-bar .el-progress--line {
  margin-bottom: 10px;
  width: 100%;
}

:deep(.progress-bar .el-progress-bar__inner) {
  margin: 4px;
  height: calc(100% - 8px);
  max-width: calc(100% - 8px);
}

</style>
