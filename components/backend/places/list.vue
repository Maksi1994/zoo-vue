<template>
   <div v-if="meta">


       <div class="pagination-wrap d-flex justify-content-center">
           <b-pagination
                   v-model="page"
                   :total-rows="meta.total"
                   :per-page="meta.per_page"
                   first-text="First"
                   prev-text="Prev"
                   next-text="Next"
                   last-text="Last"
           ></b-pagination>
       </div>
   </div>
</template>

<script>
    export default {
        params: ['list', 'pagination'],
        name: "list",
        data() {
            return {
                page: 1,
                places: [],
                meta: null,
                orderType: 'new',
                order: 'desc'
            }
        },
        watch: {
            $route(to) {
                this.loadPlaces();
            },
            page(currPage) {
               this.$router.push({ path: `/backend/places/${currPage}`, query: { orderType: this.orderType, order: this.order } });
            },
            orderType() {
                this.$router.push({ path: `/backend/places/${this.page}`, query: { orderType: this.orderType, order: this.order } });
            },
            order() {
                this.$router.push({ path: `/backend/places/${this.page}`, query: { orderType: this.orderType, order: this.order } });
            }
        },
        methods: {
            loadPlaces(page = this.page) {
              this.$axios.post('/backend/places/get-list', {
                  page: this.page,
                  orderType: this.orderType,
                  order: this.order
              }).then(({data, meta}) => {
                  this.places = data;
                  this.meta = meta;
              }).catch(err => {
                 console.error(err);
              });
          }
        },
        created() {
            this.page = +this.$route.params.page || 1;
            this.loadPlaces();
        }
    }
</script>

<style scoped>

</style>
