import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import items from './assets/todoitems.json'
import locale from './assets/locale.json'

const store = createStore({
    state: {
        todos: items,
        language: null,
        dictionary: null,
        currCategory: null,
        categories: [],     // list of categories
        maxId: -1
    },
    getters: {
        getLanguages() {
            return locale.languages
        },
        getDictionary(state) {
            if (!state.dictionary) {
                state.dictionary = locale.dictionaries[locale.languages[0]]
            }
            return state.dictionary
        },
        getCurrCategory(state) {    // the current category selected
            if(!state.currCategory) {
                state.currCategory = state.dictionary.allCategory
            }
            return state.currCategory
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
            let category = "" // for default categort
            if (getters.getCurrCategory !== getters.getDictionary.allCategory &&
                getters.getCurrCategory !== getters.getDictionary.defaultCategory)
                category = getters.getCurrCategory
            const item = {
                "id": getters.getMaxId+1,
                "category": category,
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
        },
        updateLanguage({commit, getters}, language) {
            // need to take care of old "all" and "none" category changes
            const oldDict = getters.getDictionary
            commit('updateLanguage', language)
            if (getters.getCurrCategory === oldDict.allCategory)
                commit('updateCurrentCategory', getters.getDictionary.allCategory)
            if (getters.getCurrCategory === oldDict.defaultCategory)
                commit('updateCurrentCategory', getters.getDictionary.defaultCategory)
            commit('updateCategories') // update category list
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
            let addNone = false
            state.todos.forEach(element => {
                // add the "none" category
                if (element.category === "") {
                    addNone = true
                    return
                }

                if (!state.categories.includes(element.category))
                    state.categories.push(element.category)
            })
            if (addNone) state.categories.push(state.dictionary.defaultCategory)
        },
        updateCurrentCategory(state, category) {
            state.currCategory = category;
        },
        updateLanguage(state, language) {
            state.language = language
            state.dictionary = locale.dictionaries[language]
        }
    }
})

const app = createApp(App)

app.use(store)

app.mount('#app')