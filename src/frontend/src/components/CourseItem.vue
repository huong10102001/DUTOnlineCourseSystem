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

                <router-link :to="'/courses/' + course.slug + '/edit'">
                  <el-dropdown-item v-if="$route.name == 'course-management'" icon="Edit">
                    Edit
                  </el-dropdown-item>
                </router-link>

                <el-dropdown-item v-if="$route.name == 'course-management'" icon="Delete" @click="dialogVisible = true">
                  Delete
                </el-dropdown-item>
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
        <span
          v-if="$route.name == 'course-management'"
          :class="['tag', 'mt-2', {
          'is-black': course.status == 'DRAFT',
          'is-primary': course.status == 'PUBLISHED',
          'is-danger': course.status == 'DEACTIVATED'
        }]">
          {{ course.status }}
        </span>
      </div>

      <div class="course-item__image">
        <img v-if="!course.background"
             src="https://www.fossmint.com/wp-content/uploads/2019/02/Udemy-Python-Learning-Courses-for-Beginners.png">
        <img v-else :src="course.background">
      </div>

    </div>
  </router-link>

  <router-link v-else to="/courses/add">
    <div class="course-item is-flex" style="height: calc(100% - 40px); min-height: 300px">
      <div class="button-add">
        <font-awesome-icon icon="fa-solid fa-plus"/>
      </div>
    </div>
  </router-link>
  
  <el-dialog
    v-model="dialogVisible"
    v-if="$route.name == 'course-management'"
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
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import Course from "@/types/course/CourseItem";
import { mapActions} from "vuex";
import {ActionTypes} from "@/types/store/ActionTypes";
import {ElMessage} from "element-plus";
import {COURSE_STATUS} from "@/const/course_status";

@Options({
  props: {
    course: {} as Course,
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    ...mapActions("course",[ActionTypes.DELETE_COURSE]),
    async handleDelete(){
      let response:any = await this.DELETE_COURSE(this.course.id)
      if (response.status == 204) {
        ElMessage({
          message: `Deleted ${this.course.title} successfully.`,
          type: 'success',
        })
        this.$emit('delete-course')
      } else {
        ElMessage.error('Delete course failed.')
      }
      this.dialogVisible= false
    }
  },
  created() {
    this.DRAFT = COURSE_STATUS.DRAFT
    this.PUBLISHED = COURSE_STATUS.PUBLISHED
    this.DEACTIVATED = COURSE_STATUS.DEACTIVATED
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
/deep/.el-dropdown-menu__item:not(.is-disabled):focus {
  color: #fff;
  background-color: rgba(2, 69, 71, 0.85);
}
</style>
