<template>
  <CoverImage
    :image="image"
    :is_freeze="is_freeze"
    @changeImage="this.image = $event"
    @changeFile="this.background = $event"
  >
  </CoverImage>

  <el-form
    ref="formRef"
    label-position="top"
    label-width="100px"
    :model="course"
    size="large"
    class="p-6"
    :disabled="is_freeze"
    :rules="rules"
  >

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
        Save and continue
      </button>
      <button
        class="button is-dark is-rounded"
        @click.prevent="resetForm($refs.formRef)"
        :disabled="is_freeze">
        Reset
      </button>
    </div>
  </el-form>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TopicItem from "@/types/course/TopicItem";
import TextEditor from "@/components/TextEditor.vue"
import { ElNotification, FormInstance } from "element-plus";
import { COURSE_STATUS } from "@/const/course_status";
import { mapGetters, mapActions } from "vuex";
import { ActionTypes } from "@/types/store/ActionTypes";
import CoverImage from "@/components/CoverImage.vue";

@Options({
  components: {
    TextEditor,
    CoverImage
  },
  props: {
    options: [] as TopicItem[],
  },
  data() {
    return {
      course: {
        title: "",
        summary: "",
        description: "",
        background: null,
        topics: []
      },
      image: "",
      showUpload: true,
      background: null,
      is_freeze: false,
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
      expandEditor: false
    }
  },
  methods: {
    ...mapActions("course",[ActionTypes.CREATE_COURSE]),
    async handleSubmit(formEl: FormInstance | undefined){
      if (!formEl) return
      await formEl.validate(async (valid, fields) => {
        this.is_freeze = true

        if (valid) {
          if (this.background == null){
            ElNotification({
              title: 'Missing background',
              message: 'Please choose background for your course!',
              type: 'warning',
            })
            this.is_freeze = false
            return
          }

          let formData = new FormData();

          formData.append("title", this.course.title);
          formData.append("summary", this.course.summary);
          formData.append("description", this.course.description);
          formData.append("status", COURSE_STATUS.DRAFT);
          formData.append("background", this.background?.raw)
          formData.append("user_id", this.tokenInfo.user_id);

          this.course.topics.map((topic_id: string) => {
            formData.append("topic_ids", topic_id ? topic_id : "")
          })

          const response: any = await this.CREATE_COURSE(formData)

          if (response.status == 201) {
            this.$router.push({
              name: "edit-course",
              params: {course_slug: response.data.slug},
            });

            ElNotification({
              title: 'Create course successfully',
              message: 'Edit your course detail and publish for everyone now!',
              type: 'success',
            })
          } else {
            ElNotification({
              title: 'Error',
              message: 'Create course failed!',
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
    resetForm(formEl: FormInstance | undefined) {
      if (!formEl) return
      formEl.resetFields()
    }
  },
  computed: {
    ...mapGetters("authentication", ["tokenInfo"])
  },
  created() {
    this.unwatchCourse = this.$watch('course', (newVal: any) => {
      if (newVal) {
        this.image = newVal.background
        this.unwatchCourse();
      }
    });
  }
})

export default class AddCoursePage extends Vue {
  options!: TopicItem[]
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