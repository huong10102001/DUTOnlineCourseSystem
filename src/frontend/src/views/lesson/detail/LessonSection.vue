<template>   
  <div class="lesson-container">
    <div class="lesson-container__section">
      <h1>{{ lesson.title }}</h1>
      <p style="font-size:0.9rem; color: #666">
        <b>Chapter:</b> {{ chapter.title }}
      </p>
      <span class="tag is-info"> {{ lesson.attachment.file_type }}</span>
      <span class="ml-3 is-capitalized" style="font-size:0.9rem; color: #666">
        <font-awesome-icon icon="fa-solid fa-user-tie" class="mr-2" /><b>Leturer:</b> {{ course.user?.full_name }}
      </span>
    </div>
    <div class="lesson-container__section">
      <PDFViewer 
        v-if="lesson.attachment.file_type == 'Document'" 
        :pdf-file="lesson.attachment.file">
      </PDFViewer>
      <VideoViewer 
        v-else
        :file="lesson.attachment.file"
        @lessonComplete="$emit('videoLessonComplete')"
      >
      </VideoViewer>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import CourseItem from "@/types/course/CourseItem";
import PDFViewer from "@/components/PDFViewer.vue";
import VideoViewer from "@/components/VideoViewer.vue";

@Options({
  props: {
    course: {} as CourseItem,
    lesson: {} as any,
    chapter: {} as any,
  },
  components: {
    PDFViewer,
    VideoViewer
  }
})
export default class LessonSection extends Vue {}
</script>
