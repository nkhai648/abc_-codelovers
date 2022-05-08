<template>
  <!-- Delete Category  -->
    <div class="modal fade" id="deleteProduct" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Are you sure about delete {{getDataDeleteProduct.name}} category?</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="d-flex justify-content-end">
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">No</button>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" @click.prevent="DELETE_PRODUCT({id: getDataDeleteProduct.id, index: getDataDeleteProduct.index})" data-dismiss="modal">Yes</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['getAlertProduct', 'getDataDeleteProduct', 'getErrorsProduct',])
    },
    methods: {
        ...mapMutations(['clickDeleteProduct']),
        ...mapActions(['DELETE_PRODUCT']),
    }
}
</script>

<style>

</style>