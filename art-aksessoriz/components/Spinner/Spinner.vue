<template>
	<div
        v-if="loadingStore.loading"
		class="w-full h-full absolute bg-black opacity-20 flex justify-center items-center"
	>
		<div class="spinner" />
	</div>
</template>

<script setup>
import { useLoadingStore } from '~/stores/loading';

let loadingStore = useLoadingStore()
</script>
