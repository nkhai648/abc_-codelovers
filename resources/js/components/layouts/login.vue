<template>
    <div class="hold-transition login-page">
        <div class="login-box">
            <div class="login-logo">
                <a href="../../index2.html"><b>Admin</b>LTE</a>
            </div>
            <!-- /.login-logo -->
            <div class="card">
                <div class="card-body login-card-body">
                    <p class="login-box-msg">Sign in to start your session</p>

                    <div class="input-group mb-3">
                        <input
                            type="email"
                            class="form-control"
                            placeholder="Email"
                            name="email"
                            v-model="form.email"
                        />
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-envelope"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input
                            type="password"
                            class="form-control"
                            placeholder="Password"
                            name="password"
                            v-model="form.password"
                        />
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    
                    <div v-if="getErrorsUser != ''"  class="alert alert-danger" role="alert" >
                        <div v-for="error in getErrorsUser" :key="error.id">
                            <div v-for="item in error" :key="item.id">
                                {{item}}
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-8">
                            <div class="icheck-primary">
                                <input type="checkbox" id="remember" />
                                <label for="remember"> Remember Me </label>
                            </div>
                        </div>
                        <!-- /.col -->
                        <div class="col-4">
                            <button
                                type="submit"
                                class="btn btn-primary btn-block"
                                @click.prevent="submitLogin"
                            >
                                Sign In
                            </button>
                        </div>
                        <!-- /.col -->
                    </div>

                    <div class="social-auth-links text-center mb-3">
                        <p>- OR -</p>
                        <a href="#" class="btn btn-block btn-primary">
                            <i class="fab fa-facebook mr-2"></i> Sign in using
                            Facebook
                        </a>
                        <a href="#" class="btn btn-block btn-danger">
                            <i class="fab fa-google-plus mr-2"></i> Sign in
                            using Google+
                        </a>
                    </div>
                    <!-- /.social-auth-links -->

                    <p class="mb-1">
                        <a href="forgot-password.html">I forgot my password</a>
                    </p>
                    <p class="mb-0">
                        <router-link tag="a" to="/register">
                        Register a new membership</router-link>
                    </p>
                </div>
                <!-- /.login-card-body -->
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
    data() {
        return {
            form: {
                email: '',
                password: ''
            },
        }
    },
    computed: {
        ...mapGetters(['getErrorsUser'])
    },
    methods: {
        ...mapMutations([]),
        ...mapActions(['LOGIN_USER']),
        submitLogin() {
            this.LOGIN_USER(this.form)
        }
    }
};
</script>

<style></style>
