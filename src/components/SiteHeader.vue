<template>
    <nav>
        <h1>{{ getDictionary.title }}</h1>
        <UIMenu id="language" :options="getLanguages" @menu-changed="languageSelected" />
    </nav>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import UIMenu from './UIMenu.vue';

export default {
    name: "SiteHeader",
    computed: {
        ...mapState(["language"]),
        ...mapGetters(["getLanguages", "getDictionary"])
    },
    components: {
        UIMenu 
    },
    methods: {
        languageSelected(event) {
            this.$store.dispatch('updateLanguage', event.target.value)
        }
    }
}
</script>

<style>
    nav {
        position: relative;
        margin: 0;
        margin-bottom: 1em;
        height: 15vh;
        background-color: #FCBB6D;
        display: flex;
        color: #623545;
    }

    nav h1 {
        margin: auto;
        display: inline-block;
        font-size: 2em;
    }

    #language {
        position: absolute;
        top: 30%;
        right: 2.5%;
        height: 40%;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        padding: 2px;
        border-radius: 10px;
        border-width: 0px;
        background-color: #eda600;
    }

    #language:focus {
        outline: none;
        border-width: 1px;
        border-color: #623545;
    }
</style>
