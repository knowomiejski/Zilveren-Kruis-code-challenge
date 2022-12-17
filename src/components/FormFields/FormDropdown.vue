<template>
    <div class="form-input my-4">
        <label :id="`${inputName}-label`" class="input__title" v-if="label">{{label}}</label>
        <div class="input__group">
            <select
                class="form-control"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                >
                <option v-for="(option, i) in options">
                    {{option}}
                </option>
            </select>
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
        inputName: string,
        modelValue: string,
        options: string[]
        label: string,
        placeholder?: string,
    }>()
    defineEmits<{
        (e: 'update:modelValue', value: string): void
    }>()
</script>