<template>
  <el-form
    ref="loginFormRef"
    class="form p-6 is-half"
    :model="resetpwForm"
    :rules="rules"
  >
    <div class="title" style="color: #024547; font-size: 2rem;">Reset Password</div>
    <el-form-item prop="password">
      <el-input
        placeholder="Password"
        v-model="resetpwForm.password"
        size="large"
        type="password"
        prefix-icon="EditPen"
        :disabled="is_freeze"
      />
    </el-form-item>

    <el-form-item prop="confirmPassword">
      <el-input
        placeholder="Confirm password"
        v-model="confirmPassword"
        size="large" type="password"
        prefix-icon="EditPen"
        :disabled="is_freeze"
      />
    </el-form-item>

    <div class="field">
      <p :class="['control', 'is-flex', 'is-justify-content-center']">
        <el-button class="button is-success is-fullwidth mt-2" @click="onSubmit($refs.loginFormRef)" size="large"
                   :disabled="is_freeze">
          Submit
        </el-button>
      </p>
    </div>
  </el-form>

</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import type {FormInstance} from 'element-plus'
import {UserFilled, EditPen} from '@element-plus/icons-vue'
import {mapActions, mapState} from "vuex";
import {ActionTypes} from "@/types/store/ActionTypes";
import {ElNotification} from 'element-plus'
import RegisterItem from "@/types/register/RegisterItem";

@Options({
  data() {
    return {
      resetpwForm: {
        password: "",
      } as RegisterItem,
      confirmPassword: "",
      email_icon: UserFilled,
      password_icon: EditPen,
      is_freeze: false,
      rules: {
        password: [
          {required: true, message: 'Please input password', trigger: 'blur'},
          {min: 6, max: 24, message: 'Length should be 6 to 24', trigger: ['blur']},
        ]
      } as any,
      user_id: '',
      token: ''
    }
  },
  methods: {
    ...mapActions("user", [ActionTypes.RESET_PASSWORD]),
    ...mapActions("user", [ActionTypes.GET_USER_INFO]),
    async onSubmit(formEl: FormInstance | undefined) {
      console.log("abc")
      if (this.confirmPassword != this.resetpwForm.password) {
        ElNotification({
          title: 'Notice',
          message: 'Please input the correct confirm password!',
          type: 'info',
        })
        return
      }

      if (!formEl) return
      await formEl.validate(async (valid, fields) => {
        this.is_freeze = true
        if (valid) {
          const response: any = await this.RESET_PASSWORD({
            payload: this.resetpwForm,
            params: {
              user_id: this.user_id,
              token: this.token
            }
          })

          if (response.status == 200) {
            ElNotification({
              title: 'Reset password successfully',
              message: 'Please login with your new password.',
              type: 'success',
            })
            this.$router.push("/login");
          } else {
            ElNotification({
              title: 'Error',
              message: 'An error has occurred.',
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
  },
  created() {
    this.user_id = this.$route.query.user_id
    this.token = this.$route.query.token
    this.$router.replace({query: {}})
  }
})

export default class ResetPasswordForm extends Vue {
}
</script>