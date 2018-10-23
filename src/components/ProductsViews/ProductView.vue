<template>
  <div class="products">
    <ProductsList :reloadrequest="reloadcount" @editProduct='editProduct' @createProduct='createProduct'></ProductsList>
    <ProductEdit :product="product" @reloadRequest='reload'></ProductEdit>
  </div>
</template>

<script>
import ProductsList from './ProductsList.vue'
import ProductEdit from './ProductEdit.vue'

export default {
  name: 'products',
  components: {
    ProductsList,
    ProductEdit
  },
  data () {
    return {
      product: null,
      reloadcount: 0
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
    },
    reload () {
      console.log('reload @ ProductView')
      this.reloadcount++
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
