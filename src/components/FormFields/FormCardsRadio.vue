<template>
    <label class="ml-2 input__title">
        Kies uw basisverzekering
    </label>
    <div class="d-flex justify-content-around ">
        <div class="mx-2 w-100" v-for="(option, i) in options" :key="i">
            <div class="radio__tile">
                <div v-if="option.badge" class="badge radio__tile-badge">
                    {{option.badge}}
                </div>
                <div
                    class="radio custom-radio radio__option"
                    @input="$emit('update:modelValue', { name: option.label, price: option.priceNumber } as InsuranceType )"
                >
                    <input
                        type="radio"
                        :name="inputName"
                        :id="`${inputName}-${option.optionName}`"
                        class="radio__input custom-control-input"
                    />
                    <label
                        :for="`${inputName}-${option.optionName}`"
                        class="radio__label custom-control-label"
                    >
                        <p class="radio__description">
                            {{option.label}}
                        </p>
                        <p v-if="option.price" class="radio__price">
                            {{option.price}}
                        </p>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { InsuranceType } from '@/models/InsuranceType';

const props = defineProps<{
        inputName: string,
        modelValue: InsuranceType,
        options: {
            optionName: string,
            badge?: string,
            label: string,
            price: string,
            priceNumber: number
        }[]
        label: string,
        placeholder?: string,
    }>()
    defineEmits<{
        (e: 'update:modelValue', value: InsuranceType): void
    }>()
</script>