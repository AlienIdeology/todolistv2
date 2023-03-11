import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import items from './assets/todoitems.json'

const store = createStore({
    state: {
        todos: items,
        categories: [],     // list of categories
        currCategory: "All",    // the current category selected
        maxId: -1
    },
    getters: {
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
                "category": "None",
                "text": "", 
                "done": false
            }
            commit('addItem', item)
            commit('incrMaxId')
            console.log("Added item:")
            console.log(item)
            commit('updateTodosStorage')
        },
        updateItem({commit}, info) {
            commit('updateItem', info)
            commit('updateTodosStorage')
            console.log("Updated item (property: "+ info.property + ")")
        },
        updateItemOrder({commit}, indexes) {
            commit('updateItemOrder', indexes)
            commit('updateTodosStorage')
            console.log("Updated item index\nold: " + indexes.oldIndex + " new: " + indexes.newIndex)
        },
        deleteItem({commit}, itemId) {
            console.log("Deleting item (id: " + itemId + ")")
            commit('deleteItem', itemId)
            commit('updateTodosStorage')
        },
        checkAndCreateTodosStorage({commit}) {
            // commit('removeTodosStorage')
            if (localStorage.getItem('todos')) {
                commit('updateTodosList')
            } else {
                commit('createTodosStorage')
            }
            commit('updateCategories')
        },
        createTodosStorage({commit}) {
            commit('createTodosStorage')
            console.log("Created storage:");
            console.log(localStorage.todos);
        },
        updateCategories({commit}) {
            commit('updateCategories')
        },
        updateCurrentCategory({commit}, category) {
            commit('updateCurrentCategory', category)
        }
    },
    mutations: {
        incrMaxId(state) {
            state.maxId++
        },
        addItem(state, item) {
            state.todos.push(item)
        },
        updateItem(state, {index, property, value}) {
            state.todos[index][property] = value;
        },
        updateItemOrder(state, {oldIndex, newIndex}) {
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
        },
        updateTodosStorage(state) {
            localStorage.setItem('todos', JSON.stringify(state.todos))
            console.log(localStorage.todos);
        },
        removeTodosStorage() { // for development
            localStorage.removeItem('todos')
        },
        updateTodosList(state) {
            state.todos = JSON.parse(localStorage.getItem('todos'))
            console.log("Updated/loaded todos list:");
            console.log(state.todos);
        },
        updateCategories(state) {
            state.categories = [] // reset categories
            state.todos.forEach(element => {
                if (!state.categories.includes(element.category))
                    state.categories.push(element.category)
            });
        },
        updateCurrentCategory(state, category) {
            state.currCategory = category;
        }
    }
})

const app = createApp(App)

app.use(store)

app.mount('#app')