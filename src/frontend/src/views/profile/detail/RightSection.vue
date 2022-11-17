<template>
  <div class="profile-section">
    <h1 class="is-size-5 mb-5">Enrolled course</h1>
    <div v-for="item in user.process_courses" class="mb-6">
      <router-link :to="{name: 'course-detail', params: {course_slug: item.course.slug}}">
        <div class="card">
        <div class="card-image">
          <figure class="image is-16by9">
            <img :src="item.course.background" alt="Placeholder image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img v-if="item.course.user.avatar" :src="item.course.user.avatar" alt="Lecturer" class="is-rounded" style="height: 100%">
                <img v-else src="@/assets/vectors/default_avatar.svg" alt="Lecturer" class="is-rounded" style="height: 100%">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4 is-capitalized">{{ item.course.user.full_name }}</p>
              <p class="subtitle is-6">Last learn date: {{ item.last_learn_date }}</p>
            </div>
          </div>
        </div>
      </div>
      </router-link>
    </div>
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