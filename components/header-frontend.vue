<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="/">Logo</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/backend/places" v-if="isAdmin">Backend</b-nav-item>
                    <b-nav-item to="/animals">Animals</b-nav-item>
                    <b-nav-item to="/places">Places</b-nav-item>
                    <b-nav-item to="/news">News</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                        <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                    </b-nav-form>


                    <b-nav-item-dropdown class="ml-5" right v-if="$auth.loggedIn">
                        <!-- Using 'button-content' slot -->
                        <template slot="button-content"><em>User</em></template>
                        <b-dropdown-item to="/profile">Profile</b-dropdown-item>
                        <b-dropdown-item @click="onLogout">Log Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-navbar-nav class="ml-5" v-else>
                        <b-nav-item to="/login">Log In</b-nav-item>
                        <b-nav-item to="/regist">Registration</b-nav-item>
                    </b-navbar-nav>

                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    export default {
        name: "header-frontend",
        computed: {
            isAdmin() {

                let {user} = this.$auth;

                if (!user) {
                    return false;
                }

                return user.role && user.role.name === 'Admin';
            }
        },
        methods: {
            onLogout() {
                this.$auth.logout();
            }
        },
    }
</script>

<style scoped>

</style>
