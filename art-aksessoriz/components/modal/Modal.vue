<template>
	<div
		@mousedown="
			() => {
				newPost = new Post()
				emit('update:isActive', false)
			}
		"
		v-if="props.isActive"
		class="fixed top-0 left-0 w-full h-full bg-[rgb(0,0,1)]/40 flex justify-center items-center"
	>
		<form
			class="h-[500px] w-[400px] bg-white rounded-md flex justify-start flex-col items-stretch py-4 px-4 gap-8"
			@mousedown="event => event.stopPropagation()"
			method="POST"
		>
			<div class="w-full mb-2">
				<h1 class="w-full text-center text-xl font-bold">Create a new Post</h1>
			</div>
			<input
				class="outline-none border-b-2"
				type="text"
				placeholder="userId..."
				v-model="newPost.userId"
			/>
			<input
				class="outline-none border-b-2"
				type="text"
				placeholder="id..."
				v-model="newPost.id"
			/>
			<input
				class="outline-none border-b-2"
				type="text"
				placeholder="title..."
				v-model="newPost.title"
			/>
			<textarea
				name="body"
				class="outline-none rounded-md bg-slate-100 p-1 min-h-[2rem]"
				placeholder="body..."
				v-model="newPost.body"
			></textarea>
			<input
				type="submit"
				class="bg-blue-600 rounded-3xl text-white px-4 py-2 font-medium mt-auto cursor-pointer"
				value="Create"
				@click="
					$event => {
						$event.preventDefault()
						addPost()
					}
				"
			/>
		</form>
	</div>
</template>

<script setup lang="ts">
import { Post } from '../posts/post.js'
const { $axiosPlugin } = useNuxtApp()

let newPost = ref(new Post())
const emit = defineEmits(['update:isActive'])

let props = defineProps({
	isActive: {
		type: Boolean,
		required: true,
	},
})

async function addPost(): Promise<void> {
	try {
		let response = await $axiosPlugin.post(
			'/posts',
			JSON.stringify(newPost.value),
			{
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}
		)
		alert('Всё было успешно добавлено')
		newPost.value = new Post()
		emit('update:isActive', false)
	} catch (error) {
		alert('Не удалось добавить новый пост')
	}
}
</script>
