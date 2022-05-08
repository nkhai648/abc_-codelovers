import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import category from './modules/category'
import product from './modules/product'
import user from './modules/user'
const storeConfigs = {
    modules: {
        category,
        product,
        user
    }
}
const store = new Vuex.Store(storeConfigs)

export default store