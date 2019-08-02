<template>
    <section>
        <one @added="onAdded()"></one>
    </section>
</template>

<script>
    import One from '~/components/backend/animals/one.vue';

    export default {
        name: "create",
        layout: 'backend',
        methods: {
            onAdded() {
                this.$router.push('/backend/animals/1');
            }
        },
        components: {
            One
        },
    }
</script>

<style scoped>

</style>
