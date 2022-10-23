<template>
  <el-form
    ref="registerFormRef"
    class="form p-6 is-half"
    :model="registerForm"
    style="min-height: 680px"
    >
      <div class="title" style="color: #024547; font-size: 2rem;">Become a member</div>
      <p class="subtitle">Get instant Access to 4500 Courses</p>
      <el-form-item prop="full_name"
			:rules="[
        {
          required: true,
          message: 'Please fill fullname',
          trigger: 'blur',
        }
      ]">
        <el-input placeholder="Full name" v-model="registerForm.full_name" size="large" :prefix-icon="user_icon"/>
      </el-form-item>
      <el-form-item
        prop="email"
        :rules="[
        {
          required: true,
          message: 'Please fill email address',
          trigger: 'blur',
        },
        {
					type: 'email',
					message: 'Please fill correct email address',
					trigger: ['blur', 'change'],
				},
				]">
					<el-input placeholder="Email" v-model="registerForm.email" size="large" :prefix-icon="email_icon"/>
      </el-form-item>
			<el-form-item prop="password"
			:rules="[
        {
          required: true,
          message: 'Please fill password',
          trigger: 'blur',
        }
      ]">
				<el-input placeholder="Password" v-model="registerForm.password" size="large" type="password"
									:prefix-icon="password_icon"/>
			</el-form-item>
			<el-form-item prop="confirmPassword"
			:rules="[
        {
          required: true,
          message: 'Please fill password',
          trigger: 'blur',
        },
				{
          min: 6,
          message: 'Password should have more than 6 characters.',
          trigger: 'blur',
        }
      ]">
				<el-input placeholder="Confirm password" v-model="confirmPassword" size="large" type="password"
									:prefix-icon="password_icon"/>
			</el-form-item>
			<p class="subtitle" style="font-size: 1rem">Sign up as</p>
			<el-row class="mb-4 is-flex is-justify-content-center">
				<div class="flex">
					<label class="card">
						<input name="plan"  value="user" class="radio" type="radio" v-model="registerForm.role">
						<span class="content" align="center">
							<font-awesome-icon icon="fa-solid fa-graduation-cap" class="mb-2"/>
							<p class="subtitle mt-1" style="font-size: 0.75rem">A student,<br>looking for a course</p>
						</span>
					</label>
					<label class="card">
						<input name="plan" value="lecturer" class="radio" v-model="registerForm.role" type="radio">
						<span class="content" aria-hidden="true" align="center">
							<font-awesome-icon icon="fa-solid fa-chalkboard-user" class="mb-2"/>
							<p class="subtitle mt-1" style="font-size: 0.75rem">A lecturer,<br>posting my course</p>
						</span>
					</label>
				</div>
			</el-row>
			<el-row>
				<label class="checkbox my-3" style="font-size: 1rem">
					<input type="checkbox">
					I agree to the <a href="#" style="color: #07B464;">terms and conditions</a>
				</label>
			</el-row>
			<div class="field">
				<p :class="['control', 'is-flex', 'is-justify-content-center']">
					<el-button class="button is-success is-fullwidth mt-2" @click="onRegister" size="large">Sign up</el-button>
				</p>
				<p class="subtitle mt-3 is-flex is-justify-content-center" style="font-size: 1rem">
					Already have an account?
					<router-link to="/login" style="color: #07B464;">Log in</router-link>
				</p>
			</div>
	</el-form>
</template>

<script lang="ts" >
import {Options, Vue} from "vue-class-component";
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { UserFilled, EditPen, Message } from '@element-plus/icons-vue'
import RegisterItem from "@/types/register/RegisterItem";
import { mapActions } from "vuex";
import {ActionTypes} from "@/types/store/ActionTypes";
import { ElNotification } from 'element-plus'

const registerFormRef = ref<FormInstance>()

@Options({
  data() {
    return {
      registerForm: {
				full_name: "",
        email: "",
        password: "",
				role: "user",
      } as RegisterItem,
			confirmPassword: "",
      user_icon: UserFilled,
      password_icon: EditPen,
			email_icon: Message,
    }
  },
  methods: {
    ...mapActions("authentication", [ActionTypes.REGISTER]),
    async onRegister(){
      const response = await this.REGISTER(this.registerForm)
      if(response.status == 201){
        this.$router.push("/login");
      }
      else {
        ElNotification({
          title: 'Error',
          message: 'Information is incorrect. Please check again',
          type: 'error',
        })
      }
    }
  },
})

export default class RegisterForm extends Vue {}
</script>

<style lang="scss">
:root {
  --card-line-height: 1.2em;
  --card-padding: 0.75em;
  --card-radius: 0.5em;
  --color-green: #07B464;
  --color-gray: #e2ebf6;
  --color-dark-gray: #c4d1e1;
  --radio-border-width: 2px;
  --radio-size: 1.5em;
}

.flex {
  display: flex;
  grid-gap: 1.5em;
  margin: 0 auto;
  max-width: 60em;
  padding: 0;
 
  @media (min-width: 42em) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.card {
  background-color: #fff;
  border-radius: var(--card-radius);
  position: relative;
  
  &:hover {
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.15);
  }
}

.radio {
  margin: 0;
  position: absolute;
  right: calc(var(--card-padding) + var(--radio-border-width));
  top: calc(var(--card-padding) + var(--radio-border-width));
}

@supports(-webkit-appearance: none) or (-moz-appearance: none) { 
  .radio {
    -webkit-appearance: none;
    -moz-appearance: none;
    background: #fff;
    border: var(--radio-border-width) solid var(--color-gray);
    border-radius: 50%;
    cursor: pointer;
    height: var(--radio-size);
    outline: none;
    transition: 
      background 0.2s ease-out,
      border-color 0.2s ease-out;
    width: var(--radio-size); 

    &::after {
      border: var(--radio-border-width) solid #fff;
      border-top: 0;
      border-left: 0;
      content: '';
      display: block;
      height: 0.75rem;
      left: 25%;
      position: absolute;
      top: 50%;
      transform: 
        rotate(45deg)
        translate(-50%, -50%);
      width: 0.375rem;
    }

    &:checked {
      background: var(--color-green);
      border-color: var(--color-green);
    }
  }
  
  .card:hover .radio {
    border-color: var(--color-dark-gray);
    
    &:checked {
      border-color: var(--color-green);
    }
  }
}

.content {
  border: var(--radio-border-width) solid var(--color-gray);
  border-radius: var(--card-radius);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: var(--card-padding);
  transition: border-color 0.2s ease-out;
}

.card:hover .content {
  border-color: var(--color-dark-gray);
}

.radio:checked ~ .content {
  border-color: var(--color-green);
}

.radio:focus ~ .content {
  box-shadow: 0 0 0 0.5px var(--color-dark-gray);
}

.radio:disabled ~ .content {
  color: var(--color-dark-gray);
  cursor: default;
}

.radio:disabled ~ .content {
  color: var(--color-dark-gray);
}

.card:hover .radio:disabled ~ .content{
  border-color: var(--color-gray);
  box-shadow: none;
}

.card:hover .radio:disabled {
    border-color: var(--color-gray);
  }
</style>