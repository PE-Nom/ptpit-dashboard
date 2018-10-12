<template>
  <div class="products">
    <ProductsList @editProduct='editProduct'></ProductsList>
    <ProductEdit :product="product"></ProductEdit>
  </div>
</template>

<script>
import ProductsList from './ProductsList.vue'
import ProductEdit from './ProductEdit.vue'

export default {
  name: 'products',
  components: {
    ProductsList: ProductsList,
    ProductEdit: ProductEdit
  },
  data () {
    return {
      product: null
    }
  },
  methods: {
    editProduct (product) {
      console.log('ProductView.editProduct')
      console.log(product)
      this.product = product
    }
  }
}
</script>

<style>
.products {
  margin-left: auto;
  margin-right: auto;
  margin-top: 6px;
  width: 98%;
  height: 850px;
}
</style>
