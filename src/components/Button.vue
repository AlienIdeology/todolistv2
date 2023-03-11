<template>
    <div @click="$emit('click-button')">
        <slot />
    </div>
</template>

<script>

export default {
    name: 'TodoItem'
}

</script>

<style>
</style>
  