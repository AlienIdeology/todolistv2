<template>
    <div id="todolist">
        <TodoItem v-for="(item, index) in getItemsList" :key="index" :item="item"/>
        <Button id="itemAdd" text="Add Todo" @click-button="addItem()"/>
    </div>
</template>

<script>

import TodoItem from './TodoItem.vue'
import Button from './Button.vue';
import { mapGetters, mapState } from 'vuex';

export default {
    name: 'TodoLists',
    components: {
        TodoItem,
        Button
    },
    computed: {
        ...mapState(["todos"]),
        ...mapGetters(["getItemsList"])
    },
    mounted() {
        this.$store.dispatch('checkAndCreateTodosStorage')
    },
    methods: {
        addItem() {
            this.$store.dispatch('addItem')
        }
    }
    // watch: {
    //     /* eslint-disable */
    //     todoWatch(newV, oldV) {
    //         console.log(this.$store.state.todos)
    //     }
    //     // todoWatch: {
    //     //     handler () {
    //     //         console.log(this.$store.state.todos)
    //     //     },
    //     //     deep: true 
    //     // }
    // }
}

</script>

<style>
    #todolist {
        border-color: red;
        border-radius: 2px;
        border-style: solid;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
    }

    #todolist > * {
        margin-bottom: .3em;
    }

    #itemAdd {
        align-self: center;
    }
</style>