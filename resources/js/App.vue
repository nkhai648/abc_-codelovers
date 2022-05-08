<template>
    <div>
        <div v-if="getStatusAuthen" class="wrapper">
            <Sidebar></Sidebar>

            <div class="content-wrapper">
                <section class="content">
                    <router-view></router-view>
                </section>
            </div>

            <Footer></Footer>
        </div>
        <div v-else>
            <Login></Login>
        </div>
    </div>
</template>

<script>
import Sidebar from './components/layouts/sidebar.vue';
import Footer from './components/layouts/footer.vue';
import Login from './components/layouts/login.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
    created() {
        this.GET_STATUS_USER();
    },
    computed: {
        ...mapGetters(['getStatusAuthen'])
    },
    components: {
        Sidebar,
        Footer,
        Login
    },
    methods: {
        ...mapActions(['GET_STATUS_USER'])
    }
};
</script>

<style></style>
