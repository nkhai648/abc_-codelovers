const state = {
    form: {
        name: "",
    },
    errors: [],
    alert: {
        create: "",
        update: "",
        deleteCatFail: "",
    },
    dataList: [],
    dataEdit: {
        name: "",
        id: "",
        index: "",
    },
    dataDelete: {
        name: "",
        id: "",
        index: "",
    },
};
const getters = {
    getDataList: (state) => state.dataList,
    getNameCat: (state) => state.dataDelete.name,
    getIdCat: (state) => state.dataDelete.id,
    getIndexCat: (state) => state.dataDelete.index,
    getFormName: (state) => state.form.name,
    getAlert: (state) => state.alert,
    getErrors: (state) => state.errors,
    getDataEdit: (state) => state.dataEdit,
};
const mutations = {
    clickAdd(state) {
        (state.errors = []), (state.alert.create = "");
    },
    clickDelete(state, { name, id, index }) {
        state.dataDelete.name = name;
        state.dataDelete.id = id;
        state.dataDelete.index = index;
    },
    deleteCat(state, index) {
        state.dataList.splice(index, 1);
    },
    deleteCatFail(state) {
        state.alert.deleteCatFail =
            "Delete failed " + state.dataDelete.name + " category";
    },
    getDataListApi(state, data) {
        state.dataList = data;
    },
    CREATE_CAT(state, data) {
        state.dataList.unshift(data);
        state.alert.create = "Created successfully!";
        state.alert.deleteCatFail = "";
        state.errors = null;
    },

    clickEditCat(state, { name, id, index }) {
        state.dataEdit.name = name;
        state.dataEdit.id = id;
        state.dataEdit.index = index;
        state.alert.update = "";
        state.alert.deleteCatFail = "";
        state.errors = [];
    },
    changeEditCat(state, data) {
        state.dataList.splice(state.dataEdit.index, 1, data);
        state.alert.update = "Updated successfully!";
        state.alert.deleteCatFail = "";
    },

};
const actions = {
    getDataListApi({ commit }) {
        axios
            .get("api/admin/category/show")
            .then((res) => {
                commit("getDataListApi", res.data);
            })
            .catch((error) => {
                console.log("ERRRR:: ", error.response.data);
            });
    },
    deleteCat({ commit }, { id, index }) {
        axios
            .get(`api/admin/category/destroy/${id}`)
            .then((res) => {
                commit("deleteCat", index);
            })
            .catch((error) => {
                console.log("ERRRR:: ", error.response.data);
                commit("deleteCatFail");
            });
    },
    changeEditCat({ commit, state }) {
        const data = {
            id: state.dataEdit.id,
            name: state.dataEdit.name,
        };

        axios
            .post("/api/admin/category/update", data)
            .then((res) => {
                commit("changeEditCat", res.data);
            })
            .catch((error) => {
                console.log("ERRRR:: ", error.response.data);
                state.errors = error.response.data.errors;
            });
    },

    createCat({ commit }, data) {
        var form = {
            name: data
        }
        axios
            .post(" api/admin/category/create", form)
            .then((res) => {
                commit("CREATE_CAT", res.data);
            })
            .catch((error) => {
                console.log("ERRRR:: ", error.response.data);
                state.errors = error.response.data.errors;
                state.alert.create = "";
            });
    },

    
};

export default { state, getters, actions, mutations }
