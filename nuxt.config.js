export default {
    mode: 'universal',
    /*
    ** Headers of the page
    */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: {color: '#fff'},
    /*
    ** Global CSS
    */
    css: [
        '~node_modules/bootstrap/dist/css/bootstrap.css',
        '~node_modules/bootstrap-vue/dist/bootstrap-vue.css',
        "~node_modules/@fortawesome/fontawesome-free/css/all.css",
        '~index.scss'
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        '@plugins/vue-bootstrap',
        '@plugins/vuelidate',
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/auth',
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
    ],
    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {
        baseURL: 'https://zoo.com/api/'
    },
    auth: {
        login: '/login',
        logout: '/',
        strategies: {
            local: {
                endpoints: {
                    login: {url: 'users/login', method: 'post', propertyName: 'access_token'},
                    logout: {url: 'users/logout', method: 'get',},
                    user: {url: 'users/get-curr-user', method: 'get', propertyName: 'data'},
                },
                tokenRequired: true,
                tokenType: 'Bearer'
            },
        }
    },
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
        }
    }
}
