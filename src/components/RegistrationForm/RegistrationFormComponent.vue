<template>
    <div>
        <div class="container my-3">
            <div>
                <h1>Aanmelden</h1>
                <div class="d-flex justify-content-between align-items-center my-3">
                    <div :class="`step font-weight-bold ${$route.meta.registerStepper > 0 ? 'step-completed' : ''}`">1</div>
                    <div class="stepper-filler-line"></div>
                    <div :class="`step font-weight-bold ${$route.meta.registerStepper > 1 ? 'step-completed' : ''}`">2</div>
                    <div class="stepper-filler-line"></div>
                    <div :class="`step font-weight-bold ${$route.meta.registerStepper > 2 ? 'step-completed' : ''}`">3</div>
            </div>
            </div>
            <div class="row">
                <div class="col-8">
                    <RouterView v-slot=" { Component } ">
                        <Transition name="fade" mode="out-in">
                            <Component :is="Component"></Component>
                        </Transition>
                    </RouterView>
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
<style scoped>
.step {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    border: 5px solid #fecfbbff;
    background-color: #fecfbb00;
    width: 50px;
    height: 50px;
}

.step-completed {
    background-color: #fecfbbff;
}

.stepper-filler-line {
    background-color: #fecfbbff;
    flex: 1;
    height: 5px;
    padding: 1px;
}
</style>