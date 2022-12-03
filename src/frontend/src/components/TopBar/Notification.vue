<template>
  <div class="dropdown is-hoverable">
    <div class="dropdown-trigger">
      <div class="notification-icon mr-4">
        <span class="fa-layers fa-fw">
          <font-awesome-icon icon="fa-regular fa-bell"/>
          <span class="fa-layers-counter" style="font-size: 2.2rem">{{ hasUnread }}</span>
        </span>
      </div>
    </div>
    <div class="dropdown-menu" id="dropdown-notification" role="menu">
      <div class="dropdown-content">
        <el-scrollbar
          height="400px"
          @scroll="handleScroll"
        >
          <div ref="scrollbarInnerRef">
            <div
              v-for="noti in notifications"
              :key="noti.id"
              @mouseenter="handleChangeState"
              @mouseleave="isHover = false"
            >
              <router-link
                :to="noti.link_comment"
                v-if="noti.link_comment"
                :class="['notification-item', {'isRead': noti.isRead}]"
              >
                <div class="columns is-flex is-vcentered">
                  <div class="column is-one-quarter">
                    <figure class="image is-64x64">
                      <img v-if="noti.user_reply.avatar" :src="noti.user_reply.avatar" class="is-rounded"
                           style="height: 100%">
                      <img v-else src="@/assets/vectors/default_avatar.svg" class="is-rounded" style="height: 100%"/>
                    </figure>
                  </div>
                  <div class="column">
                    <p>{{ noti.title }}</p>
                    <p style="font-size: 0.9rem; color: #999">{{ noti.time_comment }}</p>
                  </div>
                </div>
              </router-link>
              <div
                :class="['columns', 'is-flex', 'is-vcentered', 'notification-item', {'isRead': noti.isRead}]"
                v-if="noti.user_reminder"
              >
                <div class="column is-one-quarter">
                  <figure class="image is-64x64">
                    <img src="@/assets/images/notification-bell.png" class="is-rounded"
                         style="height: 100%">
                  </figure>
                </div>
                <div class="column">
                  <p>{{ noti.title }}</p>
                  <p style="font-size: 0.9rem; color: #999">{{ noti.content }}</p>
                </div>
              </div>
            </div>
          </div>
          <span class="p-6 is-flex is-justify-content-center">
            <button v-if="loading" class="button is-text" disabled style="text-decoration: none">
              <el-icon class="is-loading mr-2">
                <Loading/>
              </el-icon>
              Loading for notification...
            </button>
          </span>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {mapActions} from "vuex";
import {ActionTypes} from "@/types/store/ActionTypes";

@Options({
  data() {
    return {
      loading: true,
      notifications: [
        {
          "id": "",
          "title": "",
          "content": "",
          "user_reply": {
            "id": "",
            "full_name": "",
            "avatar": "",
          },
          "user_reminder": null,
          "discussion": {
            "id": "",
            "user": "",
            "lesson": "",
          },
          "course_id": "",
          "isRead": false,
          "link_comment": "",
          "time_comment": ""
        }
      ],
      hasUnread: 0,
      query: {
        page: 1,
        page_size: 12,
        isStateChanged: false
      },
      total_notification: 0,
      maxScrollHeight: 0,
      isHover: false
    }
  },
  methods: {
    ...mapActions("notification", [ActionTypes.FETCH_NOTIFICATION, ActionTypes.CHANGE_NOTIFICATIONS_STATE]),
    async fetchNotification() {
      const response: any = await this.FETCH_NOTIFICATION(this.query)
      if (response.status == 200) {
        this.notifications = response.data.results.list_notification
        this.hasUnread = response.data.results.number_notification
        this.total_notification = response.data.count
      }

      this.maxScrollHeight = this.$refs.scrollbarInnerRef.clientHeight - 400
    },
    async handleScroll(distance: any) {
      if (distance.scrollTop == this.maxScrollHeight) {
        this.loading = true

        this.query.page++
        this.query.isStateChanged = false
        const response: any = await this.FETCH_NOTIFICATION(this.query)
        if (response.status == 200) {
          this.notifications.push(response.data.results.list_notification)
          this.hasUnread = response.data.results.number_notification
          this.total_notification = response.data.count
          await this.handleChangeState()
        }

        this.maxScrollHeight = this.$refs.scrollbarInnerRef.clientHeight - 400

        this.loading = false
      }
    },
    async handleChangeState() {
      this.isHover = true
      if (this.query.isStateChanged) return
      this.CHANGE_NOTIFICATIONS_STATE({page: this.query.page})
      this.query.isStateChanged = true
    }
  },
  async mounted() {
    await setInterval(async () => {
      if (!this.isHover) await this.fetchNotification()
    }, 5000)
  },
  async created() {
    await this.fetchNotification()
    this.loading = false
  }
})
export default class Notification extends Vue {
}
</script>

<style lang="scss" scoped>
#dropdown-notification {
  font-weight: 400;
  position: absolute;
  width: 350px;
  top: 50px;
  left: -280px;
  z-index: 1;
  border-radius: 14px;
  color: #777;

  a {
    color: #777;
  }

  .notification-item {
    display: block;
    cursor: pointer;
    padding: 10px 20px;
    font-size: 1rem;
    transition: all 0.2s ease-in-out;
    margin: 0;

    &:hover {
      background-color: #eee;
    }
  }

  .isRead {
    background-color: #f5f7fa;
  }

  .dropdown-content {
    padding: 0;
  }
}

.notification-icon {
  cursor: pointer;
  font-size: 1.6rem;
  color: #ccc;
  padding: 10px;

  &:hover {
    color: #024547;
    transition: color 0.2s ease-in-out;
  }
}
</style>
