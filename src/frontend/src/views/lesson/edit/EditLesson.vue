<template>
  <div class="edit-section">
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
        <span class="is-size-6">{{ info_text }}</span>
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

      <el-form-item>
      <span class="title is-5">
        Current Attachment
        <a :href="lesson.attachment.file" target="_blank">
          <font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square"/>
        </a>
      </span>
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="copyContent"
          placement="top"
        >
          <el-input
            v-model="lesson.attachment.file"
            placeholder="Enter lesson title"
            readonly
            suffix-icon="Link"
            @click="copyURL(lesson.attachment.file)"
          />
        </el-tooltip>
      </el-form-item>

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
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import TextEditor from "@/components/TextEditor.vue"
import {ElNotification, FormInstance} from "element-plus";
import {mapActions, mapGetters} from "vuex";
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
    options: [],
    lesson: {
      type: Object,
      default: {
        title: "",
        content: "",
        attachment: {
          file_type: "Video"
        },
      },
    },
    chapter: {
      type: Object,
      default: {
        title: "",
      },
    },
  },
  data() {
    return {
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
      info_text: "Edit lesson in chapter ",
      copyContent: "Click to copy link"
    }
  },
  methods: {
    ...mapActions("lesson", [ActionTypes.UPDATE_LESSON]),
    async handleSubmit(formEl: FormInstance | undefined) {
      if (!formEl) return
      await formEl.validate(async (valid, fields) => {
        this.is_freeze = true

        if (valid) {
          let formData = new FormData();

          if (this.file != null) {
            formData.append("file", this.file.raw ? this.file.raw : this.file)
          }

          formData.append("file_type", this.type);
          let lesson = {
            title: this.lesson.title,
            content: this.lesson.content
          }
          formData.append("lesson", JSON.stringify(lesson));

          const response: any = await this.UPDATE_LESSON({
            course_id: this.course.id,
            chapter_id: this.chapter.id,
            lesson_id: this.lesson.id,
            formData: formData
          })

          if (response.status == 201) {
            this.$router.push({
              name: "edit-course",
              params: {course_slug: this.course.slug},
            });

            ElNotification({
              title: 'Edit lesson successfully',
              message: 'Your lesson has been updated!',
              type: 'success',
            })
          } else {
            ElNotification({
              title: 'Error',
              message: 'Update lesson failed!',
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
    async copyURL(text: string) {
      try {
        await navigator.clipboard.writeText(text);
        this.copyContent = "Copied to clipboard!"
        setTimeout(() => {
          this.copyContent = "Click to copy link"
        }, 3000)
      } catch ($e) {
      }
    }
  },
  computed: {
    ...mapGetters("authentication", ["tokenInfo"])
  },
  updated() {
    this.info_text = this.info_text + `"${this.chapter.title}"`
  },
  mounted() {
    this.type = this.lesson.attachment.file_type
  }
})

export default class EditLesson extends Vue {
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
