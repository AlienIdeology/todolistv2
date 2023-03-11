<template>
    <div id="todolist">
        <UIMenu id="category" label="Category" :options="categories" @menu-changed="categorySelected">
            <option selected>All</option>
        </UIMenu>
        <!-- Used for each todoitem's category selector -->
        <datalist id="categories">
            <option v-for="(category, i) in categories" :key="i">{{ category }}</option>
        </datalist>
        <TodoItemContainer v-for="(item, index) in todos" :key="item.id" :item="item" :index="index"/>
        <UIButton id="itemAdd" @click-button="addItem()">
            <button>Add Todo</button>
        </UIButton>
    </div>
</template>

<script>

import TodoItemContainer from './TodoItemContainer.vue';
import UIButton from './UIButton.vue';
import UIMenu from './UIMenu.vue';
import { mapState } from 'vuex';

export default {
    name: 'TodoLists',
    components: {
        TodoItemContainer,
        UIButton,
        UIMenu
    },
    computed: {
        ...mapState(['todos', 'categories'])
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