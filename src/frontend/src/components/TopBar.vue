<template>
  <div class="top-bar columns is-vcentere m-0">
    <div class="column top-bar__greeting">
      <p class="top-bar__greeting__name">Welcome, Huong Le</p>
      <p class="top-bar__greeting__text">Have a good day!</p>
    </div>

    <div class="column top-bar__search-bar">
      <p class="control has-icons-left">
        <input class="input is-rounded" type="text" placeholder="Search">
        <span class="icon is-small is-left">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </span>
      </p>
    </div>

    <div class="column is-flex is-justify-content-end">
      <div class="top-bar__right-menu columns is-vcentered">

        <div class="top-bar__right-menu__notification mr-2">
          <font-awesome-icon icon="fa-regular fa-bell"/>
        </div>

        <div class="top-bar__right-menu__avatar">
          <div class="dropdown is-hoverable">
            <div class="dropdown-trigger">
              <figure class="image">
                <img class="is-rounded" src="@/assets/vectors/default_avatar.svg" alt="Avatar">
              </figure>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
              <div class="dropdown-content">
                <router-link to="profile" class="dropdown-item">
                  Profile
                </router-link>
                <router-link to="profile/edit" class="dropdown-item">
                  Edit Profile
                </router-link>
                <hr class="dropdown-divider">
                <router-link to="log-out" class="dropdown-item">
                  Log Out
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {

  },
  data() {
    return {

    }
  }
})

export default class TopBar extends Vue {

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
    }

    &__text {
      display: block;
      font-size: 1rem;
    }
  }

  &__search-bar {
    display: inline-block;
    width: 50%;
    min-width: 150px;
    max-width: 600px;

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
        margin-right: 5px;
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
      left: -150px;
      z-index: 1;
    }
  }
}
</style>