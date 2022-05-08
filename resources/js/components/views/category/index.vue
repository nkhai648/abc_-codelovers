<template>
    <div>
        <div class="mt-3 mb-3">
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" @click="clickAdd">Add Category</button>
        </div>
        <table class="table text-center">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Updated At</th>
                    <th scope="col">Tool</th>
                </tr>
            </thead>
            <tbody v-for="(data, index) in getDataList" :key="index">
                <tr>
                    <th scope="row">{{data.id}}</th>
                    <td>{{data.name}}</td>
                    <td>{{data.created_at}}</td>
                    <td>{{data.updated_at}}</td>
                    <td>
                      <button type="submit" class="btn btn-danger" data-toggle="modal" data-target="#deleteCategory" @click.prevent="clickDelete({name: data.name, id: data.id, index: index})">
                        <i class='bx bx-trash'></i>
                      </button>
                      <button type="submit" class="btn btn-success" data-toggle="modal" data-target="#editCategory" @click.prevent="clickEditCat({name: data.name, id: data.id, index: index})">
                        <i class='bx bx-edit' ></i>
                      </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="alert alert-danger" role="alert" v-if="getAlert.deleteCatFail != ''">
          {{getAlert.deleteCatFail}}
        </div>

        <!-- Add Category  -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Form Add Category</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Name:</label>
                    <input type="text" class="form-control" id="recipient-name" name="name" v-model="name">
                    <div v-if="getErrors != ''" class="mt-2">
                      <div v-for="error in getErrors" :key="error.id">
                        <div href="#" class="badge badge-danger" v-for="items in error" :key="items.id">{{items}}</div>
                      </div>
                    </div>
                    <div class="alert alert-success mt-2" role="alert" v-if="getAlert.create != ''">
                      {{getAlert.create}}
                    </div>
                  </div>
                  
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" @click.prevent="submitAddCat" class="btn btn-primary">Create</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Edit Category  -->
        <div class="modal fade" id="editCategory" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Name:</label>
                    <input type="text" class="form-control" id="recipient-name" v-model="getDataEdit.name">
                    <div v-if="getErrors != ''" class="mt-2">
                      <div v-for="error in getErrors" :key="error.id">
                        <div href="#" class="badge badge-danger" v-for="items in error" :key="items.id">{{items}}</div>
                      </div>
                    </div>
                    
                    <div class="alert alert-success mt-2" role="alert" v-if="getAlert.update != ''">
                      {{getAlert.update}}
                    </div>
                  </div>
                  
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" @click.prevent="changeEditCat" class="btn btn-primary">Update</button>
              </div>
            </div>
          </div>
        </div>


        <!-- Delete Category  -->
        <div class="modal fade" id="deleteCategory" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Are you sure about delete {{getNameCat}} category?</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="d-flex justify-content-end">
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" data-dismiss="modal">No</button>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-danger" @click.prevent="deleteCat({id: getIdCat, index: getIndexCat})" data-dismiss="modal">Yes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
       
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      name: ''
    }
  },
  created() {
    this.getDataListApi()
  },
  computed: {
    ...mapGetters(['getDataList', 'getNameCat', 'getIdCat', 'getIndexCat', 'getFormName', 'getAlert', 'getErrors', 'getDataEdit'])
  },
  methods: {
    ...mapMutations(['clickDelete', 'CREATE_CAT', 'clickEditCat', 'clickAdd']),

    ...mapActions(['deleteCat', 'changeEditCat', 'createCat', 'getDataListApi']),

    submitAddCat() {
      this.createCat(this.name)
    }
  }
};
</script>

<style></style>
