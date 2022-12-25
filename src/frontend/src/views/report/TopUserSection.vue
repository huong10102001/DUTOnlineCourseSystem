<template>
  <el-main>
    <el-scrollbar max-height="500px">
      <div
        v-for="(user, index) in top_users"
        :key="user.id"
        class="user-record"
        @click="$router.push({name: 'profile-detail', query: {id: user.id}})"
      >
          <div class="columns is-flex is-vcentered">
            <div class="column is-one-fifth is-flex is-justify-content-center">#{{ index + 1 }}</div>
            <div class="column is-flex is-justify-content-center">
              <div class="columns is-flex is-vcentered">
                <div class="column is-flex is-justify-content-center">
                  <el-avatar :size="60" :src="user.avatar">
                    <img src="@/assets/vectors/default_avatar.svg"/>
                  </el-avatar>
                </div>
                <div class="column is-capitalized" style="min-width: 250px">
                  <strong>
                    {{ user.full_name }}
                  </strong>
                </div>
              </div>
            </div>
            <div class="column is-flex is-justify-content-center">{{ user.total_certificate }} certificates</div>
            <div class="column is-flex is-justify-content-center">{{ user.total_answer }} answers</div>
          </div>
      </div>
    </el-scrollbar>
  </el-main>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';

@Options({
  props: {
    top_users: {
      type: Array,
      default: [
        {
          id: "",
          full_name: "",
          role: "",
          avatar: "",
          bio: "",
          total_certificate: 1,
          total_answer: 0
        } as any
      ]
    }
  },
  data() {
    return {}
  },
})
export default class TopUserSection extends Vue {
}
</script>

<style scoped>
.user-record {
  min-width: 600px;
  background: #FFFFFF;
  border: 1px solid #eee;
  border-radius: 20px;
  padding: 15px;
  margin-bottom: 20px;
  cursor: pointer;
}

.user-record:last-child {
  margin-bottom: 0px;
}
</style>