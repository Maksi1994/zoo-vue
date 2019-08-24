<template>
    <div class="wrap-form">
        <b-form @submit="onSubmit">
            <b-form-file v-model="avatarFile" class="ml-auto d-block mt-3" plain></b-form-file>
            <b-form-group
                    class="mt-5"
                    id="input-group-1"
                    label="User Name:"
                    label-for="input-1"
            >
                <b-form-input
                        id="input-1"
                        v-model="form.name"
                        type="text"
                ></b-form-input>
            </b-form-group>

            <div>
                <b-button class="d-block ml-auto" type="submit" variant="primary">Save</b-button>
            </div>

        </b-form>
    </div>
</template>

<script>
    import * as _ from 'lodash';

    export default {
        layout: 'frontend',
        middleware: 'auth',
        data() {
            return {
                avatarFile: null,
                wasSubmitted: false
            }
        },
        async asyncData({app}) {
            const user = await app.$axios.get('/users/get-curr-user');

            return {
                form: {
                    ...user
                }
            }
        },
        methods: {
            onSubmit() {
                this.wasSubmitted = false;

                if (!this.$v.form.$invalid) {
                    this.$axios.post('/users/updateUser', {
                        ..._.pick(this.form, ['name'])
                    }).then(() => {
                        this.$store.dispatch('auth/getUser');
                    }).catch((err) => {
                        console.error(err);
                    });
                }
                console.log(this.$store.state);
            }
        },
        validations: {
            form: {
                name: {}
            }
        }
    }
</script>

<style scoped>

</style>
