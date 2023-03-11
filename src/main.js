import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import items from './assets/todoitems.json'

const store = createStore({
    state: {
        todos: items,
        maxId: -1
    },
    getters: {
        getItemsList(state) {
            return state.todos
        },
        getMaxId(state) {
            // find max Id
            if (state.maxId == -1) {
                for (const item of state.todos) {
                    state.maxId = Math.max(state.maxId, item.id)
                }
            }
            return state.maxId
        }
    },
    actions: {
        addItem({commit, getters}) {
            const item = {
                "id": getters.getMaxId+1, 
                "text": "", 
                "done": false
            }
            commit('addItem', item)
            commit('incrMaxId')
            console.log("Adding item:")
            console.log(item)
            commit('updateTodosStorage')
        },
        updateItem({commit}, item) {
            console.log("Updating item:")
            console.log(item)
            commit('updateItem', item)
            commit('updateTodosStorage')
        },
        updateItemOrder({commit}, indexes) {
            commit('updateItemOrder', indexes)
            commit('updateTodosStorage')
        },
        deleteItem({commit}, itemId) {
            console.log("Deleting item:")
            commit('deleteItem', itemId)
            commit('updateTodosStorage')
        },
        checkAndCreateTodosStorage({commit}) {
            if (localStorage.getItem('todos')) {
                commit('updateTodosList')
            } else {
                this.createTodosStorage({commit})
            }
        },
        createTodosStorage({commit}) {
            commit('createTodosStorage')
        }
    },
    mutations: {
        incrMaxId(state) {
            state.maxId++
        },
        addItem(state, item) {
            state.todos.push(item)
        },
        updateItem(state, item) {
            let index = state.todos.findIndex(e => e.id === item.id)
            if (index >= 0)
                state.todos.splice(index, 1, item);
        },
        updateItemOrder(state, {oldIndex, newIndex}) {
            console.log("old: " + oldIndex + " new: " + newIndex)
            // remove item from todo list at old index
            const moved = state.todos.splice(oldIndex, 1)[0]
            state.todos.splice(newIndex, 0, moved)
            console.log(state.todos)
        },
        deleteItem(state, itemId) {
            state.todos = state.todos.filter(e => e.id !== itemId)
        },
        createTodosStorage(state) {
            localStorage.setItem('todos', JSON.stringify(state.todos))
            console.log("Created storage:");
            console.log(localStorage.todos);
        },
        updateTodosStorage(state) {
            localStorage.setItem('todos', JSON.stringify(state.todos))
            console.log("Updated storage:");
            console.log(localStorage.todos);
        },
        updateTodosList(state) {
            state.todos = JSON.parse(localStorage.getItem('todos'))
            console.log("Updated JS todos:");
            console.log(state.todos);
        }
    }
})

const app = createApp(App)

app.use(store)

app.mount('#app')