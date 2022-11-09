<template>
  <el-drawer ref="drawer" v-model="open" size="80%" :show-close="false">
    <template #header="{ close }">
      <h4>
        <font-awesome-icon icon="fa-solid fa-eye" class="mr-2"/>
      </h4>
      <button class="button is-text" @click="close">
        <font-awesome-icon icon="fa-regular fa-rectangle-xmark"/>
      </button>
    </template>

    <el-descriptions
      title="Lesson Info"
      :column="1"
      size="large"
      border
      class="mb-5"
    >

      <template #extra>
        <router-link :to="{name:'edit-lesson', params: {
        course_slug: $route.params.course_slug,
        chapter_slug: chapter.slug,
        lesson_slug: lesson.slug}
      }">
          <button class="button mr-2">
            <font-awesome-icon icon="fa-solid fa-pen" class="mr-2" size="sm"/>
            Edit
          </button>
        </router-link>

        <button class="button is-danger" @click="handleDeleteLesson">
          <font-awesome-icon icon="fa-solid fa-trash"/>
        </button>
      </template>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon class="mr-2">
              <tickets/>
            </el-icon>
            Course
          </div>
        </template>
        {{ course_title }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon class="mr-2">
              <tickets/>
            </el-icon>
            Chapter
          </div>
        </template>
        {{ chapter.title }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon class="mr-2">
              <Reading/>
            </el-icon>
            Title
          </div>
        </template>
        {{ lesson.title }}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon class="mr-2">
              <FolderOpened/>
            </el-icon>
            Type File
          </div>
        </template>
        <el-tag size="large">{{ lesson.attachment.file_type }}</el-tag>
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon class="mr-2">
              <Paperclip/>
            </el-icon>
            Attachment
          </div>
        </template>
        <el-link
          :href="lesson.attachment.file"
          target="_blank"
          :icon="lesson.attachment.file_type == 'Video' ? 'Film' : 'Document'"
        >
          <p class="ml-1">{{ lesson.attachment.original_name }}</p>
        </el-link>
      </el-descriptions-item>
    </el-descriptions>

    <div>
      <h3 class="my-5">
        <font-awesome-icon icon="fa-solid fa-paperclip" class="mr-2" />
        Attachment Preview
      </h3>
      <PDFViewer v-if="lesson.attachment.file_type == 'Document'" :pdf-file="lesson.attachment.file"></PDFViewer>
      <VideoViewer v-else :file="lesson.attachment.file"></VideoViewer>
    </div>

    <div>
      <h3 class="my-5">
        <font-awesome-icon icon="fa-solid fa-align-right" class="mr-2"/>
        Description
      </h3>
      <div v-html="lesson.content"></div>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {mapActions} from "vuex";
import PDFViewer from "@/components/PDFViewer.vue";
import VideoViewer from "@/components/VideoViewer.vue";
import {ActionTypes} from "@/types/store/ActionTypes";
import {ElMessage, ElMessageBox} from "element-plus";

@Options({
  props: {
    lesson: {},
    chapter: {},
    course_title: String,
    course_id: String
  },
  components: {
    PDFViewer,
    VideoViewer
  },
  methods: {
    ...mapActions("lesson", [ActionTypes.DELETE_LESSON]),
    handleDeleteLesson() {
      ElMessageBox.confirm(
        "You want to delete lesson \"" + this.lesson.title + "\". Continue?",
        "Confirm information",
        {
          type: "error",
          confirmButtonText: "Delete",
          cancelButtonText: "Cancel",
          confirmButtonClass: "el-button--danger",
        }
      ).then(async ({}) => {
        let data: any = {
          course_id: this.course_id,
          chapter_id: this.chapter.id,
          lesson_id: this.lesson.id,
        }
        const response: any = await this.DELETE_LESSON(data)
        if (response.status == 200) {
          ElMessage({
            type: "success",
            message: `Delete lesson ${this.lesson.title} successfully`,
          });
          this.$emit('deleteLesson', data)
        } else {
          ElMessage({
            type: "error",
            message: `An error occurred!`,
          });
        }
      });
    }
  },
  emits: ["deleteLesson"]
})
export default class PreviewSection extends Vue {
}
</script>

<style scoped>
.cell-item {
  display: flex;
  align-items: center;
  width: 150px;
  font-size: 1rem;
  padding: 10px;
}

:deep(.el-descriptions__body .el-descriptions__table.is-bordered .el-descriptions__cell) {
  word-break: break-all;
}

.extra-button {
  background-color: #024547 !important;
  color: white;
  border-radius: 14px !important;
}

:deep(.el-descriptions__content) {
  vertical-align: middle;
}
</style>
