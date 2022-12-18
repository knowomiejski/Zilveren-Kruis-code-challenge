<template>
    <div class="form-input my-4">
        <div class="input__group">
            <label :id="`${inputName}-label`" class="input__title" v-if="label">{{label}}</label>
            <div :class="`form-row d-flex ${vertical ? 'flex-column' : ''}`">
                <div
                    v-for="(option, i) in options"
                    :key="i"
                    :class="`radio custom-radio radio__option d-flex flex-column`"
                >
                    <div>
                        <input
                            :value="option.name"
                            :checked="option.name === modelValue"
                            @input="handleInput(option.name)"
                            :id="option.name"
                            :class="`radio__input custom-control-input ${error ? 'is-invalid' : ''}`"
                            type="radio"
                            :name="inputName"
                        />
                        <label
                            class="radio__label custom-control-label"
                            :for="option.name"
                        >
                            {{option.name}}
                        </label>
                    </div>

                    <div class="d-flex my-2 align-items-center" v-if="option.description && (option.name === selectedValue)">
                        <div class="description-bar"></div>
                        <div>
                            {{option.description}}
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="error">{{error}}</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
        inputName: string,
        modelValue: string,
        options: {
            name: string,
            description: string | null
        }[]
        label: string,
        error?: string,
        placeholder?: string,
        vertical?: boolean
    }>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const selectedValue = ref<string>('')
const handleInput = (value: string) => {
    selectedValue.value = value
    emit('update:modelValue',value)
}
</script>

<style scoped>
.description-bar {
    display: flex;
    padding: 2px;
    min-height: 2.25rem;
    margin-right: 1rem;
    margin-left: -2.25rem;
    background-color: #0068BD;
    border-radius: 10%;
}
</style>