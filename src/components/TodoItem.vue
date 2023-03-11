<template>
    <div class="todoitem" draggable="true" @dragstart="startDrag" @dragend="endDrag">
        <Button class="itemDone" @click-button="markDone()">
            <button>Done</button>
        </Button>
        <input class="itemInput" type="text" :value="item.text" @input="inputChange" />
        <Button class="itemDel" text="Delete" @click-button="deleteItem()">
            <img src="https://img.icons8.com/color/512/cancel.png">
        </Button>
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
        },
        index: {
            type: Number,
            required: true
        }
    },
    components: {
        Button
    },
    methods: {
        markDone() {
            // copy this item then change its done value
            let newItem = JSON.parse(JSON.stringify(this.item))
            newItem.done = !this.item.done
            this.$store.dispatch('updateItem', newItem)
        },
        deleteItem() {
            this.$store.dispatch('deleteItem', this.item.id)
        },
        /* eslint-disable */ 
        inputChange(event) {
            console.log(this.item)
            this.item.text = event.target.value
            this.$store.dispatch('updateItem', this.item)
        },
        startDrag(event) {
            event.target.classList.toggle('dragged');
            event.dataTransfer.dropEffect = "move"
            event.dataTransfer.effectAllowed = "move"
            event.dataTransfer.setData('itemIndex', this.index)
        },
        endDrag(event) {
            event.target.classList.toggle('dragged');
        }
    }
}

</script>

<style>
    .todoitem {
        height: 80%;
        width: 90%;
        margin: 0.2em;
        margin-left: auto;
        margin-right: auto;
        border-radius: 2px;
        border-style: solid;
        border-color: rgba(0, 0, 255, 0.357);
        background-color: white;
        /* position: absolute; */

        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: stretch;
        row-gap: 1em;
    }

    .dragged {
        opacity: 0.4;
        border: 3px dotted #666;
    }

    .itemDone {
        flex-grow: 1;
        /* width: 0.5em; */
    }

    .itemInput {
        flex-grow: 5;
        width: 25%;
        font-size: 1.5em;
    }

    button.itemDel {
        background: transparent;
        outline: 0;
        border: none;
    }

    .itemDel * {
        flex-grow: 1;
        opacity: 1;
        width: 3em;
        height: 3em;
    }
</style>
  