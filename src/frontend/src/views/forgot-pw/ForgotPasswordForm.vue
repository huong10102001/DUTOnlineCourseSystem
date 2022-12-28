<template>
  <el-form
    ref="loginFormRef"
    class="form p-6 is-half"
    :model="loginForm"
    :rules="rules"
  >
    <div class="title" style="color: #024547; font-size: 2rem;">Reset password</div>
    <div v-show="!sent">
      <p class="subtitle">Input your email to reset your password!</p>
      <el-form-item prop="email">
        <el-input
          placeholder="Email"
          v-model="loginForm.email"
          size="large"
          :prefix-icon="email_icon"
          @keyup.enter="onSubmit($refs.loginFormRef)"
          :disabled="is_freeze"
        />
      </el-form-item>

      <div class="field">
        <p :class="['control', 'is-flex', 'is-justify-content-center']">
          <el-button class="button is-success is-fullwidth mt-2" @click="onSubmit($refs.loginFormRef)" size="large"
                     :disabled="is_freeze">
            Send E-mail
          </el-button>
        </p>
      </div>
    </div>

    <p v-show="sent" class="subtitle">We have sent you a link to reset your password. Please check your e-mail!</p>
  </el-form>

</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import type {FormInstance} from 'element-plus'
import {UserFilled, EditPen} from '@element-plus/icons-vue'
import LoginItem from "@/types/login/LoginItem";
import {mapActions, mapState} from "vuex";
import {ActionTypes} from "@/types/store/ActionTypes";
import {ElNotification} from 'element-plus'

@Options({
  data() {
    return {
      loginForm: {
        email: ""
      } as LoginItem,
      email_icon: UserFilled,
      password_icon: EditPen,
      is_freeze: false,
      rules: {
        email: [
          {required: true, message: 'Please input email', trigger: 'blur'},
          {type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change']}
        ]
      } as any,
      sent: false
    }
  },
  methods: {
    ...mapActions("authentication", [ActionTypes.SEND_MAIL_RESET_PASSWORD]),
    ...mapActions("user", [ActionTypes.GET_USER_INFO]),
    async onSubmit(formEl: FormInstance | undefined) {
      if (!formEl) return
      await formEl.validate(async (valid, fields) => {
        this.is_freeze = true
        if (valid) {
          const response: any = await this.SEND_MAIL_RESET_PASSWORD(this.loginForm)

          if (response.status == 200) {
            this.sent = true
          } else {
            ElNotification({
              title: 'Error',
              message: 'An error has occured.',
              type: 'error',
            })
          }

          this.is_freeze = false
        }
      })
      this.is_freeze = false
    }
  },
  computed: {
    ...mapState("authentication", ["tokenInfo"])
  }
})

export default class ForgotPasswordForm extends Vue {
}
</script>