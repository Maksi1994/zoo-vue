<template>
    <section>
        <header-frontend class="mb-5"></header-frontend>

        <section class="container">
            <nuxt />
        </section>
    </section>
</template>

<script>
    import HeaderFrontend from '~/components/header-frontend.vue';

    export default {
        name: "frontend",
        components: {
            HeaderFrontend
        }
    }
</script>

<style scoped>

</style>
