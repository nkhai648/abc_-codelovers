import router from "../../routes";
const state = {
    errors: [],
    errorsRegis: [],
    infoUser: [],
    alert: {
        register: ""
    },
    statusAuthen: false
};
const getters = {
    getErrorsUser: (state) => state.errors,
    getErrorsRegis: (state) => state.errorsRegis,
    getInfoUser: (state) => state.infoUser,
    getAlertUser: (state) => state.alert,
    getStatusAuthen: (state) => state.statusAuthen
};
const mutations = {
    getInfoUser(state, data) {
        state.infoUser = data;
    },
    logoutUser(state) {
        localStorage.removeItem("token_login");
        router.push({ name: "Login" });
    },
    changeStatus(state, data) {
        state.statusAuthen = data;
    }
};
const actions = {
    LOGIN_USER({ commit, state }, form) {
        axios.post("/api/login", form).then((res) => {
            localStorage.setItem("token_login", res.data.token);
            window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token_login');
            commit('getInfoUser', res.data.user)
            commit('changeStatus', true)
        })
        .catch((error) => {
            console.log("ERROR:", error.response.data.errors);
            state.errors = error.response.data.errors
        });
    },
    GET_INFO_USER({ commit }) {
        axios.get("/api/admin/user").then((res) => {
            commit("getInfoUser", res.data);
        });
    },
    LOG_OUT_USER({commit}) {
        axios.get("/api/admin/logout").then((res) => {
            commit('logoutUser')
            commit('changeStatus', false)
        });
    },
    REGISTER_USER({commit, state}, form) {
        axios.post('/api/register', form)
        .then(() => {
            console.log('Save form');
            state.alert.register = 'Register success fully'
            state.errorsRegis = [];
        })
        .catch(error => {
            console.log("ERRRR:: ",error.response.data);
            state.errorsRegis = error.response.data.errors
        })
    },
    GET_STATUS_USER({commit}) {
        axios.get('/api/admin/status')
        .then(res => {
           commit('changeStatus', true)
        })
        .catch(error => {
            console.log("ERRRR:: ",error.response.data);
        })
    }
};

export default { state, getters, mutations, actions };
