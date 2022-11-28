<template>
  <div :class="['mt-4', {'quiz-section': openQuizResult}]">
    <div :class="{'quiz-section__frame': openQuizResult}">
      <div class="notification is-light is-success">
        <strong>Congrats! You have passed this quiz!</strong> <br/>
        <strong class="tag is-dark">Score achieved: {{ lesson.quiz_result[0].score }} points</strong>
      </div>

      <span
        class="button is-light is-info mb-4 is-uppercase"
        style="width: 100%; font-weight: 500"
        @click="showAnswer = !showAnswer"
      >
        {{ showAnswer ? 'Correct answers' : 'Show correct answers' }}
      </span>

      <el-scrollbar class="quiz-section__content mb-4" v-show="showAnswer">
        <el-form label-position="top" size="large">
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
                    readonly
                    border
                    :model-value="quiz.questions[question_index].answers[answer_index].is_correct"
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
                <el-radio-group :model-value="radio_temp[question_index]" style="width: 100%">
                  <div
                    v-for="(answer, answer_index) in question.answers"
                    :key="answer.id"
                    style="width: 100%"
                  >
                    <el-radio
                      readonly
                      border
                      :label="answer.content"
                      style="width: 100%"
                      class="mb-3"
                    />
                  </div>
                </el-radio-group>
              </el-form-item>
            </span>
          </div>
        </el-form>
      </el-scrollbar>

      <div class="is-flex is-justify-content-center">
        <button
          class="button is-danger"
          @click="$emit('closeQuizResult')"
          style="width: 100%"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {QUIZ_TYPES} from "@/const/quiz_types";
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
    openQuizResult: false,
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
      radio_temp: [],
      showAnswer: true,
    }
  },
  methods: {
    mapLevel(level: string) {
      switch (level) {
        case QUIZ_PRIORITY.LOW:
          return 'EASY';
          break;
        case QUIZ_PRIORITY.MEDIUM:
          return level;
          break;
        case QUIZ_PRIORITY.HIGH:
          return 'HARD';
          break;
      }
    }
  },
  created() {
    this.quiz.questions.forEach((question: any) => {
      let answer_index = question.answers.map((e: any) => e.is_correct).indexOf(true)
      this.radio_temp.push(question.answers[answer_index].content)
    })
  }
})
export default class QuizResultSection extends Vue {
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
    max-width: 1200px;
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

  &__content {
    padding: 20px;
    border: 2px dashed #eee;
    border-radius: 4px;
    height: calc(90vh - 300px);
  }
}
</style>
