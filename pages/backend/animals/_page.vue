<template>
    <section class="wrap">
        <b-button variant="primary"  class="add-btn" size="lg">Add +</b-button>
    </section>

</template>

<script>
    export default {
        name: "_page",
        layout: 'backend'
    }
</script>

<style scoped lang="scss">
    .wrap {
        position: relative;

        .add-btn {
            position: fixed;
            top: 80px;
            right: 30px;
        }
    }

</style>
