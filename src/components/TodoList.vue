<template>
    <div id="todolist">
        <TodoItemContainer v-for="(item, index) in getItemsList" :key="item.id" :item="item" :index="index"/>
        <Button id="itemAdd" @click-button="addItem()">
            <button>Add Todo</button>
        </Button>
    </div>
</template>

<script>

import TodoItemContainer from './TodoItemContainer.vue';
import Button from './Button.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'TodoLists',
    components: {
        TodoItemContainer,
        Button
    },
    computed: {
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