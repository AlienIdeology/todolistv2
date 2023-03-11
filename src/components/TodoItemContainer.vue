<template>
    <div class="todoitemcontainer"
        @drop="onDrop($event)"
        @dragover.prevent
        @dragenter.prevent>
        <TodoItem :item="item" :index="index"/>
    </div>
</template>

<script>
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
        background-color: rgb(241, 240, 240);
    }
</style>
  