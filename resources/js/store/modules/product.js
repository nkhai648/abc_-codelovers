const state = {
    dataProducts: {
        name: "",
        price: "",
        image: "",
        color_id: "",
        size_id: "",
        category_id: "",
    },
    data_paginate: [],
    list_cat: [],
    list_size: [],
    list_color: [],
    list_products: {},
    errors: [],
    nameSize: '',
    nameColor: '',
    dataColor: {
        id: '',
        color_name: ''
    },
    dataSize: {
        id: '',
        size_name: ''
    },
    dataPrice: '',
    alert: {
        create: "",
        update: "",
    },
    dataDeleteProduct: {
        name: "",
        id: "",
        index: "",
    },
    dataEditProduct: {
        name: "",
        id: "",
        index: "",
        price: "",
        image: "",
        color_id: "",
        size_id: "",
        category_id: "",
    },
    dataSearch: {
        search: "",
    },
    totalSearch: "",
};
const getters = {
    getDataProduct: (state) => state.dataProducts,
    getListCat: (state) => state.list_cat,
    getListSize: (state) => state.list_size,
    getListColor: (state) => state.list_color,
    getListProducts: (state) => state.list_products,
    getAlertProduct: (state) => state.alert,
    getDataDeleteProduct: (state) => state.dataDeleteProduct,
    getDataEditProduct: (state) => state.dataEditProduct,
    getErrorsProduct: (state) => state.errors,
    getPaginateGetter: (state) => state.data_paginate,
    getSearch: (state) => state.dataSearch,
    getTotalSearch: (state) => state.totalSearch,
    getDataColor: (state) => state.dataColor,
    getDataSize: (state) => state.dataSize,
    getNameSize: (state) => state.nameSize,
    getNameColor: (state) => state.nameColor,
    getDataPrice: (state) => state.dataPrice
};
const mutations = {
    getCartApi(state, data) {
        state.list_cat = data;
    },
    getSizeApi(state, data) {
        state.list_size = data;
    },
    getColorApi(state, data) {
        state.list_color = data;
    },
    getListProductApi(state, data) {
        state.list_products = data;
        // console.log(state.list_products)
    },
    createProduct(state, data) {
        state.list_products.unshift(data);
        state.errors = [];
        state.alert.create = "Created successfully";
    },
    clickDeleteProduct(state, { name, id, index }) {
        state.dataDeleteProduct.name = name;
        state.dataDeleteProduct.id = id;
        state.dataDeleteProduct.index = index;
    },
    deleteProduct(state, index) {
        state.list_products.splice(index, 1);
    },
    editProduct(
        state,
        { name, id, price, image, color_id, size_id, category_id, index }
    ) {
        state.dataEditProduct.name = name;
        state.dataEditProduct.id = id;
        state.dataEditProduct.price = price;
        state.dataEditProduct.image = image;
        state.dataEditProduct.color_id = color_id;
        state.dataEditProduct.size_id = size_id;
        state.dataEditProduct.category_id = category_id;
        state.dataEditProduct.index = index;
        state.alert.update = "";
    },
    updateProduct(state, data) {
        state.list_products.splice(state.dataEditProduct.index, 1, data);
        state.alert.update = "Update successfully";
    },
    getPaginate(state, paginate) {
        let data_paginate = {
            current_page: paginate.current_page,
            last_page: paginate.last_page,
            next_page: paginate.next_page_url,
            prev_page: paginate.prev_page_url,
        };
        state.data_paginate = data_paginate;
        // console.log(state.data_paginate);
    },
    setTotalSearchApi(state, data) {
        state.totalSearch = data;
    },
    setDataColor(state, data) {
        state.dataColor = {
            id: data.id,
            color_name: data.color_name
        }
    },
    setDataSize(state, data) {
        state.dataSize = {
            id: data.id,
            size_name: data.size_name
        }
    },
    setNameSize(state, name) {
        state.nameSize = name
    },
    setNameColor(state, name) {
        state.nameColor = name
    },
    setDataPrice(state, name) {
        state.dataPrice = name
    }
};
const actions = {
    GET_CART_API({ commit, state }) {
        axios
            .get("/api/admin/category/product/get_cat")
            .then((res) => {
                commit("getCartApi", res.data);
            })
            .catch((error) => {
                console.log("ERROR:", error.response.data.errors);
            });
    },
    GET_COLOR_API({ commit, state }) {
        axios
            .get("/api/admin/category/product/get_color_name")
            .then((res) => {
                commit("getColorApi", res.data);
            })
            .catch((error) => {
                console.log("ERROR:", error.response.data.errors);
            });
    },
    GET_SIZE_API({ commit, state }) {
        axios
            .get("/api/admin/category/product/get_size_name")
            .then((res) => {
                commit("getSizeApi", res.data);
            })
            .catch((error) => {
                console.log("ERROR:", error.response.data.errors);
            });
    },
    GET_LIST_PRODUCTS_API({ commit, state }) {
        axios
            .get(`/api/admin/category/product/show`)
            .then((res) => {
                commit("getListProductApi", res.data.products.product);
            })
            .catch((error) => {
                console.log("ERROR:", error.response.data.errors);
            });
    },
    CREATE_PRODUCT({ commit, state }, data) {
        axios
            .post("/api/admin/category/product/create", data)
            .then((res) => {
                commit("createProduct", res.data);
            })
            .catch((error) => {
                console.log("ERROR:", error.response.data.errors);
                state.errors = error.response.data.errors;
            });
    },
    DELETE_PRODUCT({ commit, state }, { id, index }) {
        axios.get(`/api/admin/category/product/destroy/${id}`).then((res) => {
            commit("deleteProduct", index);
        });
    },
    UPDATE_PRODUCT({ commit, state }, data) {
        axios
            .post("/api/admin/category/product/update", data)
            .then((res) => {
                commit("updateProduct", res.data);
            })
            .catch((error) => {
                console.log("ERROR:", error.response.data.errors);
                state.errors = error.response.data.errors;
            });
    },
    FETCH_CUSTOMER: function ({ commit, state }, page_url) {
        page_url = page_url || "/api/admin/category/product/show";
        axios
            .get(page_url)
            .then((res) => {
                commit("getListProductApi", res.data.products.product);
                commit("getPaginate", res.data.paginate);
                commit("setDataColor", res.data.color[0]);
            })
            .catch((error) => {
                console.log("ERROR:", error.response.data.errors);
            });
    },
    FETCH_NUMBER_PAGE({ commit }, number) {
        axios
            .get(`/api/admin/category/product/show?page=${number}`)
            .then((res) => {
                commit("getListProductApi", res.data.products.product);
                commit("getPaginate", res.data.paginate);
            })
            .catch((error) => {
                console.log("ERROR:", error.response.data.errors);
            });
    },
    FETCH_NUMBER_PAGE_COLOR({ commit }, {id, number}) {
        axios
            .get(`/api/admin/category/product/color/${id}?page=${number}`)
            .then((res) => {
                commit("getListProductApi", res.data.products.product);
                commit("getPaginate", res.data.paginate);
            })
            .catch((error) => {
                console.log("ERROR:", error.response.data.errors);
            });
    },
    FETCH_NUMBER_PAGE_SIZE({ commit }, {id, number}) {
        axios
            .get(`/api/admin/category/product/size/${id}?page=${number}`)
            .then((res) => {
                commit("getListProductApi", res.data.products.product);
                commit("getPaginate", res.data.paginate);
            })
            .catch((error) => {
                console.log("ERROR:", error.response.data.errors);
            });
    },
    FETCH_NUMBER_PAGE_PRICE({ commit }, {param, number}) {
        axios
            .get(`/api/admin/category/product/price/${param}?page=${number}`)
            .then((res) => {
                commit("getListProductApi", res.data.products.product);
                commit("getPaginate", res.data.paginate);
            })
            .catch((error) => {
                console.log("ERROR:", error.response.data.errors);
            });
    },
    searchNameProduct({ commit, state }) {
        let data = new FormData();
        data.append("search", state.dataSearch.search);
        axios
            .post("/api/admin/category/product/search", data)
            .then((res) => {
                commit("getListProductApi", res.data.dataSearch);
                commit("setTotalSearchApi", res.data.total);
            })
            .catch((error) => {
                console.log("ERROR: ".error.response.data.errors);
            });
    },
    SORT_COLOR({ commit, state }, id) {
        axios
            .get(`/api/admin/category/product/color/${id}`)
            .then((res) => {
                commit("getListProductApi", res.data.products.product);
                commit("getPaginate", res.data.paginate);
                commit("setDataColor", res.data.color[0])
                commit("setNameColor", res.data.color[0].color_name)
                commit("setNameSize", '')
                commit("setDataPrice", '')

            })
            .catch((error) => {
                console.log("ERROR:", error.response.data.errors);
            });
    },
    SORT_SIZE({ commit, state }, id) {
        axios
            .get(`/api/admin/category/product/size/${id}`)
            .then((res) => {
                commit("getListProductApi", res.data.products.product);
                commit("getPaginate", res.data.paginate);
                commit("setDataSize", res.data.size[0])
                commit("setNameSize", res.data.size[0].size_name)
                commit("setNameColor", '')
                commit("setDataPrice", '')
            })
            .catch((error) => {
                console.log("ERROR:", error.response.data.errors);
            });
    },
    SORT_PRICE({ commit, state }, param) {
        if(param == 'ascending') {
            commit("setDataPrice", 'ascending')
        }else {
            commit("setDataPrice", 'descending')
        }
        axios
            .get(`/api/admin/category/product/price/${param}`)
            .then((res) => {
                commit("getListProductApi", res.data.products.product);
                commit("getPaginate", res.data.paginate);
                commit("setNameSize", '')
                commit("setNameColor", '')

            })
            .catch((error) => {
                console.log("ERROR:", error.response.data.errors);
            });
    },
};

export default { state, getters, actions, mutations };
