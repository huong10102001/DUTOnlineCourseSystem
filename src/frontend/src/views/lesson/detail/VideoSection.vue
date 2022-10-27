<template>
  <el-main>
    <el-row>
      <el-col :span="16">
        <video-player
        src="https://jsoncompare.org/LearningContainer/SampleFiles/Video/MP4/Sample-MP4-Video-File-for-Testing.mp4"
        controls
        :loop="true"
        :volume="0.6"
        style="width: 100%; height: 500px;border-radius:10px;"/>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="7">
        <el-collapse style="width:100%;height:auto;background-color: white;border-radius:10px;" class="p-4" accordion>
          <span class="title is-4 py-6">Course Name</span>
          <el-collapse-item title="Chapter 1: Chapter Name" name="1">
            <router-link to="/#">
              <div class="ml-3 mb-3">Lesson 1: Lesson Name</div>
            </router-link>
            <router-link to="/#">
              <div class="ml-3">Lesson 2: Lesson Name</div>
            </router-link>
          </el-collapse-item>
          <el-collapse-item title="Chapter 2: Chapter Name" name="2">
            <router-link to="/#">
              <div class="ml-3 mb-3">Lesson 1: Lesson Name</div>
            </router-link>
            <router-link to="/#">
              <div class="ml-3">Lesson 2: Lesson Name</div>
            </router-link>
          </el-collapse-item>
          <el-collapse-item title="Chapter 3: Chapter Name" name="3">
            <router-link to="/#">
              <div class="ml-3 mb-3">Lesson 1: Lesson Name</div>
            </router-link>
            <router-link to="/#">
              <div class="ml-3">Lesson 2: Lesson Name</div>
            </router-link>
          </el-collapse-item>
          <el-collapse-item title="Chapter 4: Chapter Name" name="4">
            <router-link to="/#">
              <div class="ml-3 mb-3">Lesson 1: Lesson Name</div>
            </router-link>
            <router-link to="/#">
              <div class="ml-3">Lesson 2: Lesson Name</div>
            </router-link>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>  
    <div class="columns is-flex my-3">
      <div class="column">
        <button class="button is-light is-large" style="background-color:#D9D9D9;"><font-awesome-icon icon="fa-solid fa-chevron-left" class="mr-2"/>Prev</button>
      </div>
      <div class="column is-flex is-justify-content-end">
        <button class="button is-light is-large" style="background-color:#D9D9D9;">Next<font-awesome-icon icon="fa-solid fa-chevron-right" class="ml-2"/></button>
      </div>
    </div>
    <el-row style="background-color:white;" class="p-6 my-3">
      <span class="title is-4">Description</span>
      <span class="subtitle"><br><br><br><br><br><br><br><br><br></span>
    </el-row>
    <el-row class="my-5">
      <span class="title is-4">Q&A</span>
    </el-row>
    <el-row>
      <article class="media">
        <figure class="media-left">
          <p class="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png">
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>Barbara Middleton</strong>
              <br>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta eros lacus, nec ultricies elit blandit non. Suspendisse pellentesque mauris sit amet dolor blandit rutrum. Nunc in tempus turpis.
              <br>
              <small><a>Like</a> · <a>Reply</a> · 3 hrs</small>
            </p>
          </div>
      
          <article class="media">
            <figure class="media-left">
              <p class="image is-48x48">
                <img src="https://bulma.io/images/placeholders/96x96.png">
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>Sean Brown</strong>
                  <br>
                  Donec sollicitudin urna eget eros malesuada sagittis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam blandit nisl a nulla sagittis, a lobortis leo feugiat.
                  <br>
                  <small><a>Like</a> · <a>Reply</a> · 2 hrs</small>
                </p>
              </div>
      
              <article class="media">
                Vivamus quis semper metus, non tincidunt dolor. Vivamus in mi eu lorem cursus ullamcorper sit amet nec massa.
              </article>
      
              <article class="media">
                Morbi vitae diam et purus tincidunt porttitor vel vitae augue. Praesent malesuada metus sed pharetra euismod. Cras tellus odio, tincidunt iaculis diam non, porta aliquet tortor.
              </article>
            </div>
          </article>
      
          <article class="media">
            <figure class="media-left">
              <p class="image is-48x48">
                <img src="https://bulma.io/images/placeholders/96x96.png">
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>Kayli Eunice </strong>
                  <br>
                  Sed convallis scelerisque mauris, non pulvinar nunc mattis vel. Maecenas varius felis sit amet magna vestibulum euismod malesuada cursus libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus lacinia non nisl id feugiat.
                  <br>
                  <small><a>Like</a> · <a>Reply</a> · 2 hrs</small>
                </p>
              </div>
            </div>
          </article>
        </div>
      </article>
      
      <article class="media"  style="width:100%;">
        <figure class="media-left">
          <p class="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png">
          </p>
        </figure>
        <div class="media-content">
          <div class="field">
            <p class="control">
              <textarea class="textarea" placeholder="Add a comment..."></textarea>
            </p>
          </div>
          <div class="field">
            <p class="control">
              <button class="button is-success">Post comment</button>
            </p>
          </div>
        </div>
      </article>
    </el-row>
  </el-main>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import { defineComponent } from 'vue'
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

@Options({
  components: {
    VideoPlayer
  },
  data() {
    return {
			
    }
  }
})
export default class VideoSection extends Vue {}
</script>

<style>

</style>