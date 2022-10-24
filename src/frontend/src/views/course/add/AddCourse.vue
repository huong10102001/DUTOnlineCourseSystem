<template>
  <el-tooltip
    class="box-item"
    effect="dark"
    content="Click here to change background"
    placement="top"
  >
    <el-upload
      class="avatar-uploader"
      action=""
      :show-file-list="false"
      :on-change="changeFile"
      :before-upload="beforeImageUpload"
      :on-success="handleImageUpload"
      :on-error="handleImageUpload"
      :disabled="is_freeze"
    >
      <img v-if="course.background" :src="course.background" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
  </el-tooltip>

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
      <el-input v-model="course.title"/>
    </el-form-item>

    <el-form-item prop="topics">
      <span class="title is-5 mt-3">Category(ies)</span>
        <el-select
          v-model="course.topics"
          multiple
          filterable
          default-first-option
          :reserve-keyword="false"
          style="width: 100%"
          placeholder="Select category(ies) for your course"
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
      <el-input v-model="course.summary"/>
    </el-form-item>
    <span class="title is-5 mt-3">Description</span>
    <div class="mt-4">
      <TextEditor :is_freeze="is_freeze" @contentChange="course.description = $event"/>
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
import {ActionTypes} from "@/types/store/ActionTypes";

@Options({
  components: {
    TextEditor
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
    }
  },
  methods: {
    ...mapActions("course",[ActionTypes.CREATE_COURSE]),
    changeFile(file: any, fileList: any) {
      this.background = file;
    },
    handleImageUpload(res: any, file: any) {
      this.course.background = URL.createObjectURL(file.raw);
    },
    beforeImageUpload(file: any) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        ElNotification({
          title: 'Notice',
          message: 'Avatar picture must be JPG or PNG format!',
          type: 'info',
        })
      }
      if (!isLt2M) {
        ElNotification({
          title: 'Notice',
          message: 'Avatar picture size can not exceed 2MB!',
          type: 'info',
        })
      }
      return (isJPG || isPNG) && isLt2M;
    },
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
              params: {slug: response.data.slug},
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
  }
})

export default class AddCoursePage extends Vue {
  options!: TopicItem[]
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 100%;
  border-radius: 20px;
  object-fit: cover;
  aspect-ratio: 21/9;
  display: block;
}

/deep/.el-upload {
  border-radius: 20px;
  display: block;
  aspect-ratio: 21/9;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  transition: all 0.2s linear;
}

/deep/.el-upload:hover {
  opacity: 0.9;
}
</style>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border-radius: 20px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 21/9;
  transition: var(--el-transition-duration-fast);
}

.el-icon.avatar-uploader-icon {
  border-radius: 20px;
  background-color: #eee;
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height:100%;
  margin: 0 auto;
}

</style>