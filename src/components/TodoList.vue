<template>
    <div id="todolist">
        <div id="categorySelector">
            <UIMenu id="category" :label="getDictionary.categoryLabel" :options="categories" @menu-changed="categorySelected">
                <option selected>{{ getDictionary.allCategory }}</option>
            </UIMenu>
        </div>

        <!-- Used for each todoitem's category selector -->
        <datalist id="categories">
            <template v-for="(category, i) in categories" :key="i">
                <!-- use <template> to prevent the "none" category from showing with below v-for -->
                <option v-if="category!==getDictionary.defaultCategory">{{ category }}</option>
            </template>
        </datalist>

        <TodoItemContainer v-for="(item, index) in todos" :key="item.id" :item="item" :index="index"/>

        <UIButton id="itemAdd" @click-button="addItem()">
            <button>{{ getDictionary.addTodoLabel }}</button>
        </UIButton>
    </div>
</template>

<script>
import TodoItemContainer from './TodoItemContainer.vue';
import UIButton from './UIButton.vue';
import UIMenu from './UIMenu.vue';
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'TodoLists',
    components: {
        TodoItemContainer,
        UIButton,
        UIMenu
    },
    computed: {
        ...mapState(['todos', 'categories']),
        ...mapGetters(['getDictionary'])
    },
    mounted() {
        this.$store.dispatch('checkAndCreateTodosStorage')
    },
    methods: {
        addItem() {
            this.$store.dispatch('addItem')
        },
        categorySelected(event) {
            this.$store.dispatch('updateCurrentCategory', event.target.value)
        }
    }
}

</script>

<style>
    #todolist {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
    }

    #todolist > * {
        margin-bottom: .3em;
    }

    #categorySelector {
        position: relative;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: center;
        color: #FCBB6D;
    }

    #categorySelector > * {
        margin-left: 0.5em;
    }

    #itemAdd {
        align-self: center;
        margin: 1em;
    }

    #itemAdd button {
        border: none;
        background-color: #4887a4;
        font-size: 1.5em;
        border-radius: 10px;
        padding: 0.5em;
    }

    #itemAdd button:hover:not(:active) {
        border-width: 1px;
        border-style: solid;
        border-color: #FCBB6D;
    }
</style>