<template>
    <div class="todoitem">
        <Button class="itemDone" text="Done" @click-button="markDone()" />
        <input class="itemInput" type="text" :value="item.text" @input="inputChange" />
        <Button class="itemDel" text="Delete" @click-button="deleteItem()"/>
    </div>
</template>

<script>

import Button from './Button.vue';

export default {
    name: 'TodoItem',
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    components: {
        Button
    },
    methods: {
        /* eslint-disable */
        markDone() {
            // copy this item then change its done value
            let newItem = JSON.parse(JSON.stringify(this.item))
            newItem.done = !this.item.done
            this.$store.dispatch('updateItem', newItem)
        },
        deleteItem() {
            this.$store.dispatch('deleteItem', this.item.id)
        },
        inputChange(event) {
            console.log(this.item)
            this.item.text = event.target.value
            this.$store.dispatch('updateItem', this.item)
        }
    }
}

</script>

<style>
    .todoitem {
        /* width: 50%; */
    }

    .itemDone {

    }

    .itemInput {
        width: 25%;
        font-size: 1.5em;
    }

    .itemDel {

    }
</style>
  