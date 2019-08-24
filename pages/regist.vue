<template>
    <section>
        <div >
            <b-form @submit.prevent="registUser" @reset="onReset">
                <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
                    <b-form-input
                            :state="isValid('name')"
                            id="input-2"
                            v-model="form.name"
                            placeholder="Enter name"
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                        id="input-group-1"
                        label="Email address:"
                        label-for="input-1"
                        description="We'll never share your email with anyone else.">
                    <b-form-input
                            :state="isValid('email')"
                            id="input-1"
                            v-model="form.email"
                            type="email"
                            placeholder="Enter email"
                    ></b-form-input>
                </b-form-group>


                <b-form-group id="input-group-3" label="Role:" label-for="input-3">
                    <b-form-select
                            :state="isValid('role_id')"
                            id="input-3"
                            v-model="form.role_id"
                            :options="roles"
                            placeholder="User Role"
                    ></b-form-select>
                </b-form-group>

                <div class="mb-3">
                    <label>Password:</label>
                    <b-input placeholder="Password" :state="isValid('password')" v-model="form.password" type="password"
                             id="text-password" aria-describedby="password-help-block"></b-input>
                </div>

                <div>
                    <label>Repeat Password:</label>
                    <b-input placeholder="Repeat Password" :state="isValid('repeat_password')"
                             v-model="form.repeat_password" type="password" id="text-password"
                             aria-describedby="password-help-block"></b-input>
                </div>
                <section class="mt-5 d-flex justify-content-end">
                    <b-button class="mr-5" type="reset" variant="danger">Reset</b-button>
                    <b-button type="submit" variant="primary">Regist</b-button>
                </section>
            </b-form>
        </div>
    </section>
</template>

<script>
    import {required, between, numeric, email, minLength} from 'vuelidate/lib/validators'

    export default {
        name: "regist",
        layout: 'frontend',
        middleware:'guest',
        data() {
            return {
                form: {
                    name: '',
                    email: '',
                    role_id: null,
                    password: '',
                    repeat_password: ''

                },
                roles: [],
                wasSubmitted: false,
            }
        },
        methods: {
            registUser() {
                this.wasSubmitted = true;

                if (!this.$v.form.$invalid) {

                }
            },
            onReset() {
                this.form = {};
            },
            isValid(fieldName) {
                return !this.wasSubmitted ? null : this.wasSubmitted && !this.$v.form[fieldName].$invalid;
            }
        },
        async created() {
            try {
                this.roles = await this.$axios.$get('users/get-all-roles');
            } catch (e) {
                console.error(e);
            }

            console.log(this.roles);
        },
        validations: {
            form: {
                name: {
                    required,
                    minLength: 3
                },
                email: {
                    required,
                    email,
                    async isUnique(value) {
                        if (value === '') return true;

                        return this.$axios.$get('users/users/' + value);
                    }
                },
                role_id: {
                    required,
                    numeric
                },
                password: {
                    required,
                    minLength: minLength(6)
                },
                repeat_password: {
                    required,
                    minLength: minLength(6)
                }
            }
        }
    }
</script>

<style scoped>

</style>
