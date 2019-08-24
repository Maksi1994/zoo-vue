<template>
    <editor :id="id" @complete="completeEditing"></editor>
</template>

<script>
    import Editor from '~/components/backend/places/editor.vue';

    export default {
        name: "index",
        layout: 'backend',
        computed: {
          id() {
              return this.$route.params.id
          },
        },
        methods: {
            completeEditing() {
                this.$router.push('/backend/places/1');
            }
        },
        components: {
            Editor
        }
    }
</script>

<style scoped>

</style>
