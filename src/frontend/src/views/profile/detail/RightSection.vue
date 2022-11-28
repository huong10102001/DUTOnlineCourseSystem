<template>
  <div class="profile-section">
    <h1 class="is-size-5 mb-5">Enrolled course</h1>
    <el-row :gutter="12">
      <el-col v-for="item in user.process_courses" class="mb-6" :xl="8" :sm="12" :xs="24">
        <router-link :to="{name: 'course-detail', params: {course_slug: item.course.slug}}">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                {{ item.course.title }}
              </p>
            </header>
            <div class="card-image">
              <figure class="image is-16by9">
                <img :src="item.course.background" alt="Placeholder image">
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img v-if="item.course.user.avatar" :src="item.course.user.avatar" alt="Lecturer"
                         class="is-rounded"
                         style="height: 100%">
                    <img v-else src="@/assets/vectors/default_avatar.svg" alt="Lecturer" class="is-rounded"
                         style="height: 100%">
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-6 is-capitalized">{{ item.course.user.full_name }}</p>
                  <p class="subtitle is-6">Last learn date: {{ item.last_learn_date }}</p>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';

@Options({
  props: {
    user: {}
  }
})

export default class RightSection extends Vue {
}
</script>