<template>
  <div class="products">
    <ProductsList/>
  </div>
</template>

<script>
import ProductsList from './ProductsList.vue'

export default {
  name: 'products',
  components: {
    ProductsList: ProductsList
  }
}
</script>

<style>
.products {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 500px;
}
</style>
