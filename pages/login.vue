<template>
    <div>
        <b-form class="wrap-form mx-auto" @submit.prevent="onSubmit">
            <b-form-group
                    id="input-group-1"
                    label="Email address:"
                    label-for="input-1">
                <b-form-input
                        :state="getFieldState('email')"
                        id="input-1"
                        v-model="$v.form.email.$model"
                        type="text"
                        placeholder="Enter email"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2"
                          label="Password:"
                          label-for="input-2">
                <b-form-input
                        :state="getFieldState('password')"
                        id="input-2"
                        v-model="$v.form.password.$model"
                        type="password"
                        placeholder="Password"
                ></b-form-input>
            </b-form-group>

            <div class="py-2 d-flex justify-content-end">
                <b-form-checkbox
                        id="checkbox-1"
                        v-model="form.remember_me">
                    Remember me
                </b-form-checkbox>
            </div>

            <b-button class="d-block ml-auto mt-3" type="submit" variant="primary">Login</b-button>
        </b-form>
    </div>
</template>

<script>
    import {required, email, minLength} from 'vuelidate/lib/validators';

    export default {
        name: "login",
        layout: 'frontend',
        middleware:'guest',
        data() {
            return {
                loadingLoginAction: false,
                wasSubmitted: false,
                form: {
                    email: '',
                    password: '',
                    remember_me: false
                }
            }
        },
        methods: {
            getFieldState(field) {
                return this.wasSubmitted ? !this.$v.form[field].$invalid : null;
            },
            onSubmit() {
                this.wasSubmitted = true;
                if (!this.$v.form.$invalid) {
                    this.loadingLoginAction = true;
                    this.$auth.loginWith('local', {
                        data: {
                            ...this.form
                        }
                    }).then(() => {
                        this.$router.push('/');
                    });
                }
            }
        },
        validations: {
            form: {
                email: {
                    required,
                    email
                },
                password: {
                    required,
                    minLength: minLength(6)
                }
            }
        }
    }
</script>

<style scoped>

</style>
