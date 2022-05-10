<template>
    <div>
      <div class="mb-4 d-flex justify-content-between align-items-center">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Add Product</button>
        <nav class="navbar">
          <!-- SORT SIZE  -->
          <div class="btn-group mr-4">
            <button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Sort Sizes
            </button>
            <div class="dropdown-menu mr-4">
              <a class="dropdown-item"  href="#" @click="SORT_SIZE(size.id)" v-for="(size, index) in getListSize" :key="index">{{size.size_name}}</a>
            </div>
          </div>

          <!-- SORT COLOR  -->
          <div class="btn-group mr-4">
            <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Sort Colors
            </button>
            <div class="dropdown-menu">
              <a class="dropdown-item"  href="#" @click="SORT_COLOR(color.id)" v-for="(color, index) in getListColor" :key="index">{{color.color_name}}</a>
            </div>
          </div>

          <!-- SORT PRICE  -->
          <div class="btn-group mr-4">
            <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Sort Price
            </button>
            <div class="dropdown-menu">
              <a class="dropdown-item" @click="SORT_PRICE(sort_price.asc)" href="#">Ascending</a>
              <a class="dropdown-item" @click="SORT_PRICE(sort_price.desc)" href="#">Descending</a>
            </div>
          </div>

          <!-- SEARCH  -->
          <form class="form-inline" method="POST" @submit.prevent="searchNameProduct">
            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="getSearch.search" name="search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit" >Search</button>
          </form>
        </nav>
      </div>

      <div v-if="getNameColor != ''">
        <div class="alert alert-info" role="alert">
          Sort Color: {{getNameColor}}
        </div>
      </div>
      <div v-if="getNameSize != ''">
        <div class="alert alert-success" role="alert">
          Sort Size: {{getNameSize}}
        </div>
      </div>
      <div v-if="getDataPrice != ''">
        <div class="alert alert-danger" role="alert">
          Sort Price: {{capitalizeText(getDataPrice)}}
        </div>
      </div>
      <table class="table text-center">
        <thead class="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Category</th>
                <th scope="col">Color</th>
                <th scope="col">Size</th>
                <th scope="col">Tool</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(product, index) in getListProducts" :key="product.id">
                <th scope="row">{{product.id}}</th>
                <td>
                  <img :src="`/images/${product.image}`" style="width: 90px; height: 90px" alt="">
                </td>
                <td>{{capitalizeText(product.name)}}</td>
                <td>{{formatPrice(product.price)}}</td>
                <td>{{product.name_category}}</td>
                <td>{{product.color_name}}</td>
                <td>{{product.size_name}}</td>
                <td>
                  <button type="submit" class="btn btn-danger" data-toggle="modal" data-target="#deleteProduct" @click.prevent="clickDeleteProduct({name: product.name, id: product.id, index: index})">
                    <i class='bx bx-trash'></i>
                  </button>
                  <button type="submit" class="btn btn-success" data-toggle="modal" data-target="#editProduct" @click.prevent="editProduct({name: product.name, id: product.id, price: product.price, color_id: product.color, size_id: product.size, category_id: product.category_id, index: index})">
                    <i class='bx bx-edit' ></i>
                  </button>
                </td>
            </tr>
        </tbody>
      </table>
      <div v-if="getTotalSearch > 5 || getTotalSearch == ''">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item" :class="[{ disabled: !getPaginateGetter.prev_page }]">
              <a class="page-link" href="#" @click="FETCH_CUSTOMER(getPaginateGetter.prev_page)" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
              </a>
            </li>
            <li class="page-item" :class="[{active: getActive(page)}]" v-for="(page, index) in getPaginateGetter.last_page" :key="index">
                <a v-if="getNameTable != ''" class="page-link" href="#" @click="FETCH_NUMBER_PAGE_ALL({table: getNameTable, id: getIdSort, page: page})" >{{page}}</a>
                <a v-else class="page-link" href="#" @click="FETCH_NUMBER_PAGE(page)" >{{page}}</a>
            </li>
            <li class="page-item" :class="[{ disabled: !getPaginateGetter.next_page }]">
              <a class="page-link" href="#" @click="FETCH_CUSTOMER(getPaginateGetter.next_page)" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
     
      <Create></Create>
      <Edit></Edit>
      <Delete></Delete>

    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Edit from '../../modals/product/Edit.vue'
import Create from '../../modals/product/Create.vue'
import Delete from '../../modals/product/Delete.vue'
export default {
  data() {
    return {
      searchName: '',
      data_paginate: [],
      active: false,
      sort_price: {
        desc: 'descending',
        asc: 'ascending'
      }
    }
  },
  components: {
    Edit,
    Create,
    Delete,
  },
  created() {
    this.GET_CART_API()
    this.GET_COLOR_API()
    this.GET_SIZE_API()
    this.FETCH_CUSTOMER()
  },
  mounted() {
    this.GET_LIST_PRODUCTS_API()
  },
  computed: {
    ...mapGetters(['getListProducts', 'getPaginateGetter', 'getSearch', 'getTotalSearch', 'getListColor','getListSize', 'getDataColor', 'getDataSize', 'getNameColor', 'getNameSize', 'getDataPrice', 'getNameTable', 'getIdSort']),
  },
  methods: {
    ...mapMutations(['editProduct', 'clickDeleteProduct', 'getListProductApi', 'getPaginate']),
    ...mapActions(['GET_CART_API', 'GET_COLOR_API', 'GET_SIZE_API', 'GET_LIST_PRODUCTS_API', 'FETCH_CUSTOMER', 'FETCH_NUMBER_PAGE', 'searchNameProduct', 'SORT_COLOR', 'SORT_SIZE', 'SORT_PRICE', 'FETCH_NUMBER_PAGE_PRICE', 'FETCH_NUMBER_PAGE_ALL']),

    getActive(number) {
      if(number == this.getPaginateGetter.current_page) {
        return true
      }else {
        return false
      }
    },
    formatPrice(price) {
      return '$' + new Intl.NumberFormat('de-DE').format(price) 
    },
    capitalizeText(text) {
      const words = text.split(" ");
      for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }
      return words.join(" ");
    },
  }
};
</script>

<style></style>
