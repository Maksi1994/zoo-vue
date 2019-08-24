import Vue from "vue";
import Vuex from "vuex";
import cookies from './modules/cookies';
import * as _ from 'lodash';
Vue.use(Vuex);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const store = () => new Vuex.Store({
    namespaced: true,
    actions: {
        async nuxtServerInit({dispatch, commit}, {req, store, $axios}) {
            commit('cookies/initCookies', req.headers.cookie);
        }
    },
    modules: {
        cookies
    }
});

export default store;
