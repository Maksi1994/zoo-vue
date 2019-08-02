<template>
    <section>
        <list></list>
    </section>
</template>

<script>
    import List from '~/components//backend/places/list.vue';

    export default {
        layout: 'backend',
        computed: {
          page() {
              return this.$route.params.page || 1;
          }
        },
        components: {
            List
        }
    }
</script>

<style scoped>

</style>
