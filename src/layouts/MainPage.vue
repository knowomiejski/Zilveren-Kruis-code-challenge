<template>
    <div>
        <HeaderComponent/>
        <RouterView v-slot=" { Component } ">
            <Transition name="fade" mode="out-in">
                <Component :is="Component"></Component>
            </Transition>
        </RouterView>
        <FooterComponent/>
    </div>
</template>

<script setup lang="ts">
import HeaderComponent from '@/components/Header/HeaderComponent.vue'
import FooterComponent from '@/components/Footer/FooterComponent.vue'
</script>