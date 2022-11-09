<template>
  <video-player
    controls
    ref="videoPlayer"
    :src="file"
    :loop="false"
    :volume="0.6"
    :options="playerOptions"
    :control-bar="{progressControl: false,
      remainingTimeDisplay: true,
      }"
    id="video"
    :fluid="true"
    :events="['seeking', 'seeked']"
    @timeupdate="onVideoPlayerTimeUpdate($event)"
    style="width: 100%;"
  >
</video-player>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { VideoPlayer } from "@videojs-player/vue";
import "video.js/dist/video-js.css";

@Options({
  components: {
    VideoPlayer,
  },
  props: {
    file: "" as string,
  },
  data() {
    return {
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 1.75, 2],
      },
      currentTime: 0,
      durationTime: 0,
      threshold: 0.85
    };
  },
  methods: {
    async onVideoPlayerTimeUpdate(player: any) {
      this.currentTime = player.target.player.currentTime()
      this.durationTime = player.target.player.duration()
      const process = this.currentTime / this.durationTime
      if(process >= this.threshold) {
        console.log('done')
      }
    },
  }

})
export default class VideoViewer extends Vue {}
</script>
