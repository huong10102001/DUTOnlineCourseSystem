<template>
  <div class="quiz-form">
    <div class="is-flex is-justify-content-space-between">
      <div>
        <h3 :class="['collapse-header','button','is-size-6',{'mb-4': isShow}]" @click="isShow = !isShow">
          <font-awesome-icon v-if="isShow" icon="fa-solid fa-angle-up" class="mr-2"/>
          <font-awesome-icon v-else icon="fa-solid fa-angle-down" class="mr-2"/>
          Question {{ index + 1 }}
        </h3>
        <span class="tag ml-4 is-medium">{{ question.score }} points</span>
      </div>
      <button class="button" @click="$emit('removeQuestion')">
        <font-awesome-icon icon="fa-regular fa-trash-can"/>
      </button>
    </div>
    <el-form
      v-show="isShow"
      :inline="true"
      ref="form"
      :model="_question"
      size="large"
      label-position="top"
      style="max-width: 100%"
    >
      <el-form-item
        prop="content"
        style="width: 100%"
        class="mr-0"
        :rules="{required: true, message: 'Please input question', trigger: 'blur'}"
      >
        <el-input
          v-model="_question.content"
          placeholder="Input your question"
        />
      </el-form-item>

      <el-form-item
        prop="score"
        label="Score"
      >
        <el-input-number v-model="_question.score" :min="5" :max="100" :step-strictly="true" :step="5"/>
      </el-form-item>

      <el-form-item
        label="Level"
        prop="level"
      >
        <el-select
          v-model="question.level"
          placeholder="Select"
          size="large">
          <el-option
            v-for="(level, index) in priorities"
            :key="index"
            :label="level.label"
            :value="level.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="Type"
        prop="type"
      >
        <el-select
          v-model="selectedTypes"
          placeholder="Select"
          size="large">
          <el-option
            v-for="(type, index) in types"
            :key="index"
            :label="type.label"
            :value="type.value"
          />
        </el-select>
      </el-form-item>

      <h3 class="is-size-4" style="width: 100%">Answers</h3>
      <div class="answer-section">
        <div
          v-for="(answer, ind) in _question.answers"
          :key="answer.id"
          style="width: 100%">
          <el-form-item
            :label="'Answer ' + (ind + 1)"
            :prop="`answers[${ind}].content`"
            :rules="{required: true, message: 'Please input answer', trigger: 'blur'}"
            style="width: 100%"
          >
            <el-input
              v-model="answer.content"
              placeholder="Input content for this answer"
            />
          </el-form-item>

          <el-form-item
            :prop="'correctAnswer' + (ind + 1)"
            style="width: 100%"
          >
            <el-checkbox
              v-model="answer.is_correct"
              label="Mark this as correct answer"
              class="ml-2"
              @click="handleMarkCorrectAnswer(ind)"
            />
            <span class="ml-3" v-show="_question.answers.length > 2">
              |<a class="ml-3" style="font-weight: 500; color: #000"
                  @click="handleRemoveAnswer(ind)">
              Remove this answer
            </a>
            </span>
          </el-form-item>
        </div>
        <button
          class="button is-light"
          v-show="_question.answers.length < 6"
          @click.prevent="handleAddAnswer"
        >
          <font-awesome-icon icon="fa-regular fa-square-plus" class="mr-2"/>
          Add answer
        </button>
      </div>
    </el-form>
  </div>
</template>


<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {QUIZ_TYPES} from "@/const/quiz_types";
import {QUIZ_PRIORITY} from "@/const/quiz_priority";

@Options({
  props: {
    index: {
      type: Number,
      default: 0
    },
    question: {
      type: Object,
      default: {
        order: 1,
        content: "",
        points: 5,
        question_type: QUIZ_TYPES.SINGLE_CHOICE,
        level: QUIZ_PRIORITY.LOW,
        answers: [
          {

            "content": "",
            "is_correct": true,
            "order": 1,
          },
          {
            "content": "",
            "is_correct": false,
            "order": 2,
          },
          {
            "content": "",
            "is_correct": false,
            "order": 3,
          },
          {
            "content": "",
            "is_correct": false,
            "order": 4,
          }
        ] as any
      },
    }
  },
  data() {
    return {
      types: [
        {label: "SINGLE CHOICE", value: QUIZ_TYPES.SINGLE_CHOICE},
        {label: "MULTIPLE CHOICE", value: QUIZ_TYPES.MULTIPLE_CHOICE},
      ],
      priorities: [
        {label: QUIZ_PRIORITY.LOW, value: QUIZ_PRIORITY.LOW},
        {label: QUIZ_PRIORITY.MEDIUM, value: QUIZ_PRIORITY.MEDIUM},
        {label: QUIZ_PRIORITY.HIGH, value: QUIZ_PRIORITY.HIGH},
      ],
      selectedTypes: QUIZ_TYPES.SINGLE_CHOICE,
      _question: this.question,
      isShow: true,
    }
  },
  computed: {
    isSingleChoice() {
      return this.selectedTypes == QUIZ_TYPES.SINGLE_CHOICE
    },
    hasNoCorrectAnswer() {
      return this._question.answers.map((e: any) => e.is_correct).indexOf(true) == -1
    }
  },
  watch: {
    selectedTypes(newType, oldType) {
      if (oldType == QUIZ_TYPES.MULTIPLE_CHOICE) {
        this._question.answers[0].is_correct = true
        for (let i = 1; i < 4; i++) {
          this._question.answers[i].is_correct = false
        }
      }
      this._question.question_type = newType
    }
  },
  methods: {
    handleMarkCorrectAnswer(index: number) {
      if (this.isSingleChoice) {
        for (let i = 0; i < 4; i++) {
          if (i == index) continue
          this._question.answers[i].is_correct = false
        }
      }
    },
    handleAddAnswer() {
      this._question.answers.push({
        "id": "date" + Date.now(),
        "content": "",
        "is_correct": false,
        "order": this._question.answers.length + 1
      })
    },
    handleRemoveAnswer(index: number) {
      this._question.answers.splice(index, 1)
      for (let i = index; i < this._question.answers.length; i++) {
        this._question.answers[i].order = i + 1
      }
    }
  },
  mounted() {
    this.selectedTypes = this.question.question_type
  }
})
export default class QuizForm extends Vue {
}
</script>

<style lang="scss" scoped>
.quiz-form {
  display: block;
  border: 1px solid #eee;
  padding: 20px;
  border-radius: 4px;
  transition: all 0.2s linear;
  margin-top: 30px;
}

.quiz-form:hover {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.answer-section {
  border-top: 1px solid #eee;
  padding: 20px;
  width: 100%;
}
</style>
