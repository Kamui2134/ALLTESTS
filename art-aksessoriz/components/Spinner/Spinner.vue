<template>
	<div
        v-if="props.loading"
		class="w-full h-full absolute bg-black opacity-20 flex justify-center items-center"
	>
		<div class="spinner" />
	</div>
</template>

<script setup>
let props = defineProps({
    loading: Boolean,
    required: true
})
</script>
