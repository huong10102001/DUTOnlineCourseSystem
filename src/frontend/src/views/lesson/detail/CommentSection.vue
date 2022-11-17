<template>
  <div class="lesson-container__section">
    <p class="title is-4 my-5">Q&A</p>
    <div class="media mb-6" style="width: 100%">
      <figure class="media-left">
        <p class="image is-64x64">
          <img v-if="userInfo.avatar" :src="userInfo.avatar" class="is-rounded" style="height: 100%"/>
          <img v-else src="@/assets/vectors/default_avatar.svg" class="is-rounded"/>
        </p>
      </figure>
      <div class="media-content">
        <div class="field">
          <p class="control">
            <textarea rows="3"
              v-model="comment"
              class="textarea"
              placeholder="Add a comment..."
            ></textarea>
          </p>
        </div>
        <div class="field">
          <el-button style="padding:8px 15px;" @click="postComment" type="primary" class="button"
            >Post comment</el-button>
        </div>
      </div>
    </div>

    <div
      v-for="comment in discussions"
      :key="comment"
      style="width: 100%"
    >
      <div class="media mb-5">
        <figure class="media-left">
          <p class="image is-64x64">
            <img v-if="comment.user.avatar" :src="comment.user.avatar" class="is-rounded" style="height: 100%"/>
            <img v-else src="@/assets/vectors/default_avatar.svg"/>
          </p>
        </figure>

        <div class="media-content">
          <div v-if="edit_id == comment.id" class="field">
            <p>
              <el-row>
                <el-col :span="23">
                  <textarea rows="1"
                    v-model="contentEdit"
                    class="textarea"
                    placeholder="Add a comment..."
                  ></textarea>
                </el-col>
                <el-col :span="1" class="mt-2" align="center">
                  <el-button text @click="updateComment(comment.id)"><font-awesome-icon icon="fa-solid fa-paper-plane" /></el-button>
                </el-col>
              </el-row>
            </p>
          </div>

          <div v-else class="content">
            <p>
              <strong>{{ comment.user.full_name }}</strong><small class="subtitle is-6"> · {{ comment.time_comment }}</small>
              <br/>{{ comment.content }}<br/>
              <el-button class="mr-3" text @click="replyComment(comment.id)">Reply</el-button>
              <span v-if="userInfo.role == comment.user.role || userInfo.role == ROLES.ADMIN">
                <el-button text @click="editComment(comment.id, comment.content, 'parent')">Edit</el-button>
                <el-button text @click="delComment(comment.id)">Delete</el-button>
              </span>
            </p>
          </div>

          <div v-if="comment.child_discussions.length != 0">
            <div
              v-for="item in comment.child_discussions"
              :key="item"
              style="width: 100%"
            >
              <div class="media">
                <figure class="media-left">
                  <p class="image is-48x48">
                    <img v-if="item.user.avatar" :src="item.user.avatar" class="is-rounded" style="height: 100%"/>
                    <img v-else src="@/assets/vectors/default_avatar.svg" />
                  </p>
                </figure>
                <div class="media-content">
                  <div v-if="edit_child_id == item.id" class="field">
                    <p>
                      <el-row>
                        <el-col :span="23">
                          <textarea rows="1"
                            v-model="contentEdit"
                            class="textarea"
                            placeholder="Add a comment..."
                          ></textarea>
                        </el-col>
                        <el-col :span="1" class="mt-2" align="center">
                          <el-button text @click="updateComment(item.id)"><font-awesome-icon icon="fa-solid fa-paper-plane" /></el-button>
                        </el-col>
                      </el-row>
                    </p>
                  </div>

                  <div v-else class="content">
                    <p>
                      <strong>{{ item.user.full_name }}</strong><small class="subtitle is-6"> · {{ item.time_comment }}</small>
                      <br />{{ item.content }}<br />
                      <span v-if="userInfo.role == item.user.role || userInfo.role == ROLES.ADMIN">
                        <el-button text @click="editComment(item.id, item.content, 'child')">Edit</el-button>
                        <el-button text @click="delComment(item.id)">Delete</el-button>
                      </span>
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div v-if="open_id == comment.id" style="width: 100%">
            <div class="media">
              <figure class="image is-48x48">
                  <img v-if="comment.user.avatar" :src="comment.user.avatar" class="is-rounded"/>
                  <img v-else src="@/assets/vectors/default_avatar.svg"  class="is-rounded"/>
              </figure>
              <div class="media-content">
                <div class="field">
                  <p>
                    <el-row>
                      <el-col :span="23">
                        <textarea rows="1"
                          v-model="contentReply"
                          class="textarea"
                          placeholder="Add a comment..."
                        ></textarea>
                      </el-col>
                      <el-col :span="1" class="mt-2" align="center">
                        <el-button text @click="newReply(comment.id)"><font-awesome-icon icon="fa-solid fa-paper-plane" /></el-button>
                      </el-col>
                    </el-row>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapActions, mapGetters, mapState } from "vuex";
import { ActionTypes } from "@/types/store/ActionTypes";
import { ElNotification } from "element-plus";
import {ROLES} from "@/const/roles";

@Options({
  props: {
    course: {} as any,
    lesson: {} as any,
  },
  data() {
    return {
      comment: "",
      discussions: {},
      contentReply: "",
      status: false,
      open_id: "",
      contentEdit: "",
      edit_id: "",
      edit_child_id: "",
      ROLES: ROLES
    };
  },
  methods: {
    ...mapActions("discussion", [
      ActionTypes.CREATE_COMMENT, 
      ActionTypes.REPLY_COMMENT,
      ActionTypes.UPDATE_COMMENT,
      ActionTypes.REMOVE_COMMENT]),
    ...mapActions("lesson", [ActionTypes.FETCH_LESSON_DETAIL]),
    async getLesson(course_id: string, chapter_id: string, lesson_id: string) {
      const data:any = await this.FETCH_LESSON_DETAIL({
        course_id: course_id,
        chapter_id: chapter_id,
        lesson_id: lesson_id,
      });
      this.discussions = {...data.discussions}
    },
    async postComment() {
      if(this.comment){
        let response = await this.CREATE_COMMENT({
          course_id: this.course.id,
          chapter_id: this.lesson.chapter_id,
          lesson_id: this.lesson.id,
          content: this.comment,
        });

        if (response.status == 201){
          ElNotification({
            message: 'Your comment is posted!',
            type: 'success',
          }),
          this.comment = '',
          await this.getLesson(this.course.id, this.lesson.chapter_id, this.lesson.id)
        }
      }
      else{
        ElNotification({
          message: 'Please write your comment!',
          type: 'warning',
        })
      }
      
    },
    replyComment(id: string){
      this.open_id = id,
      this.contentReply = ''
    },
    async newReply(id: string){
      if(this.contentReply){
        await this.REPLY_COMMENT({
          course_id: this.course.id,
          chapter_id: this.lesson.chapter_id,
          lesson_id: this.lesson.id,
          content: {content: this.contentReply, parent_discussion_id: id},
        }),
        this.contentReply = '',
        await this.getLesson(this.course.id, this.lesson.chapter_id, this.lesson.id)
      }
      else{
        ElNotification({
          message: 'Please write your comment!',
          type: 'warning',
        })
      }
    },
    editComment(id: string, content: string, object: string){
      if (object == 'parent') {
        this.edit_id = id
      }
      else {
        this.edit_child_id = id
      }
      this.contentEdit = content
    },
    async updateComment(id: string){
      if(this.contentEdit){
        await this.UPDATE_COMMENT({
          course_id: this.course.id,
          chapter_id: this.lesson.chapter_id,
          lesson_id: this.lesson.id,
          discussion_id: id,
          content: {content: this.contentEdit},
        }),
        this.contentEdit = '',
        this.edit_child_id = '',
        this.edit_id = '',
        await this.getLesson(this.course.id, this.lesson.chapter_id, this.lesson.id)
      }
      else{
        ElNotification({
          message: 'Please write your comment!',
          type: 'warning',
        })
      }
    },
    async delComment(id: string) {
      const response = await this.REMOVE_COMMENT({
        course_id: this.course.id,
        chapter_id: this.lesson.chapter_id,
        lesson_id: this.lesson.id,
        discussion_id: id,
      })
      if(response.status == 204) {
        await this.getLesson(this.course.id, this.lesson.chapter_id, this.lesson.id),
        ElNotification({
          message: 'Your comment is removed!',
          type: 'success',
        })
      }
    }
  },

  computed: {
    ...mapGetters("user", ["userInfo"]),
    ...mapState("user", ["userInfo"])
  },
  watch: {
    async lesson(){
      await this.getLesson(this.course.id, this.lesson.chapter_id, this.lesson.id)
    }
  },
  created() {
    this.unwatchDiscussion = this.$watch('lesson', (newVal: any) => {
      if (newVal) {
        this.discussions = {...newVal.discussions}
        this.unwatchDiscussion();
      }
    });
  }
})
export default class CommentSection extends Vue {
}
</script>

<style scoped>
.media .media {
  margin-top: 12px !important;
}
.el-button {
  padding: 0px;
}
</style>