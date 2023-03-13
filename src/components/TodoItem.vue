<template>
    <div class="todoitem" draggable="true" @dragstart="startDrag" @dragend="endDrag">
        <UIButton class="itemDone" @click-button="markDone()">
            <div class="doneOutline">
                <div class="doneInner" v-if="item.done"></div>
            </div>
        </UIButton>

        <input class="itemCategory" type="text" list="categories" :value="item.category" @change="categoryChange" />

        <input class="itemText" type="text" :value="item.text" @input="textInput" />

        <UIButton class="itemDel" text="Delete" @click-button="deleteItem()">
            <img src="../assets/red-x.png">
        </UIButton>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
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
        ...mapState(['todos']),
        ...mapGetters(['getCurrCategory'])
    },
    methods: {
        markDone() {
            // console.log(event.currentTarget)
            // event.currentTarget.done = !this.item.done
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
            if (this.getCurrCategory === this.item.category &&
                this.todos.filter(e => e.category === this.item.category).length == 1) {
                updateCurrCat = true
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
    }
}

</script>

<style>
    .todoitem {
        height: 80%;
        width: 70%;
        padding: 0.7em;
        margin-left: auto;
        margin-right: auto;
        cursor: move;

        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: stretch;
        column-gap: 2%;
    }

    .todoitem:hover {
        background-color: #536e93;
    }

    .dragged {
        opacity: 0.4;
        border: 1px solid #9e9e9e;
    }

    .itemDone {
        flex-grow: 1;
        width: 3em;
        height: 3em;
        cursor: pointer;

        /* center the content of the button */
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .itemDone .doneOutline {
        box-sizing: border-box;
        position: relative;
        width: 2.6em; 
        aspect-ratio: 1 / 1;

        border-radius: 50%;
        border-width: 2px;
        border-style: solid;
        border-color: var(--theme-color);
    }

    .itemDone .doneInner {
        box-sizing: border-box;
        position: absolute;
        top: 5%;
        left: 5%;
        width: 90%;
        aspect-ratio: 1 / 1;

        border-radius: 50%;
        background-color: var(--theme-color);
    }

    .itemCategory {
        flex-grow: 1;
        text-align: center;

        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        padding: 2px;
        border-radius: 10px;
        border-width: 0px;
        /* background-color: #617796; */
        background-color: var(--background-input);
        color: var(--text-body);
    }

    .itemCategory:focus {
        border-width: 1px;
        border-color: var(--theme-color);
        /* #a8bbd5; */
        border-style: solid;
        outline: 0px;
    }

    .itemText {
        flex-grow: 10;
        font-size: 1.5em;
        background: transparent;
        border-width: 0px;
        color: var(--text-body);
    }

    .itemText:focus {
        border-bottom-width: 2px;
        border-color: var(--theme-color);
        outline: 0px;
    }

    .itemDel {
        flex-grow: 1;
        /* width: 3em; */
        width: fit-content;
        /* height: 3em; */
        cursor: pointer;

        /* center the image */
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .itemDel * {
        height: inherit; /* make the image the same size as the container */
        width: 3em;

        /* Transformation for rotating the delete button */
        -webkit-transition: -webkit-transform 1s ease-out;
        -moz-transition: -moz-transform 1s ease-out;
        transition: transform 0.5s ease-out;
    }

    .itemDel *:hover {
        /* Rotate the delete button */
        -webkit-transform:rotate(-90deg);
        -moz-transform:rotate(-90deg);
        transform:rotate(-90deg);
    }
</style>