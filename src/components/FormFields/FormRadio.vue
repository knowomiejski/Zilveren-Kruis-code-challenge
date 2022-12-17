<template>
    <div class="form-input my-4">
        <div class="input__group">
            <label :id="`${inputName}-label`" class="input__title" v-if="label">{{label}}</label>
            <div class="form-row">
                <div
                    v-for="(option, i) in options"
                    class="radio custom-radio radio__option"
                >
                    <input
                        :value="option"
                        @input="$emit('update:modelValue', $event.target.value)"
                        :id="option"
                        class="radio__input custom-control-input"
                        type="radio"
                        :name="inputName"
                    />
                    <label
                        class="radio__label custom-control-label"
                        :for="option"
                    >
                        {{option}}
                    </label>
                </div>
            </div>
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