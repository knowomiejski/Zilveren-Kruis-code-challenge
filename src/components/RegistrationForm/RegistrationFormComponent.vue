<template>
    <div>
        <div class="container my-3">
            <div class="row">
                <div class="col-8">
                    <RouterView/>
                </div>
                <div class="col-4">
                    <SideOverviewComponent/>
                </div>
            </div>
        </div>
        <RatingBarComponent/>
    </div>
</template>
<script setup lang="ts">
import SideOverviewComponent from './SideOverviewComponent.vue';
import RatingBarComponent from './RatingBarComponent.vue';
</script>