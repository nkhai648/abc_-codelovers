<template>
    <div class="register-page" style="min-height: 600.6px">
        <div class="register-box">
            <div class="register-logo">
                <a href="../../index2.html"><b>Admin</b>LTE</a>
            </div>

            <div class="card">
                <div class="card-body register-card-body">
                    <p class="login-box-msg">Register a new membership</p>

                    <form action="../../index.html" method="post">
                        <div class="input-group mb-3">
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Full name"
                                name="name"
                                v-model="form.name"
                            />
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>
                        </div>


                        
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
                        <div class="input-group mb-3">
                            <input
                                type="password"
                                class="form-control"
                                placeholder="Retype password"
                                name="password_confirmation"
                                v-model="form.password_confirmation"
                            />
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div v-if="getErrorsRegis != ''" class="alert alert-danger" role="alert" >
                            <div v-for="error in getErrorsRegis" :key="error.id">
                                <div v-for="item in error" :key="item.id">
                                    {{item}}
                                </div>
                            </div>
                        </div>
                        <div v-if="getAlertUser.register != ''" class="alert alert-success">
                            {{getAlertUser.register}}
                        </div>
                        <div class="row">
                            <!-- /.col -->
                            <div class="col-4">
                                <button
                                    type="submit"
                                    class="btn btn-primary btn-block"
                                    @click.prevent="submitRegister()"
                                >
                                    Register
                                </button>
                            </div>
                            <!-- /.col -->
                        </div>
                    </form>

                    <div class="social-auth-links text-center">
                        <p>- OR -</p>
                        <a href="#" class="btn btn-block btn-primary">
                            <i class="fab fa-facebook mr-2"></i>
                            Sign up using Facebook
                        </a>
                        <a href="#" class="btn btn-block btn-danger">
                            <i class="fab fa-google-plus mr-2"></i>
                            Sign up using Google+
                        </a>
                    </div>

                    <router-link tag="a" to="/">
                        I already have a membership
                    </router-link>
                </div>
                <!-- /.form-box -->
            </div>
            <!-- /.card -->
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            },
        }
    },
    computed: {
        ...mapGetters(['getErrorsUser', 'getAlertUser', 'getErrorsRegis'])
    },
    methods: {
        ...mapActions(['REGISTER_USER']),
        submitRegister() {
            this.REGISTER_USER(this.form)
        }
    }
};
</script>

<style></style>
