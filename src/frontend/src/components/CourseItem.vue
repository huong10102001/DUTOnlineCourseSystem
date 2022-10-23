<template>
  <router-link :to="'/courses/'+course.slug">
    <div class="course-item">
      <h3 class="course-item__title">{{ course.title }}</h3>
      <div class="course-item__summary">
       {{ course.summary }}
      </div>
      <div class="course-item__info">
        <p class="course-item__info__instructor">
          <font-awesome-icon icon="fa-solid fa-chalkboard-user" class="mr-1"/> {{ course.user.full_name }}
        </p>
      </div>
      <div class="course-item__image">
        <img v-if="!course.background" src="https://www.fossmint.com/wp-content/uploads/2019/02/Udemy-Python-Learning-Courses-for-Beginners.png">
        <img v-else :src="course.background">
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Course from "@/types/course/CourseItem";

@Options({
  props: {
    course: {} as Course,
  },
  data() {
    return {

    }
  }
})

export default class CourseItem extends Vue {
  course!: Course
}
</script>

<style scoped lang="scss">
.course-item{
  background-color: white;
  border-top: 10px solid #024547;
  border-radius: 10px;
  padding: 15px 15px 10px 15px;
  transition: all 0.1s ease-in-out;
  margin-bottom: 40px;

  &__title {
    font-weight: 400;
    overflow:hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0 10px;
  }

  &__summary {
    display: -webkit-box;
    font-size: 0.9rem;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 60px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    margin: 10px;
    font-weight: 400;
    color: #777;
  }

  &__info {
    color: #ccc;
    font-size: 0.9rem;
    padding: 15px 10px;
    font-weight: 450;
    text-transform: capitalize;
  }

  &__image {
    img {
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      border-radius: 10px;
      width: 100%;

    }
  }
}

a {
  color: #024547;
}

.course-item:hover {
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border-top: 10px solid #333;
}
</style>