<template>
  <div :class="['mt-4', {'quiz-section': openQuiz}]">
    <div :class="{'quiz-section__frame': openQuiz}">
      <div class="notification is-light is-info">
        <strong>{{ quiz.title }}</strong>
        <p>{{ quiz.description }}</p>
        <small style="font-size: 0.8rem">Need minimum {{ quiz.threshold }} points to pass this quiz</small>
      </div>

      <el-scrollbar max-height="60vh" class="mb-4" style="padding: 20px">
        <el-form :model="quizForm" label-position="top" size="large">
          <div
            class="quiz-section__question"
            v-for="(question, question_index) in quiz.questions"
            :key="question.id"
          >
            <div class="is-flex is-justify-content-space-between">
              <h3 class="is-size-5 mb-2">Question {{ question_index + 1 }}</h3>
              <div>
                <span class="tag is-small">{{ question.score }} points</span>
                <strong :class="['tag', 'is-small', 'ml-3',
                  {'is-primary': question.level == QUIZ_LEVEL.LOW},
                  {'is-warning': question.level == QUIZ_LEVEL.MEDIUM},
                  {'is-danger': question.level == QUIZ_LEVEL.HIGH},
                ]">
                  {{ mapLevel(question.level) }}
                </strong>
              </div>
            </div>
            <span v-if="question.question_type == QUIZ_TYPES.MULTIPLE_CHOICE">
              <el-form-item
                :label="question.content"
              >
                <div
                  v-for="(answer, answer_index) in question.answers"
                  :key="answer.id"
                  style="width: 100%"
                >
                  <el-checkbox
                    border
                    v-model="quizForm.questions[question_index].answers[answer_index].is_correct"
                    :label="answer.content"
                    :name="`answer[${answer_index}]`"
                    class="mb-3"
                    style="width: 100%"
                  />
                </div>
              </el-form-item>
            </span>
            <span v-else>
              <el-form-item
                :label="question.content"
              >
                <el-radio-group v-model="question.radio_temp" style="width: 100%">
                  <div
                    v-for="(answer, answer_index) in question.answers"
                    :key="answer.id"
                    style="width: 100%"
                  >
                    <el-radio
                      border
                      :label="answer.content"
                      style="width: 100%"
                      class="mb-3"
                      @change="quizForm.questions[question_index].answers[answer_index].is_correct = true"
                      @click="handleRadioAnswer(question_index, answer_index)"
                    />
                  </div>
                </el-radio-group>
              </el-form-item>
            </span>
          </div>
        </el-form>
      </el-scrollbar>

      <div class="is-flex is-justify-content-space-between">
        <button
          class="button is-danger"
          @click="$emit('closeQuiz')"
        >
          Close
        </button>
        <div>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Please select at least an answer for all question before you can submit"
            placement="top"
          >
            {{ totalAnswered }} / {{ quizForm.questions.length }} answered
          </el-tooltip>
        </div>
        <button
          :disabled="totalAnswered != quizForm.questions.length"
          class="button is-primary"
          @click="handleSubmitQuizResult"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {QUIZ_TYPES} from "@/const/quiz_types";
import {mapActions} from "vuex";
import {ActionTypes} from "@/types/store/ActionTypes";
import {ElMessage, ElNotification} from "element-plus";
import {QUIZ_PRIORITY} from "@/const/quiz_priority";

@Options({
  props: {
    quiz: {
      type: Object,
      default: {
        id: "",
        title: "",
        lesson_id: "",
        description: "",
        question_type: QUIZ_TYPES.SINGLE_CHOICE,
        threshold: 50,
        questions: [
          {
            answer: [],
            answers: [
              {
                id: "",
                content: "",
                is_correct: ""
              }
            ]
          }
        ]
      }
    },
    openQuiz: false,
    lesson: {
      status: "",
      quizzes: [],
      quiz_result: []
    } as any,
  },
  data() {
    return {
      QUIZ_TYPES: QUIZ_TYPES,
      QUIZ_LEVEL: QUIZ_PRIORITY,
      quizForm: {
        id: "",
        lesson_id: "",
        questions: [
          {
            answers: []
          }
        ]
      },
      radio_temp: ""
    }
  },
  methods: {
    ...mapActions("quiz", [ActionTypes.CREATE_QUIZ_RESULT]),
    handleRadioAnswer(question_index: number, answer_index: number) {
      let l = this.quizForm.questions[question_index].answers.length
      for (let i = 0; i < l; i++) {
        if (i == answer_index) continue
        this.quizForm.questions[question_index].answers[i].is_correct = false
      }
    },
    async handleSubmitQuizResult() {
      const response: any = await this.CREATE_QUIZ_RESULT(this.quizForm)
      if (response.status == 201) {
        if (this.lesson.quiz_result.length > 0) {
          this.lesson.quiz_result[0] = response.data
        } else this.lesson.quiz_result.push(response.data)
        if (response.data.is_passed) {
          ElMessage({
            message: `You have passed the quiz. Continue on next lesson!`,
            type: 'success',
          })
          this.$emit('completedQuiz')
          this.$emit('closeQuiz')
        } else {
          ElMessage({
            message: `Please review again. You have too many wrong answers.`,
            type: 'error',
          })
        }
      } else {
        ElMessage({
          type: "error",
          message: `An error occurred!`,
        });
      }
    },
    mapLevel(level: string){
      switch (level){
        case QUIZ_PRIORITY.LOW: return 'EASY'; break;
        case QUIZ_PRIORITY.MEDIUM: return level; break;
        case QUIZ_PRIORITY.HIGH: return 'HARD'; break;
      }
    }
  },
  computed: {
    totalAnswered() {
      let count = 0
      this.quizForm.questions.forEach((question: any) => {
        if (question.answers.map((e: any) => e.is_correct).indexOf(true) != -1)
          count++
      })
      return count
    }
  },
  created() {
    let questions = JSON.parse(JSON.stringify(this.quiz.questions))
    questions.forEach((question: any) => {
      question.radio_temp = ""
      question.answers.forEach((answer: any) => {
        answer.is_correct = false
      })
    })

    this.quizForm = JSON.parse(JSON.stringify(this.quiz))
    this.quizForm.questions = questions
  },
  emits: ['completedQuiz']
})
export default class QuizSection extends Vue {
}
</script>

<style lang="scss" scoped>
.quiz-section {
  position: fixed;
  top: -20px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1999;
  transition: all 0.3s ease-in-out;

  &__frame {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 2000;
    padding: 20px;
    width: 96%;
    max-height: 90vh;
    background-color: white;
    transform: translate(-50%, -50%);
    border-radius: 4px;
  }

  &__question {
    padding: 20px;
    border-radius: 4px;
    border: 1px solid #eee;
    margin-bottom: 40px;
    overflow: auto;
    transition: all 0.2s ease-in-out;

    &:hover {
      border: 1px solid #ccc;
    }
  }

}

</style>
