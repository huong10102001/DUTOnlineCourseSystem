<template>
  <el-descriptions
    title="Lesson Info"
    :column="1"
    :size="large"
    border
  >
    <template #extra>
      <div>
        <router-link :to="{name:'edit-lesson', params: {
              course_slug: $route.params.course_slug,
              chapter_slug: chapter.slug,
              lesson_slug: lesson.slug}
            }">
          <button class="button is-dark">Edit</button>
        </router-link>
      </div>
    </template>
    
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon class="mr-2">
            <tickets />
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
            <tickets />
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
            <Reading />
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
            <FolderOpened />
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
            <Paperclip />
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

    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon class="mr-2">
            <Collection />
          </el-icon>
          Description
        </div>
      </template>
      {{ lesson.content }}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapActions, mapMutations, mapGetters } from "vuex";
import { ActionTypes } from "@/types/store/ActionTypes";
import { lesson } from "@/store/modules/lesson";

@Options({
  props: {
    lesson: {},
    chapter: {},
    course_title: String
  },
  data() {
    return{

    }
  },
})
export default class PreviewSection extends Vue {}
</script>

<style scoped>
.cell-item {
  display: flex;
  align-items: center;
  width: 150px;
  font-size: 1rem;
  padding: 10px;
}

/deep/.el-descriptions__body .el-descriptions__table.is-bordered .el-descriptions__cell {
  word-break: break-all;
}
.extra-button{
  background-color:#024547!important;
  color:white;
  border-radius: 14px !important;
}
/deep/.el-descriptions__content{
  vertical-align: middle;
}
</style>
