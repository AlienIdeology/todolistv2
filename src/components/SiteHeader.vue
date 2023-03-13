<template>
    <header>
        <h1>{{ getDictionary.title }}</h1>
        <div id="languageSelector">
            <img src="../assets/languages.png">
            <UIMenu id="language" :options="getLanguages" @menu-changed="languageSelected" />
        </div>
    </header>
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
    header {
        position: relative;
        margin: 0;
        margin-bottom: 1em;
        height: 15vh;
        background-color: #FCBB6D;
        display: flex;
        color: var(--text-header);
    }

    header h1 {
        margin: auto;
        display: inline-block;
        font-size: 2em;
    }

    #languageSelector {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-end;
        align-items: center;
        position: absolute;
        top: 30%;
        right: 2.5%;
        height: 40%;
        column-gap: 0.3em;
    }

    header img {
        height: 60%;
    }

    #language {
        height: 80%;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        padding: 2px;
        border-radius: 10px;
        border-width: 0px;
        background-color: var(--theme-dropdown);
        color: var(--text-header);
    }

    #language:focus {
        outline: none;
        border-width: 1px;
        border-color: #623545;
    }
</style>
