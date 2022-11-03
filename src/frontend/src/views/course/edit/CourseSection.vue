<template>
  <CoverImage
    :image="image"
    :is_freeze="is_freeze"
    @changeImage="this.image = $event"
    @changeFile="this.background = $event"
  >
  </CoverImage>

  <div class="p-6">
    <el-form
      ref="formRef"
      label-position="top"
      label-width="100px"
      :model="course"
      size="large"
      :disabled="is_freeze"
      :rules="rules"
    >

      <div class="is-flex is-justify-content-end">
        <span :class="['tag', 'mb-5', {
          'is-black': course.status == DRAFT,
          'is-primary': course.status == PUBLISHED,
          'is-danger': course.status == DEACTIVATED
        }]">
          {{ course.status }}
        </span>
      </div>

      <el-form-item prop="title">
        <span class="title is-5">Title</span>
        <el-input v-model="course.title" placeholder="Enter course title"/>
      </el-form-item>

      <el-form-item prop="topics">
        <span class="title is-5 mt-3">Category</span>
        <el-select
          v-model="course.topics"
          multiple
          filterable
          default-first-option
          :reserve-keyword="false"
          style="width: 100%"
          placeholder="Select category for your course"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item prop="summary">
        <span class="title is-5 mt-3">Short description</span>
        <el-input v-model="course.summary" type="textarea" placeholder="Tell something about this course..."/>
      </el-form-item>
      <span class="title is-5 mt-3">
        Description
        <button class="button is-light ml-2" style="font-size: 0.6rem" @click.prevent="expandEditor = true">
          <font-awesome-icon icon="fa-solid fa-up-right-and-down-left-from-center" class="mr-1" /> Expand
        </button>
      </span>
      <div :class="['mt-4', {expandEditor: expandEditor}]">
        <div :class="{expandEditor__content: expandEditor}">
          <TextEditor
            ref="editor"
            :is_freeze="is_freeze"
            :init_content="course.description"
            @contentChange="course.description = $event"
          />
          <div class="is-flex is-justify-content-center">
            <button v-show="expandEditor" class="button is-rounded" @click.prevent="expandEditor = false">Close</button>
          </div>
        </div>
      </div>
      <div class="is-flex is-justify-content-space-between">
        <button
          class="button is-success is-rounded"
          @click.prevent="handleSubmit($refs.formRef)"
          :disabled="is_freeze">
          <el-icon v-if="is_freeze" class="is-loading mr-2">
            <Loading />
          </el-icon>
          Save
        </button>
        <div>
          <button
            class="button is-success is-light is-rounded mr-2"
            v-if="course.status == DRAFT"
            @click.prevent="handlePublish">
            Publish
          </button>
          <button
            class="button is-link is-light is-rounded mr-2"
            v-if="course.status == PUBLISHED"
            @click.prevent="handleUnpublish">
            Unpublish
          </button>
          <button
            class="button is-danger is-rounded"
            @click.prevent="dialogVisible = true">
            <font-awesome-icon icon="fa-solid fa-trash" />
          </button>
        </div>
      </div>
    </el-form>
  </div>

  <el-dialog
    v-model="dialogVisible"
    title="Delete Course"
    width="50%"
    style="border-radius: 20px"
    center>
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
import { Options, Vue } from "vue-class-component";
import TopicItem from "@/types/course/TopicItem";
import TextEditor from "@/components/TextEditor.vue"
import { ElMessage, ElNotification, FormInstance } from "element-plus";
import { COURSE_STATUS } from "@/const/course_status";
import { mapActions } from "vuex";
import {ActionTypes} from "@/types/store/ActionTypes";
import CoverImage from "@/components/CoverImage.vue";

@Options({
  components: {
    CoverImage,
    TextEditor
  },
  props: {
    options: [] as TopicItem[],
    course: {}
  },
  data() {
    return {
      dialogVisible: false,
      background: null,
      image: "",
      is_freeze: false,
      expandEditor: false,
      rules: {
        title: [
          { required: true, message: 'Please input title', trigger: 'blur' },
          { min: 5, max: 100, message: 'Length should be 5 to 100', trigger: 'blur' },
        ],
        topics: [
          {
            type: 'array',
            required: true,
            message: "Please select at least one topic",
            trigger: "blur",
          },
        ],
        summary: [
          { required: true, message: 'Please input summary for this course', trigger: 'blur' },
          { min: 20, max: 200, message: 'Length should be 20 to 200', trigger: 'blur' },
        ]
      } as any,
    }
  },
  methods: {
    ...mapActions("course",[ActionTypes.UPDATE_COURSE_INFO, ActionTypes.DELETE_COURSE]),
    async handleSubmit(formEl: FormInstance | undefined){
      if (!formEl) return

      await formEl.validate(async (valid, fields) => {
        if (valid) {
          this.is_freeze = true
          let formData = new FormData();

          formData.append("title", this.course.title);
          formData.append("summary", this.course.summary);
          formData.append("description", this.course.description);
          formData.append("status", COURSE_STATUS.DRAFT);
          if (this.background != null)
            formData.append("background", this.background?.raw)

          this.course.topics.map((topic_id: string) => {
            formData.append("topic_ids", topic_id ? topic_id : "")
          })

          const response: any = await this.UPDATE_COURSE_INFO({
            form: formData,
            id: this.course.id
          })

          if (response.status == 200) {
            this.$router.push({
              name: "course-detail",
              params: {slug: response.data.slug},
            });

            ElNotification({
              title: 'Update successfully',
              message: 'Course info has been updated!',
              type: 'success',
            })
          } else {
            ElNotification({
              title: 'Error',
              message: 'Update course failed!',
              type: 'error',
            })
          }
        } else {
          ElNotification({
            title: 'Missing info',
            message: 'Please fill in all required field!',
            type: 'warning',
          })
        }
        this.is_freeze = false
      })
    },

    async handleDelete(){
      this.is_freeze = true
      let response:any = await this.DELETE_COURSE(this.course.id)
      if (response.status == 204) {
        this.$router.push('/')
        ElMessage({
          message: `Deleted ${this.course.title} successfully.`,
          type: 'success',
        })
        this.$emit('delete-course')
      } else {
        ElMessage.error('Delete course failed.')
      }
      this.dialogVisible= false
      this.is_freeze = false
    },

    async handlePublish() {
      this.is_freeze = true
      let formData = new FormData()
      formData.append("title", this.course.title);
      formData.append("summary", this.course.summary);
      formData.append("status", COURSE_STATUS.PUBLISHED);

      const response: any = await this.UPDATE_COURSE_INFO({
        form: formData,
        id: this.course.id
      })

      if (response.status == 200) {
        this.course.status = COURSE_STATUS.PUBLISHED

        ElNotification({
          title: 'Update successfully',
          message: 'Course has been published!',
          type: 'success',
        })
      } else {
        ElNotification({
          title: 'Error',
          message: 'Update course status failed!',
          type: 'error',
        })
      }

      this.is_freeze = false
    },

    async handleUnpublish() {
      this.is_freeze = true
      let formData = new FormData()
      formData.append("title", this.course.title);
      formData.append("summary", this.course.summary);
      formData.append("status", COURSE_STATUS.DRAFT);

      const response: any = await this.UPDATE_COURSE_INFO({
        form: formData,
        id: this.course.id
      })

      if (response.status == 200) {
        this.course.status = COURSE_STATUS.DRAFT

        ElNotification({
          title: 'Update successfully',
          message: 'Course status has been change to draft!',
          type: 'success',
        })
      } else {
        ElNotification({
          title: 'Error',
          message: 'Update course status failed!',
          type: 'error',
        })
      }

      this.is_freeze = false
    }
  },
  created() {
    this.unwatchCourse = this.$watch('course', (newVal: any) => {
      if (newVal) {
        this.image = newVal.background
        this.unwatchCourse();
      }
    });

    this.DRAFT = COURSE_STATUS.DRAFT
    this.PUBLISHED = COURSE_STATUS.PUBLISHED
    this.DEACTIVATED = COURSE_STATUS.DEACTIVATED
  }
})

export default class CourseSection extends Vue {
  options!: TopicItem[];
  course!: any
}
</script>

<style lang="scss" scoped>
.expandEditor {
  position: fixed;
  top: -20px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1999;
  transition: 0.3s all linear;

  &__content {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 2000;
    padding: 20px;
    width: 90%;
    background-color: white;
    transform: translate(-50%, -50%);
    border-radius: 20px;
  }
}
</style>
