<template>
    <div @click="$emit('handleClick')" :class="`btn btn${outlined? '-outline' : ''}-${buttonType}`">
        <slot/>
    </div>
</template>
<script setup lang="ts">
defineProps<{
    buttonType: string,
    outlined?: Boolean,
}>()
defineEmits(['handleClick'])
</script>