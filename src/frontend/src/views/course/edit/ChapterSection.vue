<template>
  <el-row class="py-5">
		<span class="title is-5">Chapters - Total: 3</span>
		<el-collapse style="width: 100%">
			<el-collapse-item title="Chapter 1" name="1">
				<div>
					Consistent with real life: in line with the process and logic of real
					life, and comply with languages and habits that the users are used to;
				</div>
				<div>
					Consistent within interface: all elements should be consistent, such
					as: design style, icons and texts, position of elements, etc.
				</div>
			</el-collapse-item>
		</el-collapse>
	</el-row>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";

@Options({
  data() {
    return {

    }
  },
  methods: {

  }
})

export default class ChapterSection extends Vue {}
</script>

<style lang="scss" scoped>

</style>
