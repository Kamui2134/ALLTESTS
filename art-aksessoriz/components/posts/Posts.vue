<template>
	<div class="w-full h-full">
		<table class="w-full">
			<thead>
				<tr>
					<th class="font-medium pr-3 pb-4">userId</th>
					<th class="font-medium pr-3 pb-4">id</th>
					<th class="font-medium pr-3 pb-4">title</th>
					<th class="text-right font-medium pr-3 pb-4">body</th>
				</tr>
			</thead>
			<tbody>
				<tr v-if="posts.length != null">
					<td></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup lang="ts">
import { Post } from './post'

const { $axiosPlugin } = useNuxtApp()

let posts = ref<Array<Post>>([])

async function fetchPosts(): Promise<void> {
	let response = await $axiosPlugin.get('/posts')
	console.log(response)
	for (let post of response.data) {
		let temp = new Post(post.userId, post.id, post.title, post.body)
		posts.value.push(temp)
	}
}

fetchPosts()
</script>
