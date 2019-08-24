<template>
    <div class="wrap-form">
        <b-form @submit.prevent="save" @reset.prevent="onReset">
            <b-form-group
                    id="input-group-1"
                    label="Place name"
                    label-for="input-1">
                <b-form-input
                        id="input-1"
                        v-model="$v.form.name.$model"
                        type="text"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Place Area" label-for="input-2">
                <b-form-input
                        id="input-2"
                        v-model="$v.form.area.$model"
                        type="number"
                ></b-form-input>
            </b-form-group>

            <section class="d-flex mt-5 justify-content-end">
                <b-button class="mr-4" type="reset" variant="danger">Reset</b-button>
                <b-button type="submit" variant="primary">Submit</b-button>
            </section>
        </b-form>
    </div>
</template>

<script>
    import {required, minLength, numeric} from 'vuelidate/lib/validators';

    export default {
        name: "one",
        scroollToTop: true,
        props: ['id'],
        data() {
            return {
                form: {
                    name: '',
                    area: null
                }
            }
        },
        methods: {
            async save() {
                if (!this.$v.form.$invalid) {
                    this.$axios.$post('/backend/places/save/', {...this.form, id: this.id}).then(() => {
                        this.$emit('complete');
                    }).catch(err => {
                        console.error(e.message);
                    });
                }
            },
            async loadPlace() {
                try {
                    const place = await this.$axios.$get(`/backend/places/get-one/${this.id}`);

                    for (let field in this.form) {
                        this.form[field] = place[field] || null;
                    }
                } catch (e) {
                    console.error(e.message);
                }

            },
            onReset() {
                for (let field in this.form) {
                    this.form[field] = null;
                }
            }
        },
        async created() {
            if (this.id) {
                await this.loadPlace();
            }
        },
        validations: {
            form: {
                name: {
                    required,
                    minLength: minLength(3)
                },
                area: {
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
</style>
