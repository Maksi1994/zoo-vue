import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = () => new Vuex.Store({
    namespaced: true,
    actions: {
        async nuxtServerInit({dispatch, commit,}, {req, store}) {

        }
    },
});

export default store;
