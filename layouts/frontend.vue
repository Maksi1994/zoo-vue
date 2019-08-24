<template>
    <section>
        <header-frontend class="mb-5"></header-frontend>

        <section class="container">
            <nuxt/>
        </section>

        <section class="footer mt-5 py-3">

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

<style scoped lang="scss">
    .footer {
        min-height: 100px;
        background-color: #17a2b8 !important;
    }
</style>
