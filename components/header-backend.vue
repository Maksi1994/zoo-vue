<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand to="/">Frontend</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/backend/animals">Animals</b-nav-item>
                    <b-nav-item active-class="'active'" to="/backend/places">Places</b-nav-item>
                </b-navbar-nav>

                <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                        <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                    </b-nav-form>

                    <b-nav-item-dropdown right>
                        <template slot="button-content"><em>User</em></template>
                        <b-dropdown-item to="/profile">Profile</b-dropdown-item>

                        <b-dropdown-item @click="onLogout">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>

                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    export default {
        methods: {
            onLogout() {
                this.$auth.logout();
            }
        }
    }
</script>

<style scoped>

</style>
