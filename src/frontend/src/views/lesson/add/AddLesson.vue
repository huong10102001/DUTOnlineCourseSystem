<template>
  <CoverImage
    :image="course.background"
    :is_freeze="true"
  >
  </CoverImage>

  <el-form
    ref="formRef"
    label-position="top"
    label-width="100px"
    :model="lesson"
    size="large"
    class="p-6"
    :disabled="is_freeze"
    :rules="rules"
  >

    <div class="tags are-large is-flex is-justify-content-end">
      <span class="tag">{{ info_text}}</span>
    </div>

    <el-form-item prop="title">
      <span class="title is-5">Title</span>
      <el-input v-model="lesson.title" placeholder="Enter lesson title"/>
    </el-form-item>

    <el-form-item prop="type">
      <span class="title is-5 mt-3" style="width: 100%">Type</span>
      <el-radio-group v-model="type" size="large">
        <el-radio-button label="Video"/>
        <el-radio-button label="Document"/>
      </el-radio-group>
    </el-form-item>

    <FileUpload :type="type" @changeFile="file = $event"></FileUpload>

    <span class="title is-5 mt-3">
      Content
      <button class="button is-light ml-2" style="font-size: 0.6rem" @click.prevent="expandEditor = true">
        <font-awesome-icon icon="fa-solid fa-up-right-and-down-left-from-center" class="mr-1"/> Expand
      </button>
    </span>
    <div :class="['mt-4', {expandEditor: expandEditor}]">
      <div :class="{expandEditor__content: expandEditor}">
        <TextEditor
          ref="editor"
          :is_freeze="is_freeze"
          :init_content="lesson.content"
          @contentChange="lesson.content = $event"
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
          <Loading/>
        </el-icon>
        Save
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
import {Options, Vue} from "vue-class-component";
import TopicItem from "@/types/course/TopicItem";
import TextEditor from "@/components/TextEditor.vue"
import {ElNotification, FormInstance} from "element-plus";
import {COURSE_STATUS} from "@/const/course_status";
import {mapGetters, mapActions} from "vuex";
import {ActionTypes} from "@/types/store/ActionTypes";
import CoverImage from "@/components/CoverImage.vue";
import CourseItem from "@/types/course/CourseItem";
import FileUpload from "@/components/FileUpload.vue";

@Options({
  components: {
    FileUpload,
    TextEditor,
    CoverImage
  },
  props: {
    course: {} as CourseItem,
    options: []
  },
  data() {
    return {
      lesson: {
        title: "",
        content: "",
      },
      type: "Video",
      file: {} as any,
      is_freeze: false,
      rules: {
        title: [
          {required: true, message: 'Please input title', trigger: 'blur'},
          {min: 5, max: 100, message: 'Length should be 5 to 100', trigger: 'blur'},
        ],
      } as any,
      expandEditor: false,
      info_text: "Create lesson for chapter "
    }
  },
  methods: {
    ...mapActions("lesson", [ActionTypes.CREATE_LESSON]),
    async handleSubmit(formEl: FormInstance | undefined) {
      if (!formEl) return
      await formEl.validate(async (valid, fields) => {
        this.is_freeze = true

        if (valid) {
          if (this.file == null) {
            ElNotification({
              title: 'Missing attachment',
              message: 'Please select attachment for your lesson!',
              type: 'warning',
            })
            this.is_freeze = false
            return
          }

          let formData = new FormData();

          formData.append("file", this.file.raw ? this.file.raw : this.file);
          formData.append("file_type", this.type);
          formData.append("lesson", JSON.stringify(this.lesson));

          const response: any = await this.CREATE_LESSON({
            course_id: this.course.id,
            chapter_id: this.currentChapter.id,
            formData: formData
          })

          if (response.status == 201) {
            this.$router.push({
              name: "edit-course",
              params: {course_slug: this.course.slug},
            });

            ElNotification({
              title: 'Create lesson successfully',
              message: 'Your lesson has been created!',
              type: 'success',
            })
          } else {
            ElNotification({
              title: 'Error',
              message: 'Create lesson failed!',
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
    },
  },
  computed: {
    ...mapGetters("authentication", ["tokenInfo"]),
    currentChapter() {
      let index = this.course.chapters.map((chapter: any) => chapter.slug).indexOf(this.$route.params.chapter_slug)
      return this.course.chapters[index]
    }
  },
  updated() {
    this.info_text = this.info_text + `"${this.currentChapter.title}"`
  }
})

export default class AddCoursePage extends Vue {}
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
