<template>
  <div class="top-bar">
    <el-row class="p-3" justify="space-between">
      <el-col :xs="8" :sm="12" :md="8" :lg="8" :xl="8" class="top-bar__greeting">
        <p class="top-bar__greeting__name">Welcome, {{ userName }}</p>
        <p class="top-bar__greeting__text">Have a good day!</p>
      </el-col>

      <el-col  :xs="8" :sm="8" :md="8" :lg="8" :xl="8" class="top-bar__search-bar hidden-sm-and-down">
        <p class="control has-icons-left">
          <input class="input is-rounded" type="text" placeholder="Search">
          <span class="icon is-small is-left">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
          </span>
        </p>
      </el-col>

      <el-col :xs="8" :sm="12" :md="8" :lg="8" :xl="8">
          <div class="top-bar__right-menu columns is-vcentered is-flex is-justify-content-end p-3">

            <div class="top-bar__right-menu__notification mr-2">
              <font-awesome-icon icon="fa-regular fa-bell"/>
            </div>

            <div class="top-bar__right-menu__avatar">
              <div class="dropdown is-hoverable">
                <div class="dropdown-trigger">
                  <figure class="image">
                    <img v-if="avatar" class="is-rounded" :src="avatar" alt="Avatar">
                    <img v-else class="is-rounded" src="@/assets/vectors/default_avatar.svg" alt="Avatar">
                  </figure>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                  <div class="dropdown-content">
                    <router-link to="/profile" class="dropdown-item">
                      Profile
                    </router-link>
                    <router-link to="/profile/edit" class="dropdown-item">
                      Edit Profile
                    </router-link>
                    <hr class="dropdown-divider">
                    <router-link to="/logout" class="dropdown-item">
                      Log Out
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="22" class="top-bar__search-bar hidden-md-and-up">
        <p class="control has-icons-left">
          <input class="input is-rounded" type="text" placeholder="Search">
          <span class="icon is-small is-left">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
          </span>
        </p>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import 'element-plus/theme-chalk/display.css'

@Options({
  props: {
    userName: "",
    avatar: ""
  }
})

export default class TopBar extends Vue {
  userName!: string;
  avatar!: string
}
</script>

<style scoped lang="scss">
.top-bar {

  &__greeting {
    min-width: 250px;
    display: inline-block;
    &__name {
      display: block;
      font-weight: 400;
      text-transform: capitalize;
    }

    &__text {
      display: block;
      font-size: 1rem;
    }
  }

  &__search-bar {

    .control {
      .input, .icon {
        transition: all 0.3s ease-in-out;
      }
    }
  }

  &__right-menu {
    &__avatar {
      img {
        height: 52px;
        width: 52px;
        cursor: pointer;
      }
    }

    &__notification {
      cursor: pointer;
      font-size: 1.6rem;
      color: #ccc;

      :hover {
        color: #024547;
        transition: color 0.2s ease-in-out;
      }
    }

    #dropdown-menu {
      font-weight: 400;
      position: absolute;
      top: 50px;
      left: -130px;
      z-index: 1;
    }
  }
}
</style>