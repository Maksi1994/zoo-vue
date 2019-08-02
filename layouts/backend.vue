<template>
    <section>
        <header-backend class="mb-5"></header-backend>

        <section class="container">
            <nuxt />
        </section>
    </section>

</template>

<script>
    import HeaderBackend from '~/components/header-backend.vue';

    export default {
        name: "backend",
        components: {
            HeaderBackend
        }
    }
</script>

<style scoped>

</style>
