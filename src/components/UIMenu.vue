<template>
    <label :for="id">{{ label }}</label>
    <select :id="id" @change="event => $emit('menu-changed', event)">
        <option v-for="(option, i) in options" :key="i">{{ option }}</option>
        <slot /> <!-- additional options -->
    </select>
</template>

<script>

export default { 
    name: 'UIMenu',
    props: {
        id: {
            type: String,
            required: true
        },
        label: {
            type: String
        },
        options: {
            type: Array,
            required: true
        }
    },
    emits: ["menu-changed"]
}

</script>

<style>
</style>