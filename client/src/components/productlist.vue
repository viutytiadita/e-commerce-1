<template>
  <div>
    <p>{{error.product}}</p>
    <addingProduct v-show="roletype == 'admin'"/>
    <div class="container">
      <div class="row">
        <div class="col-md-12 d-flex m-3">
          <pItem v-for="product in products" :key="product._id" :dataitem="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex"
import pItem from "@/components/productitem.vue";
import addingProduct from "@/components/addingproduct.vue";

export default {
  name: "allList",
  components: {
    pItem,
    addingProduct
  },
  computed : {
    ...mapState(['products'])
  },
  data() {
    return {
      error: {
        product: ""
      },
      roletype: localStorage.role,
    };
  },
  created() {
    this.$store.dispatch("GETPRODUCTS")
  },
  methods: {

  }
};
</script>

<style>
</style>
