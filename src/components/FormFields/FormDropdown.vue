<template>
    <div class="form-input my-4">
        <label :for="inputName" :id="`${inputName}-label`" class="input__title" v-if="label">{{label}}</label>
        <div class="input__group">
            <select
                :id="inputName"
                :name="inputName"
                :class="`form-control shadow-none ${error ? 'is-invalid' : ''}`"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                >
                <option v-for="(option, i) in options">
                    {{option}}
                </option>
            </select>
        </div>
        <div  style="color: red;" v-if="error">{{error}}</div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
        inputName: string,
        modelValue: string,
        options: string[]
        label: string,
        error?: string,
        placeholder?: string,
    }>()
    defineEmits<{
        (e: 'update:modelValue', value: string): void
    }>()
</script>
<style>
input:focus, textarea:focus, select {
    outline: 0;
    outline-color: red;
}
</style>