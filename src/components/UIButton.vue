<template>
    <div @click="event => $emit('click-button', event)">
        <slot />
    </div>
</template>

<script>

export default {
    name: 'UIButton',
    emits: ['click-button']
}

</script>

<style>
</style>
  