<template>
    <div v-if="show" lass="todoitemcontainer"
        @drop="onDrop($event)"
        @dragover.prevent
        @dragenter.prevent>
        <TodoItem :item="item" :index="index"/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TodoItem from './TodoItem.vue';

export default {
    name: 'TodoItemContainer',
    props: {
        item: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    components: {
        TodoItem
    },
    computed: {
        ...mapGetters(['getDictionary','getCurrCategory']),
        show() {
            return this.getCurrCategory === this.getDictionary.allCategory ||  // curr category "All" category
                this.getCurrCategory === this.item.category ||  // curr category matches this item's category
                (this.getCurrCategory === this.getDictionary.defaultCategory && this.item.category === "")  // "none" category
        }
    },
    methods: {
        onDrop(event) {
            const oldIndex = event.dataTransfer.getData('itemIndex')
            if (oldIndex != this.index) {    // item was dragged and dropped to a different container
                this.$store.dispatch('updateItemOrder', {oldIndex: oldIndex, newIndex: this.index})
            }
        }
    }
}

</script>

<style>
    .todoitemcontainer {
        /* margin: 0.2em; */
    }
</style>
  