<template>
    <section>
        <div class="py-3 mb-5 d-flex justify-content-end border-bottom">

            <div class="p-1">
                <b-button class="mr-2" variant="light" @click="changeParams(getFilterParams('new'))">Newest
                    <i v-if="options.order === 'desc'" class="ml-2 fas fa-arrow-up"></i>
                    <i v-else class="ml-2 fas fa-arrow-down"></i>
                </b-button>

                <b-button variant="light" @click="changeParams(getFilterParams('popular'))">Popular
                    <i v-if="options.order === 'desc'" class="ml-2 fas fa-arrow-up"></i>
                    <i v-else class="ml-2 fas fa-arrow-down"></i>
                </b-button>
            </div>

        </div>

        <section class="content-container d-flex justify-content-between pb-5">
            <template v-if="!loading">
                <b-card v-for="animal in animals" :key="animal.id" class="card" img-alt="Image" img-top>
                    <b-card-img class="img mb-4"
                                src="https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg"></b-card-img>

                    <div class="px-2 py-0 content-card">
                        <b-card-title>{{animal.name}}</b-card-title>
                        <b-card-sub-title class="mb-3">Age: {{animal.age}}</b-card-sub-title>
                        <b-card-sub-title class="mb-3">Place:
                            <nuxt-link :to="'/places/one/' + animal.place.id">{{animal.place.name}}</nuxt-link>
                        </b-card-sub-title>
                        <b-card-text class="mt-auto">
                            This is a wider card with supporting text below as a natural lead-in to additional content.
                            This content is a little bit longer.
                        </b-card-text>
                    </div>

                    <div slot="footer">
                        <small class="text-muted">{{animal.created_at}}</small>
                    </div>
                </b-card>
            </template>

        </section>

        <div class="d-flex pt-5 justify-content-center">
            <b-pagination
                    @change="changeParams({page: $event})"
                    v-model="meta.current_page"
                    :total-rows="meta.total"
                    :per-page="meta.per_page">
            </b-pagination>
        </div>
    </section>
</template>

<script>
    export default {
        layout: "frontend",
        data() {
            return {
                loading: false
            }
        },
        async asyncData({params, query, $axios}) {
            const {meta, data} = await $axios.$post('/animals/get-list', {
                order: query.order || 'desc',
                orderType: query.orderType || 'new',
                page: params.page || 1
            });

            return {
                meta,
                animals: data,
                page: params.page || 1,
                options: query
            };
        },
        computed: {
            orderType() {
                return this.options.orderType;
            },
            order() {
                return this.options.order;
            }
        },
        watch: {
            $route() {
                this.loadData();
            }
        },
        methods: {
            async loadData() {
                this.loading = true;
                const {meta, data} = await this.$axios.$post('/animals/get-list', {
                    ...this.options,
                    page: this.page
                });

                this.loading = false;
                this.meta = meta;
                this.animals = data;
            },
            changeParams({page, order, orderType}) {
                if (page) {
                    this.page = page;
                }

                if (order) {
                    this.options.order = order;
                }

                if (orderType) {
                    this.options.orderType = orderType;
                }

                this.$router.push({
                    path: `/animals/${this.page}`,
                    query: this.options
                });
            },
            getFilterParams(orderType) {
                if (orderType === this.options.orderType) {
                    return {
                        order: this.options.order === 'desc' ? 'asc' : 'desc',
                        orderType
                    };
                } else {
                    return {
                        order: 'desc',
                        orderType
                    };
                }
            },
            setEstimate(id, estimate) {
                this.$axios.post('/estimates/save-estimate', {
                    type: 'animal',
                    id,
                    estimate
                }).catch(err => {
                    console.error(err);
                });
            },
        }
    }
</script>

<style scoped lang="scss">
    .content-card {
        height: 185px;
    }

    .card {
        height: 550px;
        width: 45%;

        .img {
            height: 250px;
            object-fit: cover;
            object-position: center;
        }
    }
</style>
