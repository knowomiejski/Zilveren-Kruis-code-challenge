<template>
        <div :class="`d-flex flex-column-reverse mt-4 ${helperText ? 'mb-1' : 'mb-4'}`">
            <label :id="`${inputName}-label`" class="input__title" v-if="label">{{label}}</label>
            <input
                class="input__field form-control"
                type="text"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
            />
        </div>
        <div class="mt" v-if="helperText">
            <span v-if="helperLink"><a :href="helperLink">{{helperText}}</a></span>
            <span v-else>{{helperText}}</span>
        </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
        inputName: string,
        modelValue: string,
        label: string,
        placeholder?: string,
        helperText?: string,
        helperLink?: string
    }>()
    defineEmits<{
        (e: 'update:modelValue', value: string): void
    }>()
</script>