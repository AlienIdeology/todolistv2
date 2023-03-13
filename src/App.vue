<template>
    <SiteHeader />
    <!-- <div id="content-wrapper"> -->
    <TodoList />
    <!-- </div> -->
    <SiteFooter />
</template>

<script>
import TodoList from './components/TodoList.vue'
import SiteHeader from './components/SiteHeader.vue';
import SiteFooter from './components/SiteFooter.vue';

export default {
    name: 'App',
    components: {
        TodoList,
        SiteHeader,
        SiteFooter
    }
}
</script>

<style>
    :root {
        background-color: #475C7A;
        --theme-color: #FCBB6D;
        --theme-dropdown: #eda600;
        --background-input: #4887a4;
        --text-header: #623545;
        --text-body: white;
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

        /* push footer to end of page */
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    body {
        height: 100%;
        margin: 0;
        padding: 0;
    }
</style>
