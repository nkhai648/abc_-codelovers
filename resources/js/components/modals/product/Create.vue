<template>
   <!-- Add Product  -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Form add product</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                <form @submit.prevent="submitAdd" method="POST" enctype="multipart/form-data">
                    <div class="d-flex justify-content-around">
                        <div>
                            <div class="form-group">
                                <label for="recipient-name" class="col-form-label">Name:</label>
                                <input type="text" class="form-control" id="recipient-name" name="name" v-model="name">
                            </div>
                            <div class="form-group">
                                <label for="recipient-price" class="col-form-label">Price:</label>
                                <input type="text" class="form-control" id="recipient-price" name="price" v-model="price">
                            </div>
                            <div class="form-group d-flex flex-column">
                                <label class="col-form-label">Image:</label>
                                <img id="display-image" src="#" alt="">
                                <input type="file" id="file-image" class="form-control" name="image" @change="getAvatar">
                            </div>
                        </div>
                        <div>
                            <div class="form-group">
                                <label class="col-form-label">Colors</label>
                                <select class="custom-select" id="inputGroupSelect" name="color_id" v-model="color">
                                    <option selected disabled>---Choose one---</option>
                                    <option  v-for="(color, index) in getListColor" :key="index" :value="color.id">{{color.color_name}}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="col-form-label">Sizes</label>
                                <select class="custom-select" id="inputGroupSelect" name="size_id" v-model="size">
                                    <option selected disabled>---Choose one---</option>
                                    <option  v-for="(size, index) in getListSize" :key="index" :value="size.id">{{size.size_name}}</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="recipient-name" class="col-form-label">Categories</label>
                                <select class="custom-select" id="inputGroupSelect" name="category_id" v-model="category_id">
                                    <option selected disabled>---Choose one---</option>
                                    <option  v-for="(cat, index) in getListCat" :key="index" :value="cat.id">{{cat.name}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Create</button>
                    </div>
                </form>
                <div v-if="getErrorsProduct != ''" class="mt-2 alert alert-danger">
                    <div v-for="error in getErrorsProduct" :key="error.id">
                        <div v-for="items in error" :key="items.id">{{items}}</div>
                    </div>
                </div>
                <div class="alert alert-success" role="alert" v-if="getAlertProduct.create != ''">
                    {{getAlertProduct.create}}
                </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
    data() {
        return {
            name: '',
            image: '',
            price: '',
            color: '',
            size: '',
            category_id: '',
        }
    },
    computed: {
        ...mapGetters(['getListCat', 'getDataProduct', 'getAlertProduct', 'getErrorsProduct', 'getListColor', 'getListSize']),
    },
    methods: {
        ...mapActions(['GET_CART_API', 'GET_COLOR_API', 'GET_SIZE_API', 'CREATE_PRODUCT']),
        submitAdd() {
            let formData = new FormData()
            formData.append('name', this.name)
            formData.append('price', this.price)
            formData.append('image', this.image)
            formData.append('size_id', this.size)
            formData.append('color_id', this.color)
            formData.append('category_id', this.category_id)
            console.log(...formData)
            this.CREATE_PRODUCT(formData)
        },
        getAvatar(e) {
            this.image = e.target.files[0];
        }
    }
}

</script>
<style scoped>
    .modal-content {
        width: 700px !important;
    }
</style>