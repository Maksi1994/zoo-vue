<template>
    <div class="wrap-form">
        <div class="text-center d-flex align-items-center justify-content-center wrap-loader" v-if="loading">
            <b-spinner variant="primary" label="Spinning"></b-spinner>
        </div>
        <b-form v-else @submit.prevent="save" @reset.prevent="reset">
            <b-form-group
                    @change="touch('name')"
                    id="input-group-1"
                    label="Animal name:"
                    label-for="input-1"
                    description="">
                <b-form-input
                        :state="isValid('name')"
                        id="input-1"
                        v-model="form.name"
                        type="text"
                        placeholder="Enter name"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                    @change="touch('weight')"
                    id="input-group-1"
                    label="Weight:"
                    label-for="input-1"
                    description="">
                <b-form-input
                        id="input-1"
                        :state="isValid('weight')"
                        v-model="form.weight"
                        type="number"
                        placeholder="Enter weight"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                    @change="touch('age')"
                    id="input-group-1"
                    label="Age:"
                    label-for="input-1"
                    description="">
                <b-form-input
                        id="input-1"
                        :state="isValid('age')"
                        v-model="form.age"
                        type="number"
                        placeholder="Enter age"
                ></b-form-input>
            </b-form-group>
            <b-form-group
                    @change="touch('place_id')"
                    id="input-group-1"
                    label="Place:"
                    label-for="input-1"
                    description="">
                <b-form-select
                        :state="isValid('place_id')"
                        placeholder="Select existing place"
                        v-model="form.place_id"
                        :options="places">
                </b-form-select>
            </b-form-group>

            <section class="d-flex justify-content-end mt-5">
                <b-button class="px-5 mr-3" type="reset" @click="reset()" variant="danger">Reset</b-button>

                <b-button class="px-5 " type="submit" variant="primary" @click="save()">Save</b-button>
            </section>

        </b-form>
    </div>
</template>

<script>
    import {required, minLength, between, numeric} from 'vuelidate/lib/validators'


    export default {
        name: "one",
        props: ['data'],
        data() {
            return {
                form: {
                    place_id: null,
                    name: null,
                    age: null,
                    weight: null
                },
                loading: true,
                places: [],
                wasSubmitted: false
            }
        },
        methods: {
            reset() {
                for (let field in this.form) {
                    this.form[field] = null;
                }
            },
            save() {
                this.wasSubmitted = true;

                console.log('submit');

                if (!this.$v.form.$invalid) {
                    this.$emit('added');
                }
            },
            loadPlaces() {
                return new Promise((res, rej) => {
                    setTimeout(() => {
                        res([
                            {
                                text: 'B',
                                value: 1
                            },
                            {
                                text: 'A',
                                value: 2
                            }
                        ])
                    }, 1000);
                });
            },
            touch(fieldName) {
                this.$v.form[fieldName].touch();
            },
            isValid(fieldName) {
                if (!this.wasSubmitted) {
                    return null;
                }
                return !this.$v.form[fieldName].$invalid;
            }
        },
        async created() {
            this.places = await this.loadPlaces();
            this.loading = false;
        },
        validations: {
            form: {
                name: {
                    required,
                    minLength: 3
                },
                age: {
                    required,
                    numeric
                },
                weight: {
                    required,
                    numeric
                },
                place_id: {
                    required,
                    numeric
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .wrap-form {
        width: 700px;
        margin: 0 auto;
    }

    .wrap-loader {
        height: 415px;
    }
</style>
