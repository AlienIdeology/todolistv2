<template>
    <SiteHeader />
    <TodoList />
</template>

<script>
import TodoList from './components/TodoList.vue'
import SiteHeader from './components/SiteHeader.vue';

export default {
    name: 'App',
    components: {
        TodoList,
        SiteHeader
    }
}
</script>

<style>
    :root {
        background-color: #475C7A;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        margin-top: 60px;
        margin: 0;
        padding: 0;
        width: 100vw;
        height: 100vh;
    }

    body {
        margin: 0
    }
</style>
