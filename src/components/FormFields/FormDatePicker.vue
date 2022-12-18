<template>
    <div class="form-input my-4">
        <label :for="inputName" :id="`${inputName}-label`" class="input__title" v-if="label">{{label}}</label>
        <div class="input__group">
            <input
                :name="inputName"
                class="form-control"
                type="date"
                v-model="dateValue"
                @input="handleInput()"
                />
        </div>
    </div>
</template>
<script setup lang="ts">import { ref } from 'vue';

const props = defineProps<{
        inputName: string,
        modelValue: Date,
        label: string,
        placeholder?: string,
    }>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: Date): void
}>()

const dateValue = ref(props.modelValue.toISOString().split('T')[0])
const handleInput = () => {
    emit('update:modelValue', new Date(dateValue.value))
}
</script>