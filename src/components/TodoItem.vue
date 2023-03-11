<template>
    <div v-if="show" class="todoitem" draggable="true" @dragstart="startDrag" @dragend="endDrag">
        <UIButton class="itemDone" @click-button="markDone()">
            <button>Done</button>
        </UIButton>
        <input class="itemCategory" type="text" list="categories" :value="item.category" @change="categoryChange" />
        <input class="itemText" type="text" :value="item.text" @input="textInput" />
        <UIButton class="itemDel" text="Delete" @click-button="deleteItem()">
            <img src="https://img.icons8.com/color/512/cancel.png">
        </UIButton>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import UIButton from './UIButton.vue';

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
        UIButton
    },
    computed: {
        ...mapState(['todos','currCategory']),
        show() {
            if (this.currCategory !== "All" && this.currCategory !== this.item.category) {
                return false
            } else {
                return true
            }
        }
    },
    methods: {
        markDone() {
            this.$store.dispatch('updateItem', {index: this.index, property: 'done', value: !this.item.done})
        },
        deleteItem() {
            this.$store.dispatch('deleteItem', this.item.id)
        },
        /* eslint-disable */ 
        textInput(event) {
            // console.log(event.target.value)
            this.$store.dispatch('updateItem', {index: this.index, property: 'text', value: event.target.value})
        },
        categoryChange(event) {
            let val = event.target.value
            let updateCurrCat = false
            // if this item is the only one item showing, the current category should be updated as well
            if (this.currCategory === this.item.category &&
                this.todos.filter(e => e.category === this.item.category).length == 1) {
                updateCurrCat = true
            }

            // Make no category = "None"
            if (val === "") {
                val = "None"
            }

            this.$store.dispatch('updateItem', {index: this.index, property: 'category', value: val})
            this.$store.dispatch('updateCategories')
            if (updateCurrCat) this.$store.dispatch('updateCurrentCategory', val)
        },
        startDrag(event) {
            event.target.classList.add('dragged');
            event.dataTransfer.dropEffect = "move"
            event.dataTransfer.effectAllowed = "move"
            event.dataTransfer.setData('itemIndex', this.index)
        },
        endDrag(event) {
            event.target.classList.remove('dragged')
        },
    },
    watch: {
        // currCategory(newV) {
        //     console.log("item " + this.item.text + " watching " + newV)
        //     if (newV !== "All" && newV !== this.item.category) {
        //         this.show = false
        //     } else {
        //         this.show = true
        //     }
        // }
    }
}

</script>

<style>
    .todoitem {
        height: 80%;
        width: 70%;
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
        row-gap: 5%;
    }

    .dragged {
        opacity: 0.4;
        border: 2px dashed #9e9e9e;
    }

    .itemDone {
        flex-grow: 1;

        /* center the image */
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .itemDone * {
        height: inherit; /* make the image the same size as the container */
        width: inherit;
    }

    .itemText {
        flex-grow: 10;
        font-size: 1.5em;
    }

    .itemDel {
        flex-grow: 1;
        width: 3em;
        height: 3em;

        /* center the image */
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .itemDel * {
        height: inherit; /* make the image the same size as the container */
        width: inherit;

        /* Rotate the delete button */
        -webkit-transform:rotate(45deg);
        -moz-transform:rotate(45deg);
        transform:rotate(45deg);

        -webkit-transition: -webkit-transform 1s ease-out;
        -moz-transition: -moz-transform 1s ease-out;
        transition: transform 0.5s ease-out;
    }

    .itemDel *:hover {
        -webkit-transform:rotate(-45deg);
        -moz-transform:rotate(-45deg);
        transform:rotate(-45deg);
    }
</style>
  