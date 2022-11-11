<template>
  <el-scrollbar max-height="800px" style="width: 100%">
    <el-collapse
      style="width: 100%"
      v-for="(chapter, index) in chapters"
      size="large"
      :key="chapter.id"
    >

      <el-collapse-item
        :name="chapter.id">
        <template #title>
          <div class="collapse-chapter-header">
            <span>Chapter {{ index + 1 }}: {{ chapter.title }}</span>
          </div>

          <restricted-view :routes="[ROUTES.EDIT_COURSE]" :roles="[ROLES.ADMIN, ROLES.LECTURER]">
            <el-icon
              class="mx-3"
              style="font-size: 18px; color: #024547"
              @click.stop="$router.push({name:'add-lesson', params: {
              course_slug: $route.params.course_slug,
              chapter_slug: chapter.slug}
            })"
            >
              <Plus/>
            </el-icon>

            <el-icon
              class="mx-1 top"
              style="font-size: 18px; color: #024547"
              @click.stop="editChapter(chapter.id, chapter.title)"
            >
              <Edit/>
            </el-icon>

            <el-icon
              class="mx-3"
              style="font-size: 18px; color: #024547"
              @click.stop="deleteChapter(chapter.id, chapter.title)"
            >
              <Delete/>
            </el-icon>
          </restricted-view>
        </template>

        <div
          class="is-flex is-justify-content-end"
          v-for="lesson in chapter.lessons"
          :key="lesson"
        >
          <div
            class="mt-4 m-0 child-collapse columns is-vcentered"
            @click="
              $route.name == ROUTES.LESSON_DETAIL ?
                changeLesson(chapter, lesson) : handleLessonPreview(chapter, lesson)"
          >
            <div class="column is-flex is-justify-content-start">
              {{ lesson.title }}
            </div>
            <div class="column is-flex is-justify-content-end">
              <restricted-view :routes="[ROUTES.LESSON_DETAIL]">
                <el-icon
                  v-if="lesson.status == PROCESS_STATUS.LOCK"
                  class="mx-3"
                  style="font-size: 18px; color: #024547"
                >
                  <Lock/>
                </el-icon>
              </restricted-view>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </el-scrollbar>

  <restricted-view :routes="[ROUTES.EDIT_COURSE]">
    <PreviewSection
      :lesson="detail_lesson"
      :course_title="course_title"
      :chapter="current_chapter"
      :course_id="course_id"
      v-model="open"
      @deleteLesson="open = false; $emit('deleteLesson', $event)"></PreviewSection>
  </restricted-view>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {mapActions, mapMutations, mapGetters} from "vuex";
import {ActionTypes} from "@/types/store/ActionTypes";
import Chapter from "@/types/chapter/ChapterItem";
import {ElMessage, ElMessageBox, ElNotification} from "element-plus";
import PreviewSection from "@/views/course/edit/PreviewSection.vue";
import {ROLES} from "@/const/roles";
import RestrictedView from "@/components/RestrictedView.vue";
import {ROUTES} from "@/const/routes";
import {PROCESS_STATUS} from "@/const/process_status";

@Options({
  props: {
    chapters: null,
    course_id: String,
    course_title: String
  },
  emits: ["updateChapter", "deleteChapter", "deleteLesson"],
  components: {
    RestrictedView,
    PreviewSection,
  },
  data() {
    return {
      open: false,
      detail_lesson: "",
      current_chapter: {},
      ROLES: ROLES,
      ROUTES: ROUTES,
      PROCESS_STATUS: PROCESS_STATUS
    };
  },
  methods: {
    ...mapActions("chapter", [
      ActionTypes.REMOVE_CHAPTER,
      ActionTypes.UPDATE_CHAPTER,
    ]),
    ...mapMutations(["SET_LOADING"]),
    async updateChapter(id: string, title: string) {
      let response: any = await this.UPDATE_CHAPTER({
        course_id: this.course_id,
        id: id,
        chapter: {title: title},
      });

      if (response.status == 200) {
        ElNotification({
          title: "Update successfully",
          message: "You've just updated a chapter.",
          type: "success",
        });

        this.$emit("updateChapter", response.data);
      } else {
        ElNotification({
          title: "Error",
          message: "Information is incorrect. Please check again",
          type: "error",
        });
      }
    },

    async removeChapter(id: string) {
      let response: any = await this.REMOVE_CHAPTER({
        course_id: this.course_id,
        id: id,
      });

      if (response.status == 200) {
        ElNotification({
          title: "Delete successfully",
          message: "You've just removed a chapter.",
          type: "success",
        });

        this.$emit("deleteChapter", id);
      } else {
        ElNotification({
          title: "Error",
          message: "Information is incorrect. Please check again",
          type: "error",
        });
      }
    },

    editChapter(id: string, title: string) {
      ElMessageBox.prompt("Title", "Edit Chapter", {
        confirmButtonText: "Update",
        cancelButtonText: "Cancel",
        inputPlaceholder: "Please fill title",
        inputValue: title,
      }).then(({value}) => {
        if (value != null) {
          this.updateChapter(id, value);
        } else {
          ElMessage({
            type: "error",
            message: `Please fill title for chapter`,
          });
        }
      });
    },

    deleteChapter(id: string, title: string) {
      ElMessageBox.confirm(
        "You want to delete " + title + ". Continue?",
        "Confirm information",
        {
          type: "error",
          confirmButtonText: "Delete",
          cancelButtonText: "Cancel",
          confirmButtonClass: "el-button--danger",
        }
      ).then(async ({}) => {
        await this.removeChapter(id);
      });
    },

    handleLessonPreview(chapter: any, lesson: any) {
      if (this.$route.name == 'edit-course') {
        this.open = true
        this.detail_lesson = lesson
        this.current_chapter = chapter
      }
    },

    changeLesson(chapter: any, lesson: any) {
      if (lesson.status == PROCESS_STATUS.LOCK) return

      this.$router.push({
        name: 'lesson-detail',
        params: {
          course_slug: this.$route.params.course_slug,
          chapter_slug: chapter.slug,
          lesson_slug: lesson.slug
        },
        meta: {
          reload: true
        }
      })
    }
  },
  computed: {
    ...mapGetters("authentication", ["tokenInfo"]),
    ...mapGetters("user", ["userInfo"]),
  }
})
export default class ChapterCollapse extends Vue {
  chapters!: Chapter[];
}
</script>

<style>
.el-collapse {
  --el-collapse-header-bg-color: #EEEEEE !important;
  --el-collapse-header-font-size: 16px !important;
  margin-bottom: 10px;
  border-radius: 10px;
}

.el-collapse-item__header {
  border-radius: 10px;
}

.child-collapse {
  display: flex;
  width: 95%;
  height: 45px !important;
  background-color: #EEEEEE !important;
  border-radius: 10px !important;
  padding-left: 5px;
  font-size: 0.9rem;
  font-weight: 450;
}

.child-collapse:hover {
  cursor: pointer;
  background: #ccc !important;
}

.collapse-chapter-header {
  font-size: 16px;
  color: #024547;
  width: 100%;
  margin-left: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>