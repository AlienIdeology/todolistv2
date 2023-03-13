<template>
    <footer>
        <p v-html="getDictionary.footer"></p>
    </footer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: "SiteFooter",
    computed: {
        ...mapGetters(['getDictionary'])
    }
}
</script>

<style>
    footer {
        bottom: 0;
        width: 100%;
        height: 4em;
        background-color: #8da5c5;

        display: flex;
        justify-content: center;
        align-items: center;

        /* push footer to end of page */
        margin-top: auto;
    }

    footer p {
        text-align: center;
        font-size: 0.8em;
    }
</style>
