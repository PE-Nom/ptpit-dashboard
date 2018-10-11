<template>
  <div class="products">
    <h1>{{ msg }}</h1>
    <ProductsList/>
  </div>
</template>

<script>
import ProductsList from './ProductsList.vue'

export default {
  name: 'products',
  components: {
    ProductsList: ProductsList
  },
  data () {
    return {
      msg: 'Non Conforming Products List View'
    }
  }
}
</script>

<style>
</style>
