<template>
    <nav>
        <h1>Todolist</h1>
    </nav>
  <TodoList />
</template>

<script>
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    TodoList
  }
}
</script>

<style>
body {
    margin: 0
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin: 0;
  padding: 0;
}

nav {
    position: relative;
    margin: 0;
    margin-bottom: 1em;
    height: 15vh;
    background-color: rgb(127, 242, 255);
    display: flex;
}

nav h1 {
    margin: auto;
    display: inline-block;
    font-size: 2em;
}
</style>
