<template>
    <div>
        <div class="font-weight-bold">{{title}}</div>
        <div class="d-flex justify-content-between my-1">
            <div>
                {{description}}
            </div>
            <div v-if="price !== undefined">
            € {{paymentInterval? (price/paymentInterval).toFixed(2) : price}}
            </div>
        </div>
        <hr/>
    </div>
</template>
<script setup lang="ts">
defineProps<{
    title: string,
    description: string,
    price?: number,
    paymentInterval?: number
}>()
</script>