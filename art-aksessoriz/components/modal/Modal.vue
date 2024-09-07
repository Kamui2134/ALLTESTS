<template>
    <div v-if="isActive">

    </div>
</template>

<script setup lang="ts">
 let props = defineProps({
    isActive: {
        type: Boolean,
        required: true,
    }
 })
</script>