<template>
	<div
		@click="emit('update:isActive', false)"
		v-if="props.isActive"
		class="absolute w-screen h-screen bg-black opacity-20 flex justify-center items-center"
	>
		<form class="flex flex-col align">
			<input type="text" />
			<input type="text" />
			<input type="text" />
			<textarea name="gg" id="" cols="30" rows="10"></textarea>
			<input type="submit" class="text-black" @click="addPost()">Create</input>
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
	} catch (error) {
		alert('Не удалось добавить новый пост')
	} finally {
		alert('Всё было успешно добавлено')
        emit('update:isActive', false)
	}
}
</script>
