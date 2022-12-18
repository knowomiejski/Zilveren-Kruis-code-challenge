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
                    @input="$emit('update:modelValue', { name: option.label, price: option.price } )"
                >
                    <input
                        type="radio"
                        :checked="option.label === modelValue.name"
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
                            € {{paymentInterval? (option.price/paymentInterval).toFixed(2) : option.price.toFixed(2)}} {{paymentIntervalLabel ? paymentIntervalLabel : ''}}
                        </p>
                    </label>
                </div>
            </div>
        </div>
        <div style="color: red;" v-if="error">{{error}}</div>
    </div>
</template>
<script setup lang="ts">
import type { InsuranceType } from '@/models/InsuranceType';
import { onMounted, type Ref } from 'vue';

const props = defineProps<{
        inputName: string,
        modelValue: { name: string, price: number },
        options: {
            optionName: string,
            badge?: string,
            label: string,
            price: number,
        }[]
        label: string,
        error?: string,
        paymentInterval?: number,
        paymentIntervalLabel?: string,
        placeholder?: string,
    }>()
defineEmits<{
    (e: 'update:modelValue', value: InsuranceType): void
}>()
</script>