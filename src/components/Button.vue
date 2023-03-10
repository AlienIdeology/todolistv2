<template>
    <button @click="$emit('click-button')">{{ text }}</button>
</template>

<script>

export default {
    name: 'TodoItem',
    props:  {
        text: String
    }
}

</script>

<style>
    .todoitem {
        border-color: red;
        border-radius: 5px;
    }
</style>
  