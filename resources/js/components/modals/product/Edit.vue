<template>
  <!-- Edit Category  -->
    <div class="modal fade" id="editProduct" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                <form @submit.prevent="submitUpdate" method="POST" enctype="multipart/form-data">
                    <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Name:</label>
                    <input type="text" class="form-control" id="recipient-name" v-model="getDataEditProduct.name">
                    </div>
                    <div class="form-group">
                    <label for="recipient-price" class="col-form-label">Price:</label>
                    <input type="text" class="form-control" id="recipient-price" name="price" v-model="getDataEditProduct.price">
                    </div>
                    <div class="form-group">
                    <label for="recipient-image" class="col-form-label">Image:</label>
                    <input type="file" class="form-control" id="recipient-image" name="image" @change="getAvatar">
                    </div>
                    <div class="form-group">
                    <label class="col-form-label">Colors</label>
                    <select class="custom-select" id="inputGroupSelect" name="color_id" v-model="getDataEditProduct.color_id">
                        <option selected disabled>---Choose one---</option>
                        <option  v-for="(color, index) in getListColor" :key="index" :value="color.id">{{color.color_name}}</option>
                    </select>
                    </div>
                    <div class="form-group">
                    <label class="col-form-label">Sizes</label>
                    <select class="custom-select" id="inputGroupSelect" name="size_id" v-model="getDataEditProduct.size_id">
                        <option selected disabled>---Choose one---</option>
                        <option v-for="(size, index) in getListSize" :key="index" :value="size.id">{{size.size_name}}</option>
                    </select>
                    </div>
                    <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Categories</label>
                    <select class="custom-select" id="inputGroupSelect" name="category_id" v-model="getDataEditProduct.category_id">
                        <option selected disabled>---Choose one---</option>
                        <option  v-for="(cat, index) in getListCat" :key="index" :value="cat.id">{{cat.name}}</option>
                    </select>
                    </div>
                    
                    <div v-if="getErrorsProduct != ''" class="mt-2">
                        <div v-for="error in getErrorsProduct" :key="error.id">
                        <div href="#" class="badge badge-danger" v-for="items in error" :key="items.id">{{items}}</div>
                        </div>
                    </div>
                    
                    <div class="alert alert-success mt-2" role="alert" v-if="getAlertProduct.update != ''">
                    {{getAlertProduct.update}}
                    </div>

                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-primary">Update</button>
                    </div>
                </form>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getListCat', 'getDataProduct', 'getAlertProduct', 'getDataEditProduct', 'getErrorsProduct', 'getListColor', 'getListSize'])
  },
  methods: {
    ...mapMutations(['editProduct']),
    ...mapActions(['UPDATE_PRODUCT']),
    submitUpdate() {
      let formUpdate = new FormData()
      formUpdate.append('id', this.getDataEditProduct.id)
      formUpdate.append('name', this.getDataEditProduct.name)
      formUpdate.append('price', this.getDataEditProduct.price)
      formUpdate.append('image', this.image)
      formUpdate.append('size_id', this.getDataEditProduct.size_id)
      formUpdate.append('color_id', this.getDataEditProduct.color_id)
      formUpdate.append('category_id', this.getDataEditProduct.category_id)
      this.UPDATE_PRODUCT(formUpdate)

    },
    getAvatar(e) {
      this.image = e.target.files[0];
    }
  }
}
</script>

<style>

</style>