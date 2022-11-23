<template>
  <div class="course-detail__section has-background-white p-3 columns">
    <div class="column">
      <h1 class="is-size-3">Rating</h1>

      <el-row class="overview my-4">
        <el-col :span="4" class="p-5 mt-3">
          <el-row class="title is-3">{{course.avg_rating}}/5</el-row>
        </el-col>
        <el-col :span="20" class="p-5 mt-3">
          <el-row>
            <el-button 
            @click="starSelected(0)"
            class="number-star"
            :class="{active: numberStar === 0}"
            >All</el-button>
            <el-button 
            v-for="i in 5" 
            @click="starSelected(i)" 
            class="number-star"
            :class="{active: numberStar === i}">{{ i }} star</el-button>
          </el-row>
        </el-col>
      </el-row>

      <div class="mt-5 ml-5" v-for="item in course.ratings">
        <div v-if="item.star_rating==numberStar">
          <el-row>
            <el-col :span="2">
              <el-avatar :size="50">
                <img v-if="item.user.avatar"
                  :src="item.user.avatar"
                />
                <img v-else
                  src="@/assets/vectors/default_avatar.svg"
                />
              </el-avatar>
            </el-col>
            <el-col :span="20">
              <p>{{item.user.full_name}}</p>
              <span v-for="index in 5" 
              :key="index"
              style="color: #eee"
              >
              <font-awesome-icon icon="fa-solid fa-star" :class="{checked:item.star_rating>=index}"/>
            </span>
            </el-col>
          </el-row>
          <p class="is-size-5 mt-4"><b>{{item.title}}</b></p>
          <p class="mt-3 mb-2">
            {{item.content}}
          </p>
          <hr>
        </div>
        <div v-if="numberStar==0">
          <el-row>
            <el-col :span="2">
              <el-avatar :size="50">
                <img v-if="item.user.avatar"
                  :src="item.user.avatar"
                />
                <img v-else
                  src="@/assets/vectors/default_avatar.svg"
                />
              </el-avatar>
            </el-col>
            <el-col :span="20">
              <p>{{item.user.full_name}}</p>
              <span v-for="index in 5" 
              :key="index"
              style="color: #eee"
              >
              <font-awesome-icon icon="fa-solid fa-star" :class="{checked:item.star_rating>=index}"/>
            </span>
            </el-col>
          </el-row>
          <p class="is-size-5 mt-4"><b>{{item.title}}</b></p>
          <p class="mt-3 mb-2">
            {{item.content}}
          </p>
          <hr>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import { mapActions } from "vuex";
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
    starSelected(star: number){
      this.numberStar = star
    },
    async getRating(){
      let data = await this.FETCH_RATINGS(this.course.id)
      this.rating = data
    }
  },

})

export default class RatingSection extends Vue {
}
</script>

<style scoped>
.overview{
  background: #FFF9F4;
  border: 1px solid #FFF1E3;
  border-radius: 3px;
  height: 115px;
}
.number-star{
  width:100px;
  height: 40px;
  cursor: pointer;
}

.number-star:hover{
  background-color: white;
  color: #024547;
}
.number-star:focus{
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
.uncheck{
  color: #EEEEEE;
}
</style>