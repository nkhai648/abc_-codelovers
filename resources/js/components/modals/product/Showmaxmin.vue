<template>
    <div>
        <!-- Max -->
        <div class="modal fade" id="maxMinModal" tabindex="-1" role="dialog" aria-labelledby="maxMinModal" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Product has {{getDataMaxMin.data}} price:</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="card">
                            <img :src="`/images/${getDataMaxMin.image}`" alt="" class="img">
                            <div class="container">
                                <h3>Name: {{getDataMaxMin.name}}</h3>
                                <p>Price: {{formatPrice(getDataMaxMin.price)}}</p>
                                <p>Category: {{getDataMaxMin.category_name}}</p>
                                <p>Color: {{getDataMaxMin.color_name}}</p>
                                <p>Size: {{getDataMaxMin.size_name}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['getDataMaxMin'])
    },
    methods: {
        formatPrice(price) {
            return '$' + new Intl.NumberFormat('de-DE').format(price) 
        },
    }
}
</script>
<style scoped>
    .modal-body .card {
        width: 100%;
    }
    .card .img {
        width: 100%;
        height: 300px;
        object-fit: cover;
    }
    .container {
        padding: 5px 15px
    }
</style>