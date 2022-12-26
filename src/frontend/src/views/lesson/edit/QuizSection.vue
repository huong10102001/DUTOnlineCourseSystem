<template>
  <div class="edit-section p-6">
    <div>
      <el-checkbox
        v-model="hasQuiz"
        label="Enable Quizzes for this lesson"
        size="large"
        border
        style="width: 100%"
      />
    </div>

    <div v-if="hasQuiz" class="mt-5">
      <div class="quiz-info">
        <el-form
          :inline="true"
          :model="quiz"
          size="large"
          label-position="top"
          style="max-width: 100%"
          :rules="rules"
          ref="quizForm"
        >
          <el-form-item
            prop="title"
            style="width: 100%"
            class="mr-0"
            label="Quiz title"
          >
            <el-input
              v-model="quiz.title"
              placeholder="Input title"
            />
          </el-form-item>

          <el-form-item
            prop="description"
            style="width: 100%"
            label="Quiz description"
            class="mr-0"
          >
            <el-input
              v-model="quiz.description"
              placeholder="Input description"
              type="textarea"
            />
          </el-form-item>

          <el-form-item
            prop="threshold"
            style="width: 100%"
            label="Minimum score to pass the quiz"
            class="mr-0"
          >
            <el-input-number v-model="quiz.threshold" :min="40" :max="100" :step-strictly="true" :step="5"/>
          </el-form-item>
        </el-form>
      </div>

      <QuestionForm
        v-for="(question, index) in quiz.questions"
        :key="question.id"
        ref="questionForm"
        :question="question"
        :index="index"
        @removeQuestion="handleRemoveQuestion(index)"
      ></QuestionForm>

      <div class="is-flex is-justify-content-space-between mt-5 mb-5">
        <button
          @click="handleAddQuestion"
          class="button"
        >
          <font-awesome-icon icon="fa-solid fa-plus" class="mr-2"/>
          Add Question
        </button>

        <p class="tag ml-2 is-medium">Total score: {{ totalScore }}</p>
      </div>

      <div class="notification is-info is-size-6">
        <strong class="mr-2">Notice:</strong> Total score of a quiz must be 100.
      </div>

      <button
        class="button is-primary is-medium"
        style="width: 100%"
        v-if="quiz.questions.length > 0"
        @click="handleQuizSave"
      >
        Save
      </button>
    </div>
  </div>
</template>


<script lang="ts">
import {Options, Vue} from "vue-class-component";
import QuestionForm from "@/views/lesson/edit/QuestionForm.vue";
import {QUIZ_PRIORITY} from "@/const/quiz_priority";
import {QUIZ_TYPES} from "@/const/quiz_types";
import {ElMessage, ElNotification, FormInstance} from "element-plus";
import {mapActions} from "vuex";
import {ActionTypes} from "@/types/store/ActionTypes";

@Options({
  props: {
    hasQuizBefore: false,
    lessonId: "",
    quiz: {
      type: Object,
      default: {
        title: "",
        lesson_id: "",
        description: "",
        threshold: 50,
        questions: [
          {
            answers: [
              {
                id: "" as string
              }
            ]
          }
        ]
      },
    }
  },
  components: {
    QuestionForm
  },
  data() {
    return {
      hasQuiz: false,
      rules: {
        title: [
          {required: true, message: 'Please input quiz title', trigger: 'blur'},
        ]
      } as any,
    }
  },
  methods: {
    ...mapActions("quiz", [ActionTypes.CREATE_QUIZ, ActionTypes.UPDATE_QUIZ]),
    handleAddQuestion() {
      this.quiz.questions.push({
        id: "date" + Date.now(),
        content: "",
        question_type: QUIZ_TYPES.SINGLE_CHOICE,
        level: QUIZ_PRIORITY.LOW,
        order: this.quiz.questions.length + 1,
        score: 25,
        answers: [
          {
            "id": "date1" + Date.now(),
            "content": "",
            "is_correct": true,
            "order": 1
          },
          {
            "id": "date2" + Date.now() ,
            "content": "",
            "is_correct": false,
            "order": 2
          },
          {
            "id": "date3" + Date.now(),
            "content": "",
            "is_correct": false,
            "order": 3
          },
          {
            "id": "date4" + Date.now(),
            "content": "",
            "is_correct": false,
            "order": 4
          }
        ] as any
      })
    },
    handleRemoveQuestion(index: number) {
      this.quiz.questions.splice(index, 1)
      for (let i = index; i < this.quiz.questions.length; i++) {
        this.quiz.questions[i].order = i + 1
      }
    },
    async handleQuizSave() {
      if (this.totalScore != 100) {
        ElMessage({
          message: `Total score of a quiz must be 100.`,
          type: 'info',
        })
        return
      }

      this.$refs.quizForm.validate(async (valid: boolean, fields: any) => {
      })

      for (let i = 0; i < this.quiz.questions.length; i++) {
        this.$refs.questionForm[i].$refs.form.validate(async (valid: boolean, fields: any) => {
        })

        if (this.$refs.questionForm[i].hasNoCorrectAnswer) {
          ElMessage({
            message: `Question ${i + 1} has no correct answer. Please mark at least one correct answer for this.question`,
            type: 'warning',
          })
          return
        }
      }

      if (this.isFormValid) {
        let quiz = {...this.quiz}

        quiz.questions.forEach((question: any) => {
          if (question.id.includes("date")) {
            delete question.id
          }

          question.answers.forEach((answer: any) => {
            if (answer.id.includes("date")) {
              delete answer.id
            }
          })
        })

        if (!this.hasQuizBefore) {
          const response: any = await this.CREATE_QUIZ(quiz)
          if (response.status == 201) {
            ElNotification({
              title: "Save successfully!",
              message: "Quiz is updated for this lesson!",
              type: "success",
            });
            this.$emit('quizUpdated', response.data)
          } else {
            ElNotification({
              title: "Error",
              message: "An error occurred",
              type: "error",
            });
          }
        } else {
          const response: any = await this.UPDATE_QUIZ(quiz)
          if (response.status == 200) {
            ElNotification({
              title: "Save successfully!",
              message: "Quiz is updated for this lesson!",
              type: "success",
            });
          } else {
            ElNotification({
              title: "Error",
              message: "An error occurred",
              type: "error",
            });
          }
          this.$emit('quizUpdated', response.data)
        }
      } else {
        ElNotification({
          title: "Missing info",
          message: "Please fill in all fields required.",
          type: "warning",
        });
      }
    },

  },
  computed: {
    totalScore() {
      let totalScore: number = 0
      if (this.quiz.questions.length == 0) return totalScore
      this.quiz.questions.forEach((question: any) => {
        totalScore += question.score
      })
      return totalScore
    },
    isFormValid() {
      let check = true

      this.quiz.questions.every((question: any) => {
        if (question.content.length == 0) {
          check = false
        }

        question.answers.every((answer: any) => {
          if (answer.content.length == 0) {
            check = false
          }

          return check
        })

        return check
      })

      console.log("check valid here", check)
      return check
    }
  },
  watch: {
    hasQuizBefore() {
      if (this.hasQuizBefore) this.hasQuiz = true
    }
  }
})

export default class QuizSection extends Vue {
}
</script>

<style lang="scss" scoped>
.quiz-info {
  display: block;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 4px;
  transition: all 1s linear;
  margin-bottom: 30px;

  &:hover {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }

}
</style>
