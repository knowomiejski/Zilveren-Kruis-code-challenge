<template>
        <div :class="`d-flex flex-column mt-4 ${helperText ? 'mb-1' : 'mb-4'}`">
            <div>
                <label :for="inputName" :id="`${inputName}-label`" class="input__title" v-if="label">{{label}}</label>
                <input
                    :id="inputName"
                    :name="inputName"
                    :class="`input__field form-control ${error ? 'is-invalid' : ''}`"
                    type="text"
                    :placeholder="placeholder"
                    :value="modelValue"
                    @input="$emit('update:modelValue', $event.target.value)"
                />
            </div>
            <div style="color: red;" v-if="error">{{error}}</div>
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
        helperLink?: string,
        error?: string | null
    }>()
    defineEmits<{
        (e: 'update:modelValue', value: string): void
    }>()
</script>