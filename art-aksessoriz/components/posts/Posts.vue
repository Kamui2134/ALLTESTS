<template>
	<div class="w-full h-[500px] flex flex-col">
		<!-- Контейнер для заголовка таблицы -->
		<div class="w-full border border-collapse">
			<table class="table-fixed w-full border border-collapse">
				<thead class="bg-gray-200">
					<tr>
						<th class="font-medium pr-3 pb-4 text-left">userId</th>
						<th class="font-medium pr-3 pb-4 text-left">id</th>
						<th class="font-medium pr-3 pb-4 text-left">title</th>
						<th class="font-medium pr-3 pb-4 text-left">body</th>
					</tr>
				</thead>
			</table>
		</div>

		<!-- Контейнер с прокручиваемой таблицей -->
		<div
			class="w-full flex-1 overflow-y-scroll border border-collapse relative"
		>
			<!-- <component :is="Spinner" :loading="loading" /> -->
			<Spinner :loading="loading"/>
			<table class="table-fixed w-full border border-collapse">
				<tbody>
					<tr
						v-if="posts.length != null"
						v-for="post in posts.slice(
							(currentPage - 1) * postsCount,
							(currentPage + 1) * postsCount
						)"
						:key="post.id"
					>
						<td class="py-2 border">{{ post.userId }}</td>
						<td class="py-2 border">{{ post.id }}</td>
						<td class="py-2 border">{{ post.title }}</td>
						<td class="py-2 border">{{ post.body }}</td>
					</tr>
				</tbody>
			</table>
		</div>

		<!-- Пагинация -->
		<div
			class="select-none flex flex-row justify-end items-center h-[64px] w-[full] mr-4"
		>
			<button
				class="h-[2rem] w-[4rem] border-2 rounded-md"
				@click="prevClickHandler"
			>
				Prev
			</button>
			<ol class="flex m-[8px]">
				<li
					v-for="n in pagesCount"
					class="border cursor-pointer px-2"
					:class="[
						{ 'bg-slate-500': currentPage === n + shift },
						{ 'text-white': currentPage === n + shift },
					]"
					@click="paginationClickHandler"
					:key="n"
				>
					{{ n + shift }}
				</li>
			</ol>
			<button
				class="h-[2rem] w-[4rem] border-2 rounded-md"
				@click="nextClickHandler"
			>
				Next
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Post } from './post'
import { Spinner } from '#components'

const { $axiosPlugin } = useNuxtApp()

const postsCount: number = 10
const pagesCount: number = 5

let posts = ref<Array<Post>>([])
let currentPage = ref(1)
let loading = ref(true)
// переменная считающая сдвиг начала массива
let shift = ref(0)

async function fetchPosts(): Promise<void> {
	loading.value = true

	try {
		let response = await $axiosPlugin.get('/posts')
		for (let post of response.data) {
			let temp = new Post(post.userId, post.id, post.title, post.body)
			posts.value.push(temp)
		}
	} catch (error) {
		alert('Не удалось получить посты!')
	} finally {
		loading.value = false
	}
}

onMounted(() => {
	fetchPosts()
})

function prevClickHandler(event: MouseEvent) {
	if (currentPage.value !== 1) {
		currentPage.value--
	}
	if (shift.value != 0 && currentPage.value === shift.value + 1) {
		shift.value--
	}
}
function nextClickHandler(event: MouseEvent) {
	if (posts.value.length > currentPage.value * postsCount) {
		currentPage.value++
	}
	if (
		shift.value + pagesCount < posts.value.length / postsCount &&
		currentPage.value === shift.value + pagesCount
	) {
		shift.value++
	}
}
function paginationClickHandler(event: MouseEvent) {
	const clickedPaginationElement: HTMLElement = event.target as HTMLElement
	const clickedPageNumber: number = Number(clickedPaginationElement.innerText)
	currentPage.value = clickedPageNumber
	if (shift.value != 0 && currentPage.value === shift.value + 1) {
		shift.value--
	} else if (
		shift.value + pagesCount < posts.value.length / postsCount &&
		currentPage.value === shift.value + pagesCount
	) {
		shift.value++
	}
}
</script>
