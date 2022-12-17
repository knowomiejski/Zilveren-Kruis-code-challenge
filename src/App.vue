<template>
    <div id="app">
        <Component :is="$route.meta.layout"/>
    </div>
</template>

<style>
input:focus, textarea:focus, select:focus {
    outline: none;
}
</style>
