<template>
  <div class="course-detail__section has-background-white p-3 columns">
    <div class="column">
      <h1 class="is-size-3">Rating</h1>

      <div class="notification is-light mt-3" style="border-radius: 20px">
        <p class="title is-size-1">{{ course.avg_rating }}/5 <span class="is-size-5">stars</span></p>
        <el-row :gutter="8">
          <el-col :sm="4" :xs="12">
            <el-button
              @click="starSelected(0)"
              class="number-star"
              :class="[{active: numberStar === 0}, 'mb-3']"
              style="width: 100%"
            >
              All
            </el-button>
          </el-col>

          <el-col v-for="i in 5" :key="i" :sm="4" :xs="12">
            <el-button
              @click="starSelected(i)"
              class="number-star"
              :class="[{active: numberStar === i}, 'mb-3']"
              style="width: 100%"
            >
              {{ i }}
              <font-awesome-icon icon="fa-solid fa-star" size="lg" class="ml-2"/>
            </el-button>
          </el-col>
        </el-row>
      </div>

      <div class="mt-5" v-for="item in course.ratings" :key="item.id">
        <div v-if="item.star_rating==numberStar">
          <div class="notification is-light is-primary" style="border-radius: 20px">
            <el-row :gutter="10">
              <el-col :sm="2" :xs="24">
                <el-avatar :size="50">
                  <img v-if="item.user.avatar" :src="item.user.avatar"/>
                  <img v-else src="@/assets/vectors/default_avatar.svg"/>
                </el-avatar>
              </el-col>

              <el-col :sm="22" :xs="24">
                <p>{{ item.user.full_name }}</p>
                <span
                  v-for="index in 5"
                  :key="index"
                  style="color: #eee"
                >
              <font-awesome-icon icon="fa-solid fa-star" :class="{checked:item.star_rating >= index}"/>
            </span>
              </el-col>
            </el-row>


            <p class="is-size-5 mt-4"><b>{{ item.title }}</b></p>
            <p class="mt-3 mb-2">
              {{ item.content }}
            </p>
          </div>
          <hr>
        </div>
        <div v-if="numberStar == 0">
          <div class="notification is-light is-primary" style="border-radius: 20px">
            <el-row :gutter="10">
              <el-col :sm="2" :xs="24">
                <el-avatar :size="50">
                  <img v-if="item.user.avatar" :src="item.user.avatar"/>
                  <img v-else src="@/assets/vectors/default_avatar.svg"/>
                </el-avatar>
              </el-col>
              <el-col :sm="22" :xs="24">
                <p>{{ item.user.full_name }}</p>
                <span
                  v-for="index in 5"
                  :key="index"
                  style="color: #eee"
                >
              <font-awesome-icon icon="fa-solid fa-star" :class="{checked:item.star_rating>=index}"/>
            </span>
              </el-col>
            </el-row>

            <p class="is-size-5 mt-4"><b>{{ item.title }}</b></p>
            <p class="mt-3 mb-2">
              {{ item.content }}
            </p>
          </div>
          <hr>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {mapActions} from "vuex";
import {ActionTypes} from "@/types/store/ActionTypes";

@Options({
  props: {
    course: {} as any
  },
  data() {
    return {
      numberStar: 0,
    }
  },
  methods: {
    ...mapActions('rating', [ActionTypes.FETCH_RATINGS]),
    starSelected(star: number) {
      this.numberStar = star
    },
    async getRating() {
      let data = await this.FETCH_RATINGS(this.course.id)
      this.rating = data
    }
  },

})

export default class RatingSection extends Vue {
}
</script>

<style scoped>
.number-star {
  width: 100px;
  height: 40px;
  cursor: pointer;
}

.number-star:hover {
  background-color: white;
  color: #024547;
}

.number-star:focus {
  background-color: #024547;
  color: white;
}

.active {
  background-color: #024547;
  color: white;
}

.checked {
  color: orange;
}

.uncheck {
  color: #EEEEEE;
}
</style>