<template>
  <div class="products">
    <ProductsList @editProduct='editProduct' @createProduct='createProduct'></ProductsList>
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
      let customFields = []
      product.custom_fields.forEach(field => {
        let obj = Object.assign({}, field)
        customFields.push(obj)
      })
      this.product = Object.assign({}, product)
      this.product.custom_fields = customFields
    },
    createProduct () {
      let product = {
        id: -1,
        name: '新規登録',
        description: '',
        identifier: '',
        custom_fields: [
          {id: 12, name: '顧客情報', value: '未定'}
        ]
      }
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
