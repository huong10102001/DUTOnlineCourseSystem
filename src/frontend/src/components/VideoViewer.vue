<template>
  <video-player
    controls
    ref="videoPlayer"
    :src="file"
    :loop="loop"
    :volume="volume"
    :options="playerOptions"
    :control-bar="controls"
    id="video"
    :fluid="fluid"
    :events="['seeking', 'seeked']"
    @timeupdate="onVideoPlayerTimeUpdate"
    style="width: 100%;"
  ></video-player>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { VideoPlayer } from "@videojs-player/vue";
import "video.js/dist/video-js.css";
import {PROCESS_STATUS} from "@/const/process_status";

@Options({
  components: {
    VideoPlayer,
  },
  props: {
    file: "" as string,
    process_status: PROCESS_STATUS.OPEN
  },
  data() {
    return {
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 1.75, 2],
      } as any,
      threshold: 0.85,
      volume: 0.6 as any,
      fluid: true as any,
      loop: false as any,
      controls: {
        progressControl: false,
        remainingTimeDisplay: true,
      } as any
    };
  },
  methods: {
    onVideoPlayerTimeUpdate(player: any) {
      let currentTime = player.target.player.currentTime()
      let durationTime = player.target.player.duration()
      const process = currentTime / durationTime
      if(process >= this.threshold) {
        this.$emit('lessonComplete')
      }
    },
  },
  watch: {
    process_status(){
      if (this.process_status == PROCESS_STATUS.TESTING || this.process_status == PROCESS_STATUS.COMPLETED)
        this.controls.progressControl = true
    }
  },
  emits: ['lessonComplete']
})
export default class VideoViewer extends Vue {}
</script>
