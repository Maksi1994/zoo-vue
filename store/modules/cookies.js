const cookieparser = process.server ? require('cookieparser') : undefined;
const Cookie = process.client ? require('js-cookie') : undefined

export default {
    namespaced: true,
    state: {

    },
    mutations: {
        initCookies(state, cookiesString) {
            if (process.server) {
                const parsed = cookieparser.parse(cookiesString);
                try {
                   state = parsed;

                } catch (err) {
                    // No valid cookie found
                }

            } else {
                state.store = Cookies.get()
            }

        },
        set(state, {key, val, isLong}) {
            state.store[key] = val;
            Cookie.set(key, val);
        },
        remove(state, key) {
            delete state.store[key];
            Cookie.remove(key);
        }
    }
}
